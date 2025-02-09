import React, { Component } from 'react';
import SeanceCard from './SeanceCard';

class MovieTheaterSeances extends Component {
  constructor(props) {
    super(props);
  }

  renderSeances = seances => {
    return seances.map(seance => {
      return <SeanceCard seance={seance} key={seance._id} />;
    });
  };

  render() {
    const { movieTheater } = this.props;

    return (
      <div className="seances__card">
        <div className="card__cinema_info">
          <h3>{movieTheater.cinemaName}</h3>
          <span>{movieTheater.address}</span>
        </div>
        <div className="seance">{this.renderSeances(movieTheater.seances)}</div>
      </div>
    );
  }
}

export default MovieTheaterSeances;
