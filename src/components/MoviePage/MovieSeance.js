import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MovieSeance extends Component {
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
      <div className="seance-card">
        <span className="time">17:05</span>
        <span className="format">2D Dolby Digital</span>
        <span className="hall">Зал 1</span>
      </div>
    );
  }
}

MovieSeance.propTypes = {};

export default MovieSeance;
