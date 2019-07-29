import React, { Component } from 'react';
import Popover from 'antd/lib/popover';
import { connect } from 'react-redux';
import { toBlockSeat, unBlockSeat } from '../../webAPI';
import { getSeanceApi, setSeatLoadingState } from '../../redux/actions/actions';
import { withRouter } from 'react-router-dom';
import message from 'antd/lib/message';

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
      messageDuration: 5,
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

  seatStateDefinition = () => {
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
    const { setSeatLoadingState } = this.props;
    if (!this.props.seatState) {
      const params = {
        row: this.props.rowNumber,
        seat: this.props.seatNumber,
        seanceId: this.props.seanceId,
        price: this.props.seatPrice,
        seatType: this.props.seatType,
      };

      setSeatLoadingState(true);

      toBlockSeat(params)
        .then(res => {
          if (res.success && !res.status) {
            this.props.getSeanceApi(this.props.seanceId);
            message.success(res.message, this.state.messageDuration);
          } else if (!res.success && !res.status) {
            message.error(res.message, this.state.messageDuration);
          } else {
            message.error('You aren`t logged in. Please login', this.state.messageDuration);
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

      setSeatLoadingState(true);

      unBlockSeat(params)
        .then(res => {
          this.props.getSeanceApi(this.props.seanceId);
          if (res.success) {
            message.success(res.message, this.state.messageDuration);
          } else {
            message.error(res.message, this.state.messageDuration);
          }
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
        visible={this.props.isEmptyPlace}
        mouseEnterDelay={0.2}>
        <div
          className={`seat ${this.seatStateDefinition()} ${this.props.seatType.toLowerCase()}`}
          style={this.props.style}
          onClick={this.onSeatClick}>
          {this.state.seatNumber}
        </div>
      </Popover>
    );
  }
}

const SeatComponent = connect(
  mapStateToProps,
  { getSeanceApi, setSeatLoadingState }
)(ConnectedSeatComponent);

export default withRouter(SeatComponent);
