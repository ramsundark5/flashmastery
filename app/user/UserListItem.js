import React, { Component } from 'react';
import {View, StyleSheet, ScrollView, Easing, Text, TouchableOpacity, Dimensions} from 'react-native';
import { EditableText, Center, Button } from '../common/Common';
import UserDao from '../dao/UserDao';
const { width } = Dimensions.get('window');

export default class UserListItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: props.user || {},
        };
    }

    _finishEdit(finishedText){
        let userAfterEdit = Object.assign({}, this.state.user);
        userAfterEdit.name = finishedText;
        this.setState({card: userAfterEdit});
        //save user after change
        UserDao.updateUser(userAfterEdit);
    }

    render(){
        const {user} = this.state;
        return(
            <View style={styles.cardContainer}>
                <EditableText
                    editable={true}
                    textContent={user.name}
                    editInputContainerStyle={[styles.editInputContainerStyle]}
                    editInputStyle={styles.vocabText}
                    viewTextStyle={styles.vocabText} 
                    finishEditText={(finishedText) => this._finishEdit(finishedText)}/>
            </View>
        );
    }
    
}

const styles = StyleSheet.create({
    cardContainer:{
        marginLeft: 10,
        backgroundColor: 'white',
        borderColor: 'white',
    },
    vocabText:{
        margin: 10,
        fontSize: 16,
        color: '#0277BD'
    },
    editInputContainerStyle:{ 
        justifyContent: 'center', 
        alignItems: 'center', 
        margin: 1,
    },
});