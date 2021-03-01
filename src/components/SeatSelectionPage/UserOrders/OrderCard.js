import React, { Component } from 'react';
import { unBlockSeat } from '../../../webAPI';
import { connect } from 'react-redux';
import message from 'antd/lib/message';
import { getSeanceApi, setOrderFeature } from '../../../redux/actions/actions';
import './order-card.scss';

const mapStateToProps = state => {
  return {
    seanceId: state.seanceReducer.seanceInfo.seanceId,
    features: state.orderReducer.order.features,
    blockedSeats: state.seanceReducer.seanceInfo.blockedSeatsByUser,
  };
};

class ConnectedOrderCard extends Component {
  constructor(props) {
    super(props);
  }

  onCrossClick = () => {
    if (this.props.seat) {
      const params = {
        seatId: this.props.seat._id,
      };
      unBlockSeat(params)
        .then(res => {
          this.props.getSeanceApi(this.props.seanceId);
          return console.log(res);
        })
        .catch(err => console.error(err));
    } else {
      const newFeatures = this.props.features.filter(item => item.product !== this.props.feature.product);
      this.props.setOrderFeature([...newFeatures]);
    }
  };

  componentDidUpdate() {
    const { feature } = this.props;
    if (feature && !this.props.blockedSeats.length) {
      this.props.setOrderFeature([]);
    } else if (feature && feature.amount / this.props.blockedSeats.length / 5 > 1) {
      const [newFeature] = this.props.features.filter(item => item.product === this.props.feature.product);
      const newFeatures = this.props.features.filter(item => item.product !== this.props.feature.product);
      newFeature.amount = 5 * this.props.blockedSeats.length;
      this.props.setOrderFeature([...newFeatures, newFeature]);
      message.info(`The max amount of ${feature.product} will be reduced to ${5 * this.props.blockedSeats.length} pc.`);
    }
  }

  render() {
    const { seat, feature } = this.props;
    return (
      <div className="seat_type">
        <div className="seat_image">
          <div className={seat ? `selected_seat seat_size ${seat.seatType.toLowerCase()}` : 'icon-cart'}></div>
        </div>
        <div className="seat_type__head">
          <div className="seat_head_info">
            <div className="order_info">
              {seat && (
                <div className="order_info__seat">
                  <span>{seat.row} row</span> / <span>{seat.seat} seat</span>
                </div>
              )}
              {feature && (
                <div className="order_info__seat">
                  <span>{feature.product}</span>
                </div>
              )}
              {seat && <span>{`Type: ${seat.seatType}`}</span>}
              {feature && <span>{`amount: ${feature.amount} pc.`}</span>}
            </div>
            <span className="seat_price">{seat ? seat.price : feature.price} BYN</span>
          </div>
        </div>
        <span
          className={`icon-cross ${this.props.className ? this.props.className : ''}`}
          onClick={this.onCrossClick}></span>
      </div>
    );
  }
}

const OrderCard = connect(
  mapStateToProps,
  { getSeanceApi, setOrderFeature }
)(ConnectedOrderCard);

export default OrderCard;
