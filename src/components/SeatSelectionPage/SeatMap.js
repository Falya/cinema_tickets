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
      gridTemplateRows: `repeat(${hall.rows.length}, 1fr)`,
    };
  };

  renderRows = () => {
    const [hall] = this.props.seanceInfo.cinemaInfo.halls;
    const seat = hall.rows.map(row => {
      const seats = [<span style={{ gridRow: row.rowNumber.toString() }}>{row.rowNumber}</span>];
      const middle = this.state.maxLength / 2;
      let size = 1;
      let style = {};

      for (let i = 1; i <= row.rowLength; i++) {
        let pos = i;
        if (row.rowType === 'double') {
          style = {
            gridRow: row.rowNumber.toString(),
            gridColumnEnd: 'span 2',
          };
          size = 2;
          pos = i * size - 1;
        } else {
          style = {
            gridRow: row.rowNumber.toString(),
          };
        }

        if (i < row.rowLength / 2) {
          style = {
            ...style,
            gridColumnStart: (middle - (row.rowLength / 2) * size + pos).toString(),
          };
        } else {
          style = {
            ...style,
            gridColumnStart: (middle + (pos - (row.rowLength / 2) * size)).toString(),
          };
        }
        const seat = (
          <SeatComponent
            style={style}
            rowNumber={row.rowNumber}
            seatNumber={i}
            seatType={row.rowType}
            isBlocked={false}
            seatPrice={row.price}
          />
        );
        seats.push(seat);
      }
      seats.push(<span style={{ gridRow: row.rowNumber.toString() }}>{row.rowNumber}</span>);
      return seats;
    });
    console.log(seat);
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
    const [hall] = this.props.seanceInfo.cinemaInfo.halls;
    console.log(hall);
    return (
      <div className="seats__seats_selection">
        <div className="screen">Screen</div>
        <div className="seat_map" style={this.mapSize()}>
          {this.renderRows()}
        </div>
      </div>
    );
  }
}

const SeatMap = connect(mapStateToProps)(ConnectedSeatMap);

export default SeatMap;
