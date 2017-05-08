import React, { Component } from 'react';
import {View, ScrollView, StyleSheet, Text, TouchableOpacity,} from 'react-native';
import {Actions} from 'react-native-router-flux';
//import Analytics from 'mobile-center-analytics';
import * as Constants from '../common/Constants';

export default class SideMenu extends Component{

   _gotoReports(deckSets, user){
     Actions.reportsPage({deckSets: deckSets, user: user});
     this.props.closeSideMenu();
     //Analytics.trackEvent(Constants.VIEW_REPORT);
   }

   _gotoManageUsers(){
     Actions.manageUsersPage();
     this.props.closeSideMenu();
     //Analytics.trackEvent(Constants.MANAGE_USERS);
   }
   
   _gotoSwitchUsersPage(){
     Actions.switchUsersPage();
     this.props.closeSideMenu();
     //Analytics.trackEvent(Constants.SWITCH_USER);
   }

   _gotoSettings(){
     Actions.settingsPage();
     this.props.closeSideMenu();
     //Analytics.trackEvent(Constants.SETTINGS);
   }

   _gotoHelp(){
      Actions.helpPage();
      this.props.closeSideMenu();
      //Analytics.trackEvent(Constants.HELP);
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
            <TouchableOpacity style={styles.optionContainer} onPress={() => this._gotoHelp()}>
                <Text style={styles.optionText}>Help</Text>
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