import React, { Component } from 'react';
import SeanceCard from './SeanceCard';

class MovieTheaterSeances extends Component {
  constructor(props) {
    super(props);
  }

  renderSeances = (seances) => {
    return seances.map(seance => {
      return <SeanceCard seance={seance} key={seance._id}/>;
    });
  }

  render() {
    const { movieTheater } = this.props;
    return (
      <div className="movie-seance-card">
        <div className="cinema-info">
          <h3>{movieTheater.cinema_name}</h3>
          <span>{movieTheater.adress}</span>
        </div>
        <div className="seances">
          {this.renderSeances(movieTheater.seances)}
        </div>
      </div>
    );
  }
}

export default MovieTheaterSeances;
