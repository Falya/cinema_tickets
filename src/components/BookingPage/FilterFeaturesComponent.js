import React, { Component } from 'react';
import { Select, Slider, InputNumber, Row, Col } from 'antd';

const { Option } = Select;

class FilterFeaturesComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: [
        {
          name: '>1 empty seats',
          flag: 'empty1'
        },
        {
          name: '>2 empty seats',
          flag: 'empty2'
        },
        {
          name: 'VIP empty seats',
          flag: 'vip'
        },
        {
          name: 'love empty seats',
          flag: 'double'
        },
        {
          name: '2D',
          flag: '2D'
        },
        {
          name: '3D',
          flag: '3D'
        },
      ],
      selectedFeatures: [],
    };

  }

  handleChange = selectedFeatures => {
    this.props.setMethod(selectedFeatures);
    this.setState({selectedFeatures});

  };

  createOtions = () => {
    return this.state.options.map((option, index) => {
      const optionValues = Object.values(option);
      return (<Option value={optionValues[1]} key={index}>{optionValues[0]}</Option>);
    });
  }


  render() {
    return (
      <div className="filter__item features">
        <Select mode="multiple" placeholder='Select features' showArrow={true} value={this.state.selectedFeatures} dropdownClassName="filter__dropdown_menu" className='filter__select' onChange={this.handleChange} maxTagTextLength={4} maxTagCount={3}>
          {this.createOtions()}
        </Select>
      </div>
    );
  }
}

export default FilterFeaturesComponent;
