import React, { Component } from 'react';

class SeanceCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seanceId: this.props.seance._id,
    };
  }

  render() {
    const {date, hall_name, format} = this.props.seance;
    const newDate = new Date(date);
    return (
      <div className="seance-card">
        <span className="time">{newDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
        <span className="format">{format.video} {format.sound}</span>
        <span className="hall">{hall_name}</span>
      </div>
    );
  }
}

export default SeanceCard;
