import React, { Component } from 'react';
import { Select } from 'antd';

const { Option } = Select;

class FilterComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: this.props.options,
    };

  }

  handleChange = value => {
    this.props.setMethod(value);

  };

  createOtions = () => {
    const additionalOption = this.props.name === 'cinemas' && <Option value='All cinemas' key='cinema'>All cinemas</Option>;
    return [additionalOption, this.state.options.map((option, index) => {
      const optionValues = Object.values(option);
      return (<Option value={optionValues[0]} key={index}>{optionValues[1]}</Option>);
    })];
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.options !== this.state.options) {
      this.setState({options: nextProps.options});
      return true;
    }
    return false;

  }

  render() {
    return (
      <div className="filter__item">
        <Select value={this.props.defaultValue}  dropdownClassName="filter__dropdown_menu" className='filter__select' onChange={this.handleChange}>
          {this.createOtions()}
        </Select>
      </div>
    );
  }
}

export default FilterComponent;
