import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import { Button } from 'antd';
import { makePayment } from '../../webAPI';
import { setLoadingState, getSeanceApi, setOrderFeature, setPayedOrder } from '../../redux/actions/actions';
import { withRouter } from 'react-router-dom';
import { STRIPE_KEY } from '../../config/config';

const mapStateToProps = state => {
  return {
    totalPrice: state.orderReducer.order.totalPrice,
    orderFeatures: state.orderReducer.order.features,
    orderTickets: state.seanceReducer.seanceInfo.blockedSeatsByUser,
  };
};

class ConnectedCheckout extends React.Component {
  onToken = async token => {
    this.props.setLoadingState(true);
    const { orderFeatures, orderTickets, totalPrice } = this.props;
    const body = {
      totalPrice: totalPrice * 100,
      stripeEmail: token.email,
      stripeToken: token.id,
      stripeTokenType: token.type,
      orderTickets,
      orderFeatures,
    };

    makePayment(body)
      .then(result => {
        this.props.setLoadingState(false);
        if (result.status.success) {
          const newUrl = `${this.props.history.location.pathname}/accepted`;
          this.props.history.replace(newUrl);
          this.props.getSeanceApi(this.props.match.params.seanceId);
          this.props.setOrderFeature([]);
          this.props.setPayedOrder(result.status.order);
        }
      })
      .catch(error => {
        console.log('error');
        console.error(error, 'Something wrong with server.');
      });
  };

  render() {
    return (
      <StripeCheckout
        stripeKey={STRIPE_KEY}
        panelLabel={`Pay`}
        allowRememberMe={false}
        token={this.onToken}
        amount={this.props.totalPrice * 100}
        currency="BYN">
        <Button className="pay_with_card_button" type="primary" disabled={!this.props.totalPrice}>
          Pay with card
        </Button>
      </StripeCheckout>
    );
  }
}

const Checkout = connect(
  mapStateToProps,
  { setLoadingState, getSeanceApi, setOrderFeature, setPayedOrder }
)(ConnectedCheckout);

export default withRouter(Checkout);
