import React, { Component } from 'react';
import { Select } from 'antd';

const { Option } = Select;

class FilterFeaturesComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: [
        {
          name: '>1 empty seats',
          flag: 'hasEmptyMoreOne',
        },
        {
          name: '>2 empty seats',
          flag: 'hasEmptyMoreTwo',
        },
        {
          name: 'has VIP',
          flag: 'hasEmptyVip',
        },
        {
          name: 'has double',
          flag: 'hasEmptyDouble',
        },
        {
          name: '3D',
          flag: 'hasVideo3d',
        },
      ],
      selectedFeatures: [],
    };
  }

  handleChange = selectedFeatures => {
    const selected = selectedFeatures.reduce((acc, feature) => {
      acc[feature] = true;
      return acc;
    }, {});
    this.props.setMethod(selected);
    this.setState({ selectedFeatures });
  };

  createOptions = () => {
    return this.state.options.map((option, index) => {
      const optionValues = Object.values(option);
      return (
        <Option value={optionValues[1]} key={index}>
          {optionValues[0]}
        </Option>
      );
    });
  };

  render() {
    return (
      <div className="filter__item features">
        <span className={`filter__icon ${this.props.icon}`} />
        <Select
          mode="multiple"
          placeholder="Select features"
          showArrow={true}
          value={this.state.selectedFeatures}
          dropdownClassName="filter__dropdown_menu"
          className="filter__select"
          onChange={this.handleChange}
          maxTagTextLength={4}
          maxTagCount={3}>
          {this.createOptions()}
        </Select>
      </div>
    );
  }
}

export default FilterFeaturesComponent;
