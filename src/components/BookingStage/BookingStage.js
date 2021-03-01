import React from 'react';
import './booking-stage.scss';
import { connect } from 'react-redux';

const mapStateToProps = ({ seanceReducer }) => {
  return {
    bookingStage: seanceReducer.bookingStage,
    blockedSeats: seanceReducer.seanceInfo.blockedSeatsByUser,
  };
};

function ConnectedBookingStage(props) {
  return (
    <div className="booking_stage">
      <div className="stage stage_1">1</div>
      <div className="stage stage_2">2</div>
      <div className="stage stage_3">3</div>
      <div className="stage stage_4">4</div>
      {drawProgress(props.bookingStage, props.blockedSeats)}
    </div>
  );
}
const BookingStage = connect(mapStateToProps)(ConnectedBookingStage);
export default BookingStage;

function drawProgress(stage, blocked) {
  let options = {
    width: `${blocked.length || stage === 3 ? (100 / 3) * stage : 0}%`,
  };
  return <div className="progress" style={options}></div>;
}
