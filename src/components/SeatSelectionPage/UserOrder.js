import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';

const mapStateToProps = state => {
  return {
    blockedSeats: state.seanceReducer.seanceInfo.blockedSeatsByUser,
    userName: state.userNameReducer.userName,
  };
};

const ConnectedUserOrder = props => {
  return (
    <div className="seats__seats_info">
      <h2>{`${props.userName}\`s order`}</h2>
      {renderOreders(props.blockedSeats)}
      <div className="total_price">
        <h3>The total price is:</h3>
        <span>{sumPrice(props.blockedSeats)} BYN</span>
      </div>
      <Button ghost>Accept and pay</Button>
    </div>
  );
};

const renderOreders = orders => {
  return orders.map(seat => {
    return (
      <div className="seat_type">
        <div className="seat_image">
          <div className={`selected_seat seat_size ${seat.seatType}`}></div>
        </div>
        <div className="seat_type__head">
          <div className="seat_head_info">
            <div className="order_info">
              <div className="order_info__seat">
                <span>{seat.row} row</span> / <span>{seat.seat} seat</span>
              </div>
              <span>{`Type: ${seat.seatType}`}</span>
            </div>
            <span className="seat_price">{seat.price} BYN</span>
          </div>
        </div>
      </div>
    );
  });
};

const sumPrice = orders => {
  return orders.reduce((sum, order) => {
    sum += order.price;
    return sum;
  }, 0);
};

const UserOrder = connect(mapStateToProps)(ConnectedUserOrder);

export default UserOrder;
