import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button } from 'antd';
import FeaturesSelector from './FeaturesSelector';
import OrderCard from './OrderCard';

const mapStateToProps = state => {
  return {
    blockedSeats: state.seanceReducer.seanceInfo.blockedSeatsByUser,
    userName: state.userNameReducer.userName,
    features: state.seanceReducer.seanceInfo.cinemaInfo.features,
    orderFetures: state.orderReducer.order.features,
  };
};

class ConnectedUserOrder extends Component {
  constructor(props) {
    super(props);
  }

  renderOreders = orders => {
    return orders.map(seat => {
      return <OrderCard seat={seat} />;
    });
  };

  renderOrderFeatures = features => {
    return features.map(feature => <OrderCard feature={feature} />);
  };

  renderFeatures = () => {
    return this.props.features.map(feature => <FeaturesSelector feature={feature} />);
  };

  sumPrice = orders => {
    return orders.reduce((sum, order) => {
      sum += order.price;
      return sum;
    }, 0);
  };

  render() {
    return (
      <div className="seats__seats_info">
        <h2>{`${this.props.userName}\`s order`}</h2>
        <div className="oreder_features">
          <input type="checkbox" className="invisible_input" />
          <div className="features_header">
            <span>Select some features</span>
            <span className="icon-circle-down"></span>
          </div>
          <div className="features_menu">{this.renderFeatures()}</div>
        </div>
        {this.renderOreders(this.props.blockedSeats)}
        {this.renderOrderFeatures(this.props.orderFetures)}
        <div className="total_price">
          <h3>The total price is:</h3>
          <span>{this.sumPrice(this.props.blockedSeats) + this.sumPrice(this.props.orderFetures)} BYN</span>
        </div>

        <Button ghost>Accept and pay</Button>
      </div>
    );
  }
}

const UserOrder = connect(mapStateToProps)(ConnectedUserOrder);

export default withRouter(UserOrder);
