import React, { Component } from 'react';
import {View, ScrollView, StyleSheet, Text, TouchableOpacity,} from 'react-native';
import {Actions} from 'react-native-router-flux';

export default class SideMenu extends Component{

   _gotoReports(deckSets){
     Actions.reportsPage({deckSets: deckSets});
     this.props.closeSideMenu();
   }

   _gotoManageUsers(){
     Actions.manageUsersPage();
     this.props.closeSideMenu();
   }
   
    render() {
        const {deckSets} = this.props;
        return (
        <ScrollView style={styles.container}>
            <TouchableOpacity style={styles.optionContainer} onPress={() => this._gotoReports(deckSets)}>
                <Text style={styles.optionText}>Switch User</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionContainer} onPress={() => this._gotoManageUsers()}>
                <Text style={styles.optionText}>Manage Users</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionContainer} onPress={() => this._gotoReports(deckSets)}>
                <Text style={styles.optionText}>View Reports</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionContainer} onPress={() => this._gotoReports(deckSets)}>
                <Text style={styles.optionText}>Settings</Text>
            </TouchableOpacity>
        </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    backgroundColor: '#313b4b',
  },
  controlText: {
    color: 'white',
  },
  optionContainer: {
    //justifyContent: 'center',
    alignItems: 'center',
  },
  optionText:{
    color: 'white',
    fontWeight: 'bold',
    paddingBottom: 20
  }
});