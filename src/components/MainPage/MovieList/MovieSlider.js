import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Carousel from 'antd/lib/carousel';

class MovieSlider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      resolution: window.innerWidth,
      isPaused: false,
    };

    this.slider = React.createRef();
  }

  componentDidMount() {
    window.addEventListener('resize', this.changeSlidesNumber);
  }

  changeSlidesNumber = e => {
    this.setState({ resolution: e.target.innerWidth });
  };

  componentWillUnmount() {
    window.removeEventListener('resize', this.changeSlidesNumber);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.location.pathname !== '/' && !this.state.isPaused) {
      this.setState({ isPaused: true });
      this.slider.current.slick.slickPause();
    } else if (this.props.location.pathname === '/' && this.state.isPaused) {
      this.setState({ isPaused: false });
      this.slider.current.slick.slickPlay();
    }
  }

  render() {
    const { resolution } = this.state;
    const settings = {
      infinite: true,
      speed: 500,
      autoplaySpeed: 2500,
      slidesToShow: resolution <= 460 ? 2 : resolution <= 800 ? 3 : resolution <= 1200 ? 4 : 5,
      slidesToScroll: 1,
      className: 'heading-body',
      adaptiveHeight: false,
      variableWidth: false,
      minHeight: 'max-content',
      autoplay: true,
      arrows: false,
      swipe: true,
      draggable: true,
      touchMove: true,
      swipeToSlide: true,
    };
    return (
      <Carousel ref={this.slider} {...settings}>
        {this.props.children}
      </Carousel>
    );
  }
}

export default withRouter(MovieSlider);
