import React, { Component } from 'react';
import { setBookingStage } from '../redux/actions/actions';
import { connect } from 'react-redux';
import '../components/PaymentPage/PaymentPage.scss';
import OrderCard from '../components/SeatSelectionPage/UserOrders/OrderCard';
import Checkout from '../components/PaymentPage/CheckoutForm';

const mapStateToProps = state => {
  return {
    orderFeatures: state.orderReducer.order.features,
    orderTickets: state.seanceReducer.seanceInfo.blockedSeatsByUser,
    totalPrice: state.orderReducer.order.totalPrice,
  };
};

class ConnectedPaymentPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.setBookingStage(2);
  }

  render() {
    return (
      <div className="payment_page">
        <div className="payment_page__order">
          {this.props.orderTickets.map(ticket => {
            return <OrderCard seat={ticket} className="payment" />;
          })}
          {this.props.orderFeatures.map(feature => {
            return <OrderCard feature={feature} className="payment" />;
          })}
        </div>
        <div className="payment_page__total_pay">
          <div className="total_price">
            <div className="total_price__header">
              <h1>Total price is:</h1>
            </div>
            <div className="total_price__body">
              <span className="price">{this.props.totalPrice}</span>
              <span className="currency">BYN</span>
            </div>
            <Checkout />
          </div>
        </div>
      </div>
    );
  }
}

const PaymentPage = connect(
  mapStateToProps,
  { setBookingStage }
)(ConnectedPaymentPage);

export default PaymentPage;
