import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import { Button, message } from 'antd';
import { makePayment } from '../../webAPI';
import { setLoadingState, getSeanceApi, setOrderFeature, setPayedOrder } from '../../redux/actions/actions';
import { withRouter } from 'react-router-dom';
import { STRIPE_KEY } from '../../config/config';

const mapStateToProps = state => {
  return {
    totalPrice: state.orderReducer.order.totalPrice,
    orderFeatures: state.orderReducer.order.features,
    orderTickets: state.seanceReducer.seanceInfo.blockedSeatsByUser,
    currency: state.orderReducer.currency,
  };
};

class ConnectedCheckout extends React.Component {
  constructor(props) {
    super(props);
  }

  onToken = async token => {
    this.props.setLoadingState(true);
    const { orderFeatures, orderTickets, totalPrice, currency } = this.props;
    const body = {
      totalPrice: Math.round((totalPrice / currency) * 100),
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
          message.success(result.status.message, 5);
          const newUrl = `${this.props.history.location.pathname}/accepted`;
          this.props.history.replace(newUrl);
          this.props.getSeanceApi(this.props.match.params.seanceId);
          this.props.setOrderFeature([]);
          this.props.setPayedOrder(result.status.order);
        } else {
          message.error(result.status.message, 5);
        }
      })
      .catch(error => {
        console.log('error');
        message.error('Something wrong with server.', 5);
      });
  };

  render() {
    const { currency } = this.props;
    return (
      <StripeCheckout
        stripeKey={STRIPE_KEY}
        panelLabel={`Pay`}
        allowRememberMe={false}
        token={this.onToken}
        amount={Math.round((this.props.totalPrice / currency) * 100)}
        currency="usd">
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
