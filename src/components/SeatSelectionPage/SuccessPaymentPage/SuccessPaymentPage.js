import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setBookingStage } from '../../../redux/actions/actions';
import { Button } from 'antd';
import { withRouter, Link } from 'react-router-dom';
import './succese-payment-page.scss';

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

  componentDidMount() {
    this.props.setBookingStage(3);
  }

  render() {
    return (
      <div className="success_payment_page__payed_order">
        <div className="payed_order__header">
          <h1>Payment was successful</h1>
        </div>
        <span className="succes_message">Your tickets will appear in your account profile</span>
        <Link to="/user/profile">
          <Button ghost onClick={this.onProfileClick}>
            Go to profile
          </Button>
        </Link>
      </div>
    );
  }
}

const SuccessPaymentPage = connect(
  mapStateToProps,
  { setBookingStage }
)(ConnectedSuccessPaymentPage);

export default withRouter(SuccessPaymentPage);
