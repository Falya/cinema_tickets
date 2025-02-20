import React, { Component } from 'react';
import { connect } from 'react-redux';
import SeatMapRowRender from './SeatMapRowRender';
import { setBookingStage } from '../../redux/actions/actions';

const mapStateToProps = state => {
  return {
    seanceInfo: state.seanceReducer.seanceInfo,
    loading: state.loadingStateReducer.seatLoading,
  };
};

class ConnectedSeatMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      maxLength: null,
    };
  }

  mapSize = () => {
    const [hall] = this.props.seanceInfo.cinemaInfo.halls;

    const vipRows = hall.rows.filter(row => row.rowType === 'vip');

    return {
      gridTemplateColumns: `repeat(${this.state.maxLength}, minmax(15px, 1fr))`,
      gridTemplateRows: `repeat(${hall.rows.length + vipRows.length}, 40px)`,
    };
  };

  componentDidMount() {
    this.props.setBookingStage(1);
    const [hall] = this.props.seanceInfo.cinemaInfo.halls;
    const maxLength =
      [...hall.rows].sort((a, b) => {
        return a.rowLength < b.rowLength ? 1 : -1;
      })[0].rowLength + 2;
    this.setState({ maxLength });
  }

  render() {
    const { loading } = this.props;
    return (
      <div className="seats__seats_selection">
        {loading && (
          <div className="seats_spinner">
            <span className="icon-spinner2" />
          </div>
        )}
        <div className="screen">Screen</div>
        <SeatMapRowRender
          seanceInfo={this.props.seanceInfo}
          maxLength={this.state.maxLength}
          mapSize={this.mapSize()}
        />
        <div className="seat_state_information">
          <div className="free_state"></div>
          <span>Free seat</span>
          <div className="blocked_state"></div>
          <span>Blocked seat</span>
          <div className="sold_state"></div>
          <span>Sold seat</span>
        </div>
      </div>
    );
  }
}

const SeatMap = connect(
  mapStateToProps,
  { setBookingStage }
)(ConnectedSeatMap);

export default SeatMap;
