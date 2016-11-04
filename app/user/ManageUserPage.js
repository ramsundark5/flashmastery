import React, { Component } from 'react';
import {View, StyleSheet, ScrollView, ListView, TouchableHighlight, Text} from 'react-native';
import { Container } from '../common/Common';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import {Actions} from 'react-native-router-flux';
import UserDao from '../dao/UserDao';
import SwipeitemView from 'react-native-swipe-left';
import UserListItem from './UserListItem';

export default class ManageUserPage extends Component {
    constructor(props){
        super(props);
        this._dataRow = {};
        this.openRowId = '';
        let users = UserDao.getAllUsers();
        this.state = {
            users: users || [],
            scrollEnable: true,
            hasIdOpen: false
        };
        this.usersDatasource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    }

    _deleteUser(userToBeDeleted){
        UserDao.deleteUser(userToBeDeleted.id);
        let usersAfterDelete = this.state.users.filter(user =>
                user.id !== userToBeDeleted.id
            );
        this.setState({users: usersAfterDelete});
    }

    _addNewUser(newUserName){
        newUser.lastModified = new Date();
        UserDao.addUser(newUserName);
        
        let usersAfterAdd = this.state.users.concat(newUserName);
        this.setState({users: usersAfterAdd});
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
                <KeyboardSpacer/>
            </View>
        );
    }

    _renderUser(user, sectionId, rowId){
        let id = '' +sectionId + rowId;
        let rightBtn = [{id: 1, text: 'Delete', width: 75, color: 'white', bgColor: 'rgba(231,76,60,1)',
                            onPress: () =>{this._deleteCard(card);}
                        }];

        return(
            <SwipeitemView 
                root={this}
                ref={(row)=>this._dataRow[id] = row}
                id={id}
                data={user}
                boxbgColor='#E0F2F1'
                rowbgColor='#E0F2F1'
                rightBtn={rightBtn}>
              <UserListItem key={user.id} user={user} />
            </SwipeitemView>
            
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
    }
});