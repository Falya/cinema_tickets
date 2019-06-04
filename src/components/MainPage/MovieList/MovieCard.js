import React, { Component } from 'react';
import { Button } from 'antd';

class MovieCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.movie._id
    };
  }
  /**
   * @param {Event} e;
   */
  onBooking = e => {
    e.stopPropagation();
    this.props.cardMethod(this.state.id, 'showBookingPage');
  };

  /**
   * @param {Event} e;
   */
  onCardClick = e => {
    this.props.cardMethod(this.state.id, 'showMoviePage');
  };

  render() {
    return (
      <div className="card" key={this.props.movie._id} onClick={this.onCardClick}>
        <div className="card-body">
          <figure>
            <div className="image-wrapper">
              <div className="card-overlay" />
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
          <Button size="normal" ghost onClick={this.onBooking}>
            booking
          </Button>
        </div>
      </div>
    );
  }
}

export default MovieCard;
