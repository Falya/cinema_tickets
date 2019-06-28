import React from 'react';

export default function SeatTypeCard(props) {
  return (
    <div className="seat_type">
      <div className="seat_image">
        <div className={`seat_size ${props.rowType.toLowerCase()}`}></div>
      </div>
      <div className="seat_type__head">
        <div className="seat_head_info">
          <h3>{props.rowType}</h3>
          <span className="seat_price">{props.price} BYN</span>
        </div>
      </div>
    </div>
  );
}
