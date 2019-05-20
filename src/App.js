import React, { Component } from 'react';
import Header from './components/Header/Header';
import LoginForm from './components/LoginForm/LoginForm';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loginForm: false,
    };
  }

  openLoginForm = () => {
    this.setState({loginForm: true });
  }
  render() {
    return (
      <div className='wrapper'>
        <Header onLogin={this.openLoginForm}/>
        {this.state.loginForm && <LoginForm/>}
      </div>
    );
  }
}

export default App;
