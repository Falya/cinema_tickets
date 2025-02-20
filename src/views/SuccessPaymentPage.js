import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setBookingStage } from '../redux/actions/actions';
import Button from 'antd/lib/button';
import { withRouter } from 'react-router-dom';
import '../components/SeatSelectionPage/SuccessPaymentPage/succese-payment-page.scss';

const mapStateToProps = state => {
  return {
    order: state.orderReducer.payedOrder,
    seanceInfo: state.seanceReducer.seanceInfo,
  };
};

class ConnectedSuccessPaymentPage extends Component {
  constructor(props) {
    super(props);
  }

  onProfileClick = () => {
    this.props.history.replace('/user/profile');
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.setBookingStage(3);
  }

  render() {
    return (
      <div className="success_payment_page__payed_order">
        <div className="payed_order__header">
          <h1>Payment was successful</h1>
        </div>
        <span className="success_message">Your tickets will appear in your account profile</span>
        <Button className="go_to_profile_button" ghost onClick={this.onProfileClick}>
          Go to profile
        </Button>
      </div>
    );
  }
}

const SuccessPaymentPage = connect(
  mapStateToProps,
  { setBookingStage }
)(ConnectedSuccessPaymentPage);

export default withRouter(SuccessPaymentPage);
