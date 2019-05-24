import React, { Component } from 'react';
import { getMovies } from '../../../webAPI';
import MovieCard from './MovieCard';


class Heading extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loadedMovies: [],
    };
  }

  componentWillMount() {
    getMovies()
    .then(res => {
     let loadedMovies = res.map(movie => <MovieCard movie={movie}/>
     );
     this.setState({loadedMovies});
    });

  }

  render() {
    return (
      <div className="heading">
          <div className="heading-header">
            <h2>Now in the cinema</h2>
          </div>
          <div className="heading-body">
            {this.state.loadedMovies}
          </div>
        </div>
    );
  }
}

export default Heading;
