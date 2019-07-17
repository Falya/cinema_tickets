import React, { Component } from 'react';
import Select from 'antd/lib/select';

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

  createOptions = () => {
    const additionalOption = this.props.name === 'cinemas' && (
      <Option value="All cinemas" key="cinema">
        All cinemas
      </Option>
    );
    return [
      additionalOption,
      this.state.options.map((option, index) => {
        const optionValues = Object.values(option);
        return (
          <Option value={optionValues[0]} key={index}>
            {optionValues[1]}
          </Option>
        );
      }),
    ];
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.options !== this.state.options) {
      this.setState({ options: nextProps.options });
      return true;
    }
    return false;
  }

  render() {
    return (
      <div className="filter__item">
        <span className={`filter__icon ${this.props.icon}`} />
        <Select
          value={this.props.defaultValue}
          dropdownClassName="filter__dropdown_menu"
          className="filter__select"
          onChange={this.handleChange}>
          {this.createOptions()}
        </Select>
      </div>
    );
  }
}

export default FilterComponent;
