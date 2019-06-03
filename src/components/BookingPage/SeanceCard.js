import React, { Component } from 'react';

class SeanceCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seanceId: this.props.seance._id
    };
  }

  render() {
    const { date, hallName, format } = this.props.seance;
    const newDate = new Date(date);

    return (
      <div className="seance__card">
        <span className="card__time">{newDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        <span className="card__format">
          {format.video} {format.sound}
        </span>
        <span className="card__hall">{hallName}</span>
      </div>
    );
  }
}

export default SeanceCard;
