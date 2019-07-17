import React, { Component } from 'react';
import InputNumber from 'antd/lib/input-number';
import { connect } from 'react-redux';
import { setOrderFeature } from '../../../redux/actions/actions';

const mapStateToProps = state => {
  return {
    features: state.orderReducer.order.features,
    blockedSeats: state.seanceReducer.seanceInfo.blockedSeatsByUser,
  };
};

class ConnectedFeaturesSelector extends Component {
  constructor(props) {
    super(props);

    const [feature] = this.props.features.filter(item => item.product === this.props.feature.product);

    const amount = feature ? feature.amount : 0;

    this.state = {
      inputValue: amount,
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
    const { feature, blockedSeats } = this.props;

    return (
      <div className="feature_item">
        <div className="feature_name">{feature.product}</div>
        <span className="feature_price">{feature.price} BYN</span>
        <div className="feature_input">
          <InputNumber
            min={0}
            max={blockedSeats.length * 5}
            style={{ marginLeft: 16 }}
            value={inputValue}
            onChange={this.onChange}
          />
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
