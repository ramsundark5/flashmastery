import React, { Component } from 'react';
import {AppRegistry} from 'react-native';
import Routes from './app/Routes';
import FirebaseConfig from './app/database/FirebaseConfig';

class flashmastery extends Component {
  componentDidMount(){
    FirebaseConfig.init();
  }

  render() {
    return (
      <Routes/>
    );
  }
}

AppRegistry.registerComponent('flashmastery', () => flashmastery);
