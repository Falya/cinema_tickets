import React, { Component } from 'react';
import { unBlockSeat } from '../../../webAPI';
import { connect } from 'react-redux';
import { getSeanceApi, setOrderFeature } from '../../../redux/actions/actions';
import './order-card.scss';

const mapStateToProps = state => {
  return {
    seanceId: state.seanceReducer.seanceInfo.seanceId,
    features: state.orderReducer.order.features,
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
        <span className="icon-cross" onClick={this.onCrossClick}></span>
      </div>
    );
  }
}

const OrderCard = connect(
  mapStateToProps,
  { getSeanceApi, setOrderFeature }
)(ConnectedOrderCard);

export default OrderCard;
