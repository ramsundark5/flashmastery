import React, { Component } from 'react';
import {AppRegistry} from 'react-native';
import Routes from './app/Routes';
  
class flashmastery extends Component {
  render() {
    return (
      <Routes/>
    );
  }
}

AppRegistry.registerComponent('flashmastery', () => flashmastery);
