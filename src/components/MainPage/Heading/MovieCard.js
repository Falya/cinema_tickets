import React, { Component } from 'react';
import { Button } from 'antd';

class MovieCard extends Component {
  constructor(props) {
    super(props);

  }


  render() {
    return (
      <div className="card">
              <div className="card-body">
                <figure>
                  <div className="image-wrapper">
                    <div className="card-overlay" />
                    <img src={this.props.movie.poster} alt="" />
                  </div>
                  <figcaption>
                    <p>{this.props.movie.language}/{this.props.movie.age}+</p>
                    <h3>{this.props.movie.name}</h3>
                    <span>{this.props.movie.genre}</span>
                  </figcaption>
                </figure>
                <Button size="normal" ghost>
                  booking
                </Button>
              </div>
            </div>
    );
  }
}


export default MovieCard;
