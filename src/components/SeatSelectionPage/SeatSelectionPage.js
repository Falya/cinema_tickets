import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route } from 'react-router-dom';
import './seat-selection-page.scss';
import {
  setBlur,
  setSeanceId,
  getMovieApi,
  setBookingStage,
  getSeanceApi,
  getCurrencyApi,
} from '../../redux/actions/actions';
import SeatMap from './SeatMap';
import SeatTypeCard from './SeatTypeCard';
import BookingStage from '../BookingStage/BookingStage';
import StopWatch from './StopWatch';
import UserOrder from './UserOrders/UserOrder';
import PaymentPage from '../PaymentPage/PaymentPage';
import SuccessPaymentPage from './SuccessPaymentPage/SuccessPaymentPage';

const mapStateToProps = state => {
  return {
    movie: state.movieReducer.movie,
    seanceInfo: state.seanceReducer.seanceInfo,
    userName: state.userNameReducer.userName,
  };
};

const seanceIdRegexp = /^\/schedule\/movie\/((?:[^/]+?))\/seance\/((?:[^/]+?))(?:\/(?=$))?(?:\/login|\/registration)?$/;

class ConnectedSeatSelectionPage extends Component {
  constructor(props) {
    super(props);
  }

  onCloseButton = () => {
    this.props.history.replace('/');
  };

  onBackButton = () => {
    this.props.history.go(-1);
  };

  formatDate = () => {
    const { date } = this.props.seanceInfo.seance;
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

  rowTypeDefinition = () => {
    const types = new Map();
    const [hall] = this.props.seanceInfo.cinemaInfo.halls;
    hall.rows.map(row => types.set(row.rowType, row));

    return [...types.values()].map(row => SeatTypeCard(row));
  };

  componentDidMount() {
    this.setState({ path: this.props.history.location.pathname });
    if (!this.props.movie) {
      this.props.getMovieApi(this.props.match.params.movieId);
    }
    this.props.setSeanceId(this.props.match.params.seanceId);
    this.props.setBlur(true);
    this.props.setBookingStage(1);
    this.props.getCurrencyApi();
  }

  componentWillUnmount() {
    this.props.setBlur(false);
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.userName !== nextProps.userName) {
      this.props.getSeanceApi(this.props.match.params.seanceId);
    }

    return nextProps !== this.props;
  }

  render() {
    const { movie, seanceInfo } = this.props;
    return (
      <section className="seat_selection_page">
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
            <div className="bottom_element">
              <BookingStage />
              {seanceInfo.blockedSeatsByUser[0] && <StopWatch />}
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
                    <div className="cinema_info__address">
                      <span className="text_icon icon-location2"></span>
                      <span>
                        {seanceInfo.cinemaInfo.cinemaName}, {seanceInfo.cinemaInfo.address} /{' '}
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
              <Route exact path="/schedule/movie/:movieId/seance/:seanceId/payment" component={PaymentPage} />
              <Route
                exact
                path={seanceIdRegexp}
                render={() => {
                  return (
                    <div className="body__seats">
                      <SeatMap />
                      {!seanceInfo.blockedSeatsByUser[0] ? (
                        <div className="seats__seats_info">
                          <h2>Types of seats</h2>
                          {this.rowTypeDefinition()}
                        </div>
                      ) : (
                        <UserOrder />
                      )}
                    </div>
                  );
                }}
              />
              <Route path="/schedule/movie/:movieId/seance/:seanceId/payment/accepted" component={SuccessPaymentPage} />
            </div>
          )}
        </div>
      </section>
    );
  }
}

const SeatSelectionPage = connect(
  mapStateToProps,
  { setBlur, setSeanceId, getMovieApi, setBookingStage, getSeanceApi, getCurrencyApi }
)(ConnectedSeatSelectionPage);

export default withRouter(SeatSelectionPage);
