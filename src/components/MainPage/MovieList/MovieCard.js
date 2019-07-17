import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from 'antd/lib/button';

class MovieCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.movie._id,
    };
  }

  render() {
    return (
      <div className="card" key={this.props.movie._id}>
        <div className="card-body">
          <figure>
            <div className="image-wrapper">
              <Link to={`/schedule/movie/${this.props.movie._id}`}>
                <div className="card-overlay" />
              </Link>
              <img src={this.props.movie.poster} alt="" />
            </div>
            <figcaption>
              <p>
                {this.props.movie.language.toUpperCase()} / {this.props.movie.age}+
              </p>
              <h3>{this.props.movie.name}</h3>
              <span>{this.props.movie.genre.join(', ')}</span>
            </figcaption>
          </figure>
          <Link className="button-link" to={`/schedule/movie/${this.props.movie._id}`}>
            <Button size="normal" ghost>
              booking
            </Button>
          </Link>
        </div>
      </div>
    );
  }
}

export default MovieCard;
