import React, { Component } from 'react';
import FilterComponent from './FilterComponent';
import { getFilters } from '../../../webAPI';
import FilterFeaturesComponent from './FilterFeaturesComponent';

class FilterNavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      parameters: this.props.parameters,
      options: null,
    };

    getFilters(this.state.parameters.city, this.state.parameters.movieId, this.state.parameters.movieTheaterId).then(options => {
      const [city] = options.cities.filter(({city}) => city === 'Minsk');
      this.setState({ options, parameters: {...this.state.parameters, city: city._id}});
    });
  }

  setCity = city => {
    getFilters(city, this.state.parameters.movieId, 'All cinemas').then(options => {
      const date = this.getCurrentDate();
      this.setState({ options, parameters: { ...this.state.parameters, city, date, movieTheaterId: 'All cinemas' } });
    });
  };

  setDate = date => {
    this.setState({ parameters: { ...this.state.parameters, date } });
  };

  setMovieTheater = movieTheaterId => {
    getFilters(this.state.parameters.city, this.state.parameters.movieId, movieTheaterId).then(options => {
      const date = this.getCurrentDate();
      this.setState({ options, parameters: { ...this.state.parameters, movieTheaterId, date } });
    });
  };

  setMovie = movieId => {
    getFilters(this.state.parameters.city, movieId, this.state.parameters.movieTheaterId).then(options => {
      this.setState({ options, parameters: { ...this.state.parameters, movieId } });
    });
  };

  setFeatures = features => {
    this.setState({ parameters: { ...this.state.parameters, features } });
  };

  getCurrentDate = () => {
    return new Date().toISOString();
  };

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
          <FilterComponent options={options.cities} defaultValue={this.state.parameters.city} setMethod={this.setCity} />
          <FilterComponent
            options={options.movieTheaters}
            defaultValue={this.state.parameters.movieTheaterId}
            setMethod={this.setMovieTheater}
            name="cinemas"
          />
          <FilterComponent options={options.movies} defaultValue={this.state.parameters.movieId} setMethod={this.setMovie} />
          <FilterComponent options={options.dates} defaultValue={this.formatDate()} setMethod={this.setDate} />
          <FilterFeaturesComponent setMethod={this.setFeatures} />
        </div>
      )
    );
  }
}

export default FilterNavBar;
