import React from 'react';
import './booking-stage.scss';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    bookingStage: state.seanceReducer.bookingStage,
  };
};

function ConnectedBookingStage(props) {
  let options = {
    gridColumnEnd: `span ${props.bookingStage}`,
  };
  return (
    <div className="booking_stage">
      <div className="stage stage_1">1</div>
      <div className="stage stage_2">2</div>
      <div className="stage stage_3">3</div>
      <div className="stage stage_4">4</div>
      <div className="progress" style={options}></div>
    </div>
  );
}
const BookingStage = connect(mapStateToProps)(ConnectedBookingStage);
export default BookingStage;
