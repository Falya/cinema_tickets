import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MovieSeance from './MovieSeance';

class CinemaSeance extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {}

  shouldComponentUpdate(nextProps, nextState) {}

  componentWillUpdate(nextProps, nextState) {}

  componentDidUpdate(prevProps, prevState) {}

  componentWillUnmount() {}

  render() {
    return (
      <div className="movie-seance-card">
        <div className="cinema-info">
          <h3>Silver Screen cinemas в ТРЦ "Galileo"</h3>
          <span>г. Минск, ул.Бобруйская, 6</span>
        </div>
        <div className="seances">
          <MovieSeance />
        </div>
      </div>
    );
  }
}

CinemaSeance.propTypes = {};

export default CinemaSeance;
