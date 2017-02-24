import React, { Component } from 'react';
import {View, ScrollView, StyleSheet, Text, TouchableOpacity,} from 'react-native';
import {Actions} from 'react-native-router-flux';

export default class SideMenu extends Component{

   _gotoReports(deckSets, user){
     Actions.reportsPage({deckSets: deckSets, user: user});
     this.props.closeSideMenu();
   }

   _gotoManageUsers(){
     Actions.manageUsersPage();
     this.props.closeSideMenu();
   }
   
   _gotoSwitchUsersPage(){
     Actions.switchUsersPage();
     this.props.closeSideMenu();
   }

   _gotoSettings(){
     Actions.settingsPage();
     this.props.closeSideMenu();
   }

    render() {
        const {deckSets, user} = this.props;
        return (
        <ScrollView style={styles.container}>
            <TouchableOpacity style={styles.optionContainer} onPress={() => this._gotoSwitchUsersPage()}>
                <Text style={styles.optionText}>Switch User</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionContainer} onPress={() => this._gotoManageUsers()}>
                <Text style={styles.optionText}>Manage Users</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionContainer} onPress={() => this._gotoReports(deckSets, user)}>
                <Text style={styles.optionText}>View Reports</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionContainer} onPress={() => this._gotoSettings()}>
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
    padding: 14
  },
  optionText:{
    color: 'white',
    fontWeight: 'bold',
    paddingBottom: 20
  }
});