import React, { Component } from 'react';
import '../components/MainPage/main-page.scss';
import MovieList from '../components/MainPage/MovieList/MovieList';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    loading: state.loadingStateReducer.loading,
  };
};

class ConnectedMainPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { loading } = this.props;
    return (
      <section>
        {loading && <span className="icon-spinner2 page_spiner" />}
        <MovieList />
      </section>
    );
  }
}

const MainPage = connect(mapStateToProps)(ConnectedMainPage);

export default MainPage;
