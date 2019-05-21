import React, { Component } from 'react';
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
          <div className="card"></div>
        </div>
      </div>
      <div className="heading">

      </div>
      </section>
    );
  }
}


export default MainPage;
