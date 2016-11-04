import React, { Component } from 'react';
import {View, StyleSheet, ScrollView, ListView, TouchableHighlight, TouchableOpacity, Text} from 'react-native';
import { Container } from '../common/Common';
import {Actions} from 'react-native-router-flux';
import UserDao from '../dao/UserDao';
import UserListItem from './UserListItem';
import SwipeitemView from 'react-native-swipe-left';

export default class SwitchUserPage extends Component {
    constructor(props){
        super(props);
        let users = UserDao.getAllUsers();
        this.state = {
            users: users || [],
        };
        this.usersDatasource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    }

    _switchUser(user){
        Actions.homePage({switchedUser: user});
    }

    render(){
        const {users} = this.state;
        const usersDS = this.usersDatasource.cloneWithRows(users);
        return(
            <View style={styles.container}>
                <ListView
                    dataSource={usersDS}
                    renderScrollComponent={(props)=>{
                        return <ScrollView scrollEnabled={this.state.scrollEnable} {...props}/>;
                    }}
                    renderRow={ (user, sectionId, rowId) => this._renderUser(user, sectionId, rowId)}
                    ref="listview"
                    renderSeparator={this._renderSeperator}/>
            </View>
        );
    }

    _renderUser(user, sectionId, rowId){
        return(
            <TouchableOpacity style={[styles.inputContainer]} 
                    onPress={() => this._switchUser(user)}>
                <Text style={[styles.viewText]}>{user.name}</Text>
            </TouchableOpacity>
        );
    }

    _renderSeperator(sectionID, rowID){
        return(
            <View key={`${sectionID}-${rowID}`} style={styles.separator}></View>
        );
    }

}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingTop: 80,
        backgroundColor: "#E0F2F1",
    },
    separator:{
        margin: 10
    },
    viewText: {
        margin: 10,
        fontSize: 16,
        color: '#0277BD'
    },
    inputContainer:{
        marginLeft: 10,
        marginRight: 10,
        justifyContent: 'center',
        backgroundColor: 'white'
    },
});