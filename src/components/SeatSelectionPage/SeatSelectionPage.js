import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './seat-selection-page.scss';
import { setBlur, setSeanceId, getMovieApi, setBookingStage } from '../../redux/actions/actions';
import SeatMap from './SeatMap';
import SeatTypeCard from './SeatTypeCard';
import BookingStage from '../BookingStage/BookingStage';
import StopWatch from './StopWatch';

const mapStateToProps = state => {
  return {
    loading: state.loadingStateReducer.loading,
    movie: state.movieReducer.movie,
    seanceInfo: state.seanceReducer.seanceInfo,
  };
};

class ConnectedSeatSelectionPage extends Component {
  constructor(props) {
    super(props);

    this.canvasParent = React.createRef();
  }

  onCloseButton = () => {
    this.props.history.replace('/');
  };

  onBackButton = () => {
    this.props.history.go(-1);
  };

  formatDate = () => {
    const date = this.props.seanceInfo.seance.date;
    const dateObj = new Date(date);
    const formatedDate = dateObj.toLocaleDateString('en', {
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    });

    const startTime = dateObj.toLocaleTimeString('en', {
      hour: '2-digit',
      minute: '2-digit',
    });

    const endDateObj = new Date(date);
    endDateObj.setMinutes(endDateObj.getMinutes() + this.props.movie.duration);

    const endTime = endDateObj.toLocaleTimeString('en', {
      hour: '2-digit',
      minute: '2-digit',
    });

    return `${formatedDate} / ${startTime} - ${endTime}`;
  };

  mapSeatTypes = () => {
    const types = new Map();
    const [hall] = this.props.seanceInfo.cinemaInfo.halls;
    hall.rows.map(row => types.set(row.rowType, row));

    return [...types.values()].map(row => SeatTypeCard(row));
  };

  componentDidMount() {
    if (!this.props.movie) {
      this.props.getMovieApi(this.props.match.params.movieId);
    }
    this.props.setSeanceId(this.props.match.params.seanceId);
    this.props.setBlur(true);
    this.props.setBookingStage(1);
  }

  componentWillUnmount() {
    this.props.setBlur(false);
  }

  render() {
    const { movie, loading, seanceInfo } = this.props;
    return (
      <section className="seat_selection_page">
        {loading && <span className="icon-spinner2 page_spiner" />}
        <div className="seat_selection_page__wrapper">
          <div className="seat_selection_page__header">
            <div className="header__nav_bar">
              <div className="nav_bar__back_btn" onClick={this.onBackButton}>
                <span className="icon-arrow-left" />
              </div>
              <div className="nav_bar__title">
                <h3>{movie && movie.name}</h3>
              </div>
              <div className="nav_bar__close_btn">
                <span className="icon-cross" onClick={this.onCloseButton} />
              </div>
            </div>
          </div>
          {seanceInfo.seance && (
            <div className="seat_selection_page__body">
              <div className="body__seance_info">
                <div className="seance_info__poster">
                  <div className="poster__image">
                    <img src={movie.poster} alt="" />
                  </div>
                </div>
                <div className="seance_info__wrapper">
                  <div className="seance_info__cinema_info">
                    <h1 className="cinema_info__movie_name">{movie && movie.name}</h1>
                    <div className="cinema_info__adress">
                      <span className="text_icon icon-location2"></span>
                      <span>
                        {seanceInfo.cinemaInfo.cinemaName}, {seanceInfo.cinemaInfo.adress} /{' '}
                        {seanceInfo.seance.hallName}
                      </span>
                    </div>
                    <div className="cinema_info__format">
                      <span className="text_icon icon-ticket"></span>
                      <span>
                        {seanceInfo.seance.format.video} / {seanceInfo.seance.format.sound}
                      </span>
                      <span className="movie_age">{movie.age}+</span>
                    </div>
                  </div>
                  <div className="seance_info__time">
                    <span className="text_icon icon-clock"></span>
                    <span>{this.formatDate()}</span>
                  </div>
                </div>
              </div>
              <div className="body__seats">
                <SeatMap />
                <div className="seats__seats_info">
                  <h2>Types of seats</h2>
                  {this.mapSeatTypes()}
                </div>
              </div>
              <StopWatch time={Date.now()} />
              <BookingStage />
            </div>
          )}
        </div>
      </section>
    );
  }
}

const SeatSelectionPage = connect(
  mapStateToProps,
  { setBlur, setSeanceId, getMovieApi, setBookingStage }
)(ConnectedSeatSelectionPage);

export default withRouter(SeatSelectionPage);
