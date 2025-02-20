import React, { Component } from 'react';
import YouTube from 'react-player/lib/players/YouTube';

class TrailerPlayer extends Component {
  constructor(props) {
    super(props);

    this.player = new React.createRef();
    this.state = {
      height: '100px',
    };
  }

  componentDidMount() {
    this.setState({ height: `${this.player.current.clientWidth * (360 / 640)}px` });
    window.addEventListener('resize', this.changePlayerHeight);
  }

  changePlayerHeight = () => {
    this.setState({ height: `${this.player.current.clientWidth * (360 / 640)}px` });
  };

  componentWillUnmount() {
    window.removeEventListener('resize', this.changePlayerHeight);
  }

  render() {
    const settings = {
      controls: true,
      light: true,
      width: '100%',
      height: this.state.height,
    };

    return (
      <div className="movie_trailer_preview" ref={this.player}>
        <YouTube url={this.props.trailer} {...settings} />
      </div>
    );
  }
}

export default TrailerPlayer;
