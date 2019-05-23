import React, { Component } from 'react';
import Header from './components/Header/Header';
import LoginForm from './components/LoginForm/LoginForm';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loginForm: false,
      registrationForm: false
    };
  }

  openLoginForm = () => {
    this.setState({loginForm: true });
  }
  openRegistrationForm = () => {
    this.setState({registrationForm: true });
  }
  render() {
    return (
      <div className='wrapper'>
        <Header onLogin={this.openLoginForm} onRegistration={this.openRegistrationForm}/>
        {this.state.loginForm && <LoginForm/>}
        {this.state.registrationForm && <RegistrationForm/>}
      </div>
    );
  }
}

export default App;
