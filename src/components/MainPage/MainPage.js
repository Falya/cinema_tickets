import React, { Component } from 'react';
import { Button } from 'antd';
import './main-page.scss';

class MainPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section>
        <div className="heading">
          <div className="heading-header">
            <h2>Now in the cinema</h2>
          </div>
          <div className="heading-body">
            <div className="card">
              <div className="card-body">
                <figure>
                  <div className="image-wrapper">
                    <div className="card-overlay" />
                    <img src="http://cdn.collider.com/wp-content/uploads/2018/03/avengers-infinity-war-poster.jpg" alt="" />
                  </div>
                  <figcaption>
                    <p>16+/RU</p>
                    <h3>Avengers: Endgame</h3>
                    <span>Fantasy, Triller</span>
                  </figcaption>
                </figure>
                <Button size="normal" ghost>
                  Will book!
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default MainPage;
