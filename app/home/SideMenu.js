import React, { Component } from 'react';
import {View, ScrollView, StyleSheet, Text, TouchableOpacity,} from 'react-native';

export default class SideMenu extends Component{
    render() {
        let {closeDrawer} = this.props;
        return (
        <ScrollView style={styles.container}>
            <Text style={styles.controlText}>Control Panel</Text>
            <TouchableOpacity style={styles.button} onPress={closeDrawer}>
                <Text>Close Drawer</Text>
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