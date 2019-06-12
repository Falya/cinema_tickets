import React, { Component } from 'react';
import FilterComponent from './FilterComponent';
import { getFilters } from '../../../webAPI';
import FilterFeaturesComponent from './FilterFeaturesComponent';

class FilterNavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      parameters: this.props.parameters,
      options: null
    };
  }

  setCity = city => {
    const params = {
      cityId: city,
      movieId: this.state.parameters.movieId
    };
    getFilters(params).then(options => {
      const date = this.getCurrentDate();
      this.setState({ options, parameters: { ...this.state.parameters, city, date, movieTheaterId: 'All cinemas' } });
    });
  };

  setDate = date => {
    this.setState({ parameters: { ...this.state.parameters, date } });
  };

  setMovieTheater = movieTheaterId => {
    const params = {
      movieId: this.state.parameters.movieId,
      cityId: this.state.parameters.city
    };
    if (movieTheaterId !== 'All cinemas') {
      params.movieTheaterId = movieTheaterId;
    }

    getFilters(params).then(options => {
      const date = this.getCurrentDate();
      this.setState({ options, parameters: { ...this.state.parameters, movieTheaterId, date } });
    });
  };

  setMovie = movieId => {
    const params = {
      movieId,
      cityId: this.state.parameters.city
    };

    getFilters(params).then(options => {
      this.setState({ options, parameters: { ...this.state.parameters, movieId } });
    });
  };

  setFeatures = features => {
    this.setState({ parameters: { ...this.state.parameters, features } });
  };

  getCurrentDate = () => {
    return new Date().toISOString();
  };

  componentDidMount() {
    const params = {
      movieId: this.state.parameters.movieId
    };
    getFilters(params).then(options => {
      const [city] = options.cities.filter(({ city }) => city === 'Minsk');
      this.setState({ options, parameters: { ...this.state.parameters, city: city._id } });
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.parameters !== this.state.parameters) {
      this.props.onChangeMethod(nextState.parameters);
    }
    return nextState !== this.state;
  }

  formatDate = () => {
    const { date } = this.state.parameters;
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('en', { month: 'long', day: 'numeric', weekday: 'long' });
  };

  render() {
    const { options } = this.state;
    return (
      options && (
        <div className="header__filter_bar">
          <FilterComponent options={options.cities} defaultValue={this.state.parameters.city} setMethod={this.setCity} icon="icon-location" />
          <FilterComponent
            options={options.movieTheaters}
            defaultValue={this.state.parameters.movieTheaterId}
            setMethod={this.setMovieTheater}
            name="cinemas"
            icon="icon-home"
          />
          <FilterComponent options={options.movies} defaultValue={this.state.parameters.movieId} setMethod={this.setMovie} icon="icon-film" />
          <FilterComponent options={options.dates} defaultValue={this.formatDate()} setMethod={this.setDate} icon="icon-calendar" />
          <FilterFeaturesComponent setMethod={this.setFeatures} icon="icon-filter" />
        </div>
      )
    );
  }
}

export default FilterNavBar;
