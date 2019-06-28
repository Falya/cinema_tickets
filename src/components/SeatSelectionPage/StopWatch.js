import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSeanceApi } from '../../redux/actions/actions';

const mapStateToProps = state => {
  return {
    seanceInfo: state.seanceReducer.seanceInfo,
  };
};

class ConnectedStopWatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
    };
  }

  componentDidMount() {
    this.setTimeInterval(this.props.seanceInfo.blockedSeatsByUser[0].expireAt);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.seanceInfo.blockedSeatsByUser[0].expireAt !== nextProps.seanceInfo.blockedSeatsByUser[0].expireAt) {
      clearInterval(this.intervalId);
      this.setTimeInterval(nextProps.seanceInfo.blockedSeatsByUser[0].expireAt);
      return true;
    }
    if (nextState.time < 0) {
      this.setState({ time: 0 });
    }

    return this.state !== nextState;
  }

  setTimeInterval = date => {
    const startTime = new Date(date);
    startTime.setSeconds(startTime.getSeconds());
    this.intervalId = setInterval(() => {
      const time = startTime.getTime() - Date.now();
      this.setState({ time });
    }, 1000);
  };

  getTime = () => {
    let minutes = parseInt(this.state.time / 60 / 1000, 10);
    let seconds = parseInt((this.state.time / 1000) % 60, 10);

    if (minutes <= 0 && seconds < 0) {
      this.props.getSeanceApi(this.props.seanceInfo.seanceId);
      clearInterval(this.intervalId);
      return '00:00';
    }

    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${minutes}:${seconds}`;
  };

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  render() {
    return (
      <div className="block_timer">
        <span className="icon-stopwatch"></span>
        <span className="time">{this.getTime()}</span>
        <span>to buying tickets</span>
      </div>
    );
  }
}

const StopWatch = connect(
  mapStateToProps,
  { getSeanceApi }
)(ConnectedStopWatch);

export default StopWatch;
