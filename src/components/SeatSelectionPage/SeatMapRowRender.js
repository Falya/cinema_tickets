import React from 'react';
import SeatComponent from './SeatComponent';

const SeatMapRowRender = props => {
  const [hall] = props.seanceInfo.cinemaInfo.halls;
  const { blockedSeatsByUser, blockedSeats } = props.seanceInfo;
  const { soldSeats } = props.seanceInfo.seance;
  const vipRows = hall.rows.filter(row => row.rowType === 'vip');

  const seat = hall.rows.map(row => {
    const rowStart = calcRowCoefficient(row.rowNumber, vipRows);
    const seats = [<span style={{ gridRow: rowStart.toString() }}>{row.rowNumber}</span>];
    const middle = props.maxLength / 2;
    let size = 1;
    let style = {};

    for (let i = 1; i <= row.rowLength; i++) {
      let seatState = null;
      let pos = i;

      const isSold =
        soldSeats.length &&
        soldSeats.some(({ rowNumber, seatNumber }) => rowNumber === row.rowNumber && seatNumber === i);

      const isLocked =
        blockedSeats.length && blockedSeats.some(blocked => blocked.row == row.rowNumber && blocked.seat == i);

      const isLockedByUser =
        blockedSeatsByUser.length &&
        blockedSeatsByUser.some(blocked => blocked.row == row.rowNumber && blocked.seat == i);

      if (isSold || isLocked) {
        seatState = 'sold';
      }

      if (isLockedByUser) {
        seatState = 'blocked';
      }

      if (row.rowType === 'double') {
        style = {
          gridRow: `${rowStart} / span 1`,
          gridColumnEnd: 'span 2',
        };
        size = 2;
        pos = i * size - 1;
      } else if (row.rowType === 'vip') {
        style = {
          gridRow: `${row.rowNumber} / span 2`,
          gridColumnEnd: 'span 2',
        };
        size = 3;
        pos = i * size - 1;
      } else {
        style = {
          gridRow: `${rowStart} / span 1`,
        };
      }

      const halfOfRowLength = Math.round(row.rowLength / 2);
      if (i <= halfOfRowLength) {
        style = {
          ...style,
          gridColumnStart: (middle - halfOfRowLength * size + pos).toString(),
        };
      } else {
        style = {
          ...style,
          gridColumnStart: (middle + (pos - halfOfRowLength * size)).toString(),
        };
      }
      const seat = (
        <SeatComponent
          style={style}
          rowNumber={row.rowNumber}
          seatNumber={i}
          seatType={row.rowType}
          seatState={seatState}
          seatPrice={row.price}
        />
      );
      seats.push(seat);
    }
    seats.push(
      <span className="row_end" style={{ gridRow: rowStart.toString() }}>
        {row.rowNumber}
      </span>
    );
    return seats;
  });

  return (
    <div className="seat_map" style={props.mapSize}>
      {seat}
    </div>
  );
};

function calcRowCoefficient(rowNumber, vipRows) {
  if (vipRows.some(vip => rowNumber - vip.rowNumber > 0)) {
    return rowNumber + 1;
  }

  return rowNumber;
}

export default SeatMapRowRender;
