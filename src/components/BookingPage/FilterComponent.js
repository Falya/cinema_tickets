import React, { Component } from 'react';

class FilterComponent extends Component {

  render() {
    return (
      <div className='filter__item'>
        <div className="filter__btn">
          <div className="filter__btn_text">Все города</div>
          <div className="filter__btn_arrow">
          <svg className="svg-icon-round-arrow" viewBox="0 0 22 22" width="20px" length="20px;"> <circle fill="none" stroke="currentColor" strokeWidth="2" vectorEffect="non-scaling-stroke" cx="11" cy="11" r="10"></circle> <path fill="none" stroke="currentColor" strokeWidth="2" vectorEffect="non-scaling-stroke" d="M6,9 L11,14 L16,9"></path> </svg>
          </div>
        </div>
      </div>
    );
  }
}

export default FilterComponent;
