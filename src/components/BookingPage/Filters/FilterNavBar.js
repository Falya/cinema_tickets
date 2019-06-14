import React, { Component } from 'react';
import { connect } from 'react-redux';
import FilterComponent from './FilterComponent';
import FilterFeaturesComponent from './FilterFeaturesComponent';
import { getFiltersApi, setFilterParams, getSeancesApi } from '../../../redux/actions/actions';

const mapStateToProps = ({ filterParamsReducer, filtersReducer }) => {
  return {
    parameters: filterParamsReducer.filterParameters,
    options: filtersReducer.filterOptions
  };
};

class ConnectedFilterNavBar extends Component {
  constructor(props) {
    super(props);
  }

  setCity = city => {
    const params = {
      cityId: city,
      movieId: this.props.parameters.movieId
    };

    this.props.getFiltersApi(params);
    const date = this.getCurrentDate();
    this.props.setFilterParams({ ...this.props.parameters, city, date, movieTheaterId: 'All cinemas' });
  };

  setDate = date => {
    this.props.setFilterParams({ ...this.props.parameters, date });
  };

  setMovieTheater = movieTheaterId => {
    const params = {
      movieId: this.props.parameters.movieId,
      cityId: this.props.parameters.city
    };
    if (movieTheaterId !== 'All cinemas') {
      params.movieTheaterId = movieTheaterId;
    }

    this.props.getFiltersApi(params);
    const date = this.getCurrentDate();
    this.props.setFilterParams({ ...this.props.parameters, movieTheaterId, date });
  };

  setMovie = movieId => {
    const params = {
      movieId,
      cityId: this.props.parameters.city
    };

    this.props.getFiltersApi(params);
    this.props.setFilterParams({ ...this.props.parameters, movieId });
  };

  setFeatures = features => {
    this.props.setFilterParams({ ...this.props.parameters, features });
  };

  getCurrentDate = () => {
    return new Date().toISOString();
  };

  shouldComponentUpdate(nextProps) {
    if (nextProps.options && !this.props.parameters.city) {
      const [city] = nextProps.options.cities.filter(({ city }) => city === 'Minsk');
      this.props.setFilterParams({ ...this.props.parameters, city: city._id });
    }

    if (nextProps.parameters !== this.props.parameters && nextProps.parameters.city) {
      this.props.getSeancesApi(nextProps.parameters);
    }

    return nextProps !== this.props;
  }

  formatDate = () => {
    const { date } = this.props.parameters;
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('en', { month: 'long', day: 'numeric', weekday: 'long' });
  };

  render() {
    const { options } = this.props;
    return (
      options && (
        <div className="header__filter_bar">
          <FilterComponent options={options.cities} defaultValue={this.props.parameters.city} setMethod={this.setCity} icon="icon-location" />
          <FilterComponent
            options={options.movieTheaters}
            defaultValue={this.props.parameters.movieTheaterId}
            setMethod={this.setMovieTheater}
            name="cinemas"
            icon="icon-home"
          />
          <FilterComponent options={options.movies} defaultValue={this.props.parameters.movieId} setMethod={this.setMovie} icon="icon-film" />
          <FilterComponent options={options.dates} defaultValue={this.formatDate()} setMethod={this.setDate} icon="icon-calendar" />
          <FilterFeaturesComponent setMethod={this.setFeatures} icon="icon-filter" />
        </div>
      )
    );
  }
}

const FilterNavBar = connect(
  mapStateToProps,
  { getFiltersApi, setFilterParams, getSeancesApi }
)(ConnectedFilterNavBar);

export default FilterNavBar;
