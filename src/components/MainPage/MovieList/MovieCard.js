import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Button from 'antd/lib/button';

class MovieCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.movie._id,
    };
  }

  onCardClick = () => {
    this.props.history.push(`/schedule/movie/${this.props.movie._id}`);
  };

  render() {
    return (
      <div className="card" key={this.props.movie._id}>
        <div className="card-body">
          <figure>
            <div className="image-wrapper">
              <div className="card-overlay" onClick={this.onCardClick} />
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
          <Button size="normal" className="button-link" ghost onClick={this.onCardClick}>
            booking
          </Button>
        </div>
      </div>
    );
  }
}

export default withRouter(MovieCard);
