import React, { Component } from 'react';
import { Popover } from 'antd';

class SeatComponent extends Component {
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

  render() {
    return (
      <Popover
        title={this.props.seatType}
        overlayClassName="tooltip_overlay"
        content={this.makeContent()}
        mouseEnterDelay={0.2}>
        <div className={`seat ${this.setSeatState()}`} style={this.props.style}>
          {this.state.seatNumber}
        </div>
      </Popover>
    );
  }
}

SeatComponent.propTypes = {};

export default SeatComponent;
