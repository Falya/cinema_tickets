import React, { Component } from 'react';
import { connect } from 'react-redux';
import SeatComponent from './SeatComponent';

const mapStateToProps = state => {
  return {
    seanceInfo: state.seanceReducer.seanceInfo,
  };
};

class ConnectedSeatMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      maxLength: null,
    };
  }

  mapSize = () => {
    const [hall] = this.props.seanceInfo.cinemaInfo.halls;

    return {
      gridTemplateColumns: `repeat(${this.state.maxLength}, minmax(15px, 1fr))`,
      gridTemplateRows: `repeat(${hall.rows.length}, 40px)`,
    };
  };

  renderRows = () => {
    const [hall] = this.props.seanceInfo.cinemaInfo.halls;
    const { blockedSeatsByUser, blockedSeats } = this.props.seanceInfo;
    const { soldSeats } = this.props.seanceInfo.seance;

    const seat = hall.rows.map(row => {
      const seats = [<span style={{ gridRow: row.rowNumber.toString() }}>{row.rowNumber}</span>];
      const middle = this.state.maxLength / 2;
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
            gridRow: `${row.rowNumber.toString()} / span 1`,
            gridColumnEnd: 'span 2',
          };
          size = 2;
          pos = i * size - 1;
        } else {
          style = {
            gridRow: `${row.rowNumber.toString()} / span 1`,
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
        <span className="row_end" style={{ gridRow: row.rowNumber.toString() }}>
          {row.rowNumber}
        </span>
      );
      return seats;
    });
    return seat;
  };

  componentDidMount() {
    const [hall] = this.props.seanceInfo.cinemaInfo.halls;
    const maxLength =
      [...hall.rows].sort((a, b) => {
        return a.rowLength < b.rowLength ? 1 : -1;
      })[0].rowLength + 2;
    this.setState({ maxLength });
  }

  render() {
    return (
      <div className="seats__seats_selection">
        <div className="screen">Screen</div>
        <div className="seat_map" style={this.mapSize()}>
          {this.renderRows()}
        </div>
        <div className="seat_state_information">
          <div className="free_state"></div>
          <span>Free seat</span>
          <div className="blocked_state"></div>
          <span>Blocked seat</span>
          <div className="sold_state"></div>
          <span>Sold seat</span>
        </div>
      </div>
    );
  }
}

const SeatMap = connect(mapStateToProps)(ConnectedSeatMap);

export default SeatMap;
