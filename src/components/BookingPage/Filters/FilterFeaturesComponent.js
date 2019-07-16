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
          type: {
            minSeats: 1,
          },
        },
        {
          name: '>2 empty seats',
          flag: 'hasEmptyMoreTwo',
          type: {
            minSeats: 2,
          },
        },
        {
          name: 'has VIP',
          flag: 'hasEmptyVip',
          type: {
            seatType: 'vip',
          },
        },
        {
          name: 'has double',
          flag: 'hasEmptyDouble',
          type: {
            seatType: 'double',
          },
        },
        {
          name: '3D',
          flag: 'hasVideo3d',
          type: {
            is3d: true,
          },
        },
      ],
      selectedFeatures: [],
    };
  }

  handleChange = selectedFeatures => {
    const { options } = this.state;
    const selected = selectedFeatures.reduce((acc, feature) => {
      const [option] = options.filter(({ flag }) => flag === feature);
      acc = {
        ...acc,
        ...option.type,
      };
      return acc;
    }, {});

    const newState = Object.entries(selected).map(([key, value]) => {
      const [{ flag }] = options.filter(({ type }) => type[key] === value);
      return flag;
    });

    this.props.setMethod(selected);
    this.setState({ selectedFeatures: newState });
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
