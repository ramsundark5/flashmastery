import React, { Component } from 'react';
import {AppRegistry} from 'react-native';
import Root from './app/Root';

class flashmastery extends Component {
  
  render() {
    return (
      <Root/>
    );
  }
}

AppRegistry.registerComponent('flashmastery', () => flashmastery);
