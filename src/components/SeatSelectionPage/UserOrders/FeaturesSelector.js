import React, { Component } from 'react';
import { InputNumber } from 'antd';
import { connect } from 'react-redux';
import { setOrderFeature } from '../../../redux/actions/actions';

const mapStateToProps = state => {
  return {
    features: state.orderReducer.order.features,
  };
};

class ConnectedFeaturesSelector extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: 0,
    };
  }

  onChange = value => {
    this.setState({
      inputValue: value,
    });

    const newFeatures = this.props.features.filter(item => item.product !== this.props.feature.product);

    const featureObject = {
      product: this.props.feature.product,
      price: this.props.feature.price * value,
      amount: value,
    };
    let params = value ? [...newFeatures, featureObject] : [...newFeatures];
    this.props.setOrderFeature(params);
  };

  render() {
    const { inputValue } = this.state;
    const { feature } = this.props;
    return (
      <div className="feature_item">
        <div className="feature_name">{feature.product}</div>
        <span className="feature_price">{feature.price} BYN</span>
        <div className="feature_input">
          <InputNumber min={0} max={5} style={{ marginLeft: 16 }} value={inputValue} onChange={this.onChange} />
        </div>
      </div>
    );
  }
}

const FeaturesSelector = connect(
  mapStateToProps,
  { setOrderFeature }
)(ConnectedFeaturesSelector);

export default FeaturesSelector;