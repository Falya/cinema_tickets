import React, { Component } from 'react';
import PropTypes from 'prop-types';


class FilterComponent extends Component {
  constructor(props) {
    super(props);

  }

  componentWillMount() {
  }

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {}

  shouldComponentUpdate(nextProps, nextState) {}

  componentWillUpdate(nextProps, nextState) {}

  componentDidUpdate(prevProps, prevState) {}

  componentWillUnmount() {}



  render() {
    return (
      <div className='filter--item'>
        <div className="filter--btn">
          <div className="filter--btn-text">Все города</div>
          <div className="filter--btn-arrow">
          <svg className="svg-icon-round-arrow" viewBox="0 0 22 22" width="20px" length="20px;"> <circle fill="none" stroke="currentColor" strokeWidth="2" vectorEffect="non-scaling-stroke" cx="11" cy="11" r="10"></circle> <path fill="none" stroke="currentColor" strokeWidth="2" vectorEffect="non-scaling-stroke" d="M6,9 L11,14 L16,9"></path> </svg>
          </div>
        </div>
      </div>
    );
  }
}

FilterComponent.propTypes = {};

export default FilterComponent;
