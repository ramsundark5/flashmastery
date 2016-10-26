import React, { Component } from 'react';
import {View, ScrollView, StyleSheet, Text, TouchableOpacity,} from 'react-native';
import {Actions} from 'react-native-router-flux';

export default class SideMenu extends Component{

   _gotoReports(){
     Actions.reportsPage();
   }
   
    render() {
        return (
        <ScrollView style={styles.container}>
            <Text style={styles.controlText}>Control Panel</Text>
            <TouchableOpacity style={styles.button} onPress={() => this._gotoReports()}>
                <Text>View Reports</Text>
            </TouchableOpacity>
        </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'red',
  },
  controlText: {
    color: 'white',
  },
  button: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
  }
});