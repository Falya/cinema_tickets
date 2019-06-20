import React, { Component } from 'react';

class StopWatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
    };
  }

  componentDidMount() {
    console.log('mounted');
    const startTime = new Date(this.props.time);
    startTime.setMinutes(startTime.getMinutes() + 15);
    setInterval(() => {
      const time = startTime.getTime() - Date.now();
      this.setState({ time });
    }, 1000);
  }

  getTime = () => {
    let minutes = parseInt(this.state.time / 60 / 1000, 10);
    let seconds = parseInt((this.state.time / 1000) % 60, 10);

    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${minutes}:${seconds}`;
  };

  render() {
    return (
      <div className="block_timer">
        <span className="icon-stopwatch"></span>
        <span>{this.getTime()}</span>
      </div>
    );
  }
}

export default StopWatch;
