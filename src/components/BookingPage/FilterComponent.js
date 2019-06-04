import React, { Component } from 'react';
import { Select } from 'antd';

const { Option } = Select;

class FilterComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filterName: this.props.filterName,
      filterOptions: [],
    };
  }

  handleChange = value => {
    console.log(`selected ${value}`);
  };

  createOtions = () => {
    return this.filterOptions.map((option, index) => {
      return (<Option value={option.id} key={index}>{option.name}</Option>);
    });
  }


  render() {
    return (
      <div className="filter__item">
        <Select defaultValue="lucy" dropdownClassName="filter__dropdown_menu" className='filter__select' onChange={this.handleChange}>
          {this.createOtions()}
        </Select>
      </div>
    );
  }
}

export default FilterComponent;
