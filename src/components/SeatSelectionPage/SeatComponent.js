import React, { Component } from 'react';
import { Popover } from 'antd';
import { connect } from 'react-redux';
import { toBlockSeat, unBlockSeat } from '../../webAPI';
import { getSeanceApi } from '../../redux/actions/actions';
import { withRouter } from 'react-router-dom';

const mapStateToProps = state => {
  return {
    seanceId: state.seanceReducer.seanceInfo.seanceId,
    blockedByUser: state.seanceReducer.seanceInfo.blockedSeatsByUser,
  };
};

class ConnectedSeatComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rowNumber: this.props.rowNumber,
      seatNumber: this.props.seatNumber,
    };
  }

  makeContent = () => {
    if (this.props.seatState === 'sold') {
      return <p>Sold place</p>;
    }
    return [
      <p>Row: {this.props.rowNumber}</p>,
      <p>Seat: {this.props.seatNumber}</p>,
      <p>Price: {this.props.seatPrice} BYN</p>,
    ];
  };

  setSeatState = () => {
    switch (this.props.seatState) {
      case 'blocked':
        return 'seat_blocked';

      case 'sold':
        return 'seat_sold';

      default:
        return '';
    }
  };

  onSeatClick = () => {
    if (!this.props.seatState) {
      const params = {
        row: this.props.rowNumber,
        seat: this.props.seatNumber,
        seanceId: this.props.seanceId,
        price: this.props.seatPrice,
        seatType: this.props.seatType,
      };

      toBlockSeat(params)
        .then(res => {
          if (res !== 401) {
            this.props.getSeanceApi(this.props.seanceId);
          } else {
            this.props.history.push(`${this.props.history.location.pathname}/login`);
          }
        })
        .catch(err => console.error(err));
    }

    if (this.props.seatState === 'blocked') {
      const [seat] = this.props.blockedByUser.filter(
        seat => seat.row === this.props.rowNumber && seat.seat === this.props.seatNumber
      );
      const params = {
        seatId: seat._id,
      };
      unBlockSeat(params)
        .then(res => {
          this.props.getSeanceApi(this.props.seanceId);
          return console.log(res);
        })
        .catch(err => console.error(err));
    }
  };

  render() {
    return (
      <Popover
        title={this.props.seatType}
        overlayClassName="tooltip_overlay"
        content={this.makeContent()}
        mouseEnterDelay={0.2}>
        <div className={`seat ${this.setSeatState()}`} style={this.props.style} onClick={this.onSeatClick}>
          {this.state.seatNumber}
        </div>
      </Popover>
    );
  }
}

const SeatComponent = connect(
  mapStateToProps,
  { getSeanceApi }
)(ConnectedSeatComponent);

export default withRouter(SeatComponent);
