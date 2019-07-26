import React from 'react';
import './booking-stage.scss';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    bookingStage: state.seanceReducer.bookingStage,
  };
};

function ConnectedBookingStage(props) {
  return (
    <div className="booking_stage">
      <div className="stage stage_1">1</div>
      <div className="stage stage_2">2</div>
      <div className="stage stage_3">3</div>
      <div className="stage stage_4">4</div>
      {drawProgress(props.bookingStage)}
    </div>
  );
}
const BookingStage = connect(mapStateToProps)(ConnectedBookingStage);
export default BookingStage;

function drawProgress(stage) {
  let options = {
    width: `${(100 / 3) * stage}%`,
  };
  return <div className="progress" style={options}></div>;
}
