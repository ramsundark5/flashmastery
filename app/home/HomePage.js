import React, { Component } from 'react';
import {View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity} from 'react-native';
import { Container, Content, Center, Footer, ResponsiveGrid, Button } from '../common/Common';
import {LocalDatabase} from '../database/LocalDatabase';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';

const {deviceWidth} = Dimensions.get('window');
const colors = ["#00B0FF", "#1DE9B6", "#FFC400", "#E65100", "#F44336"];

export default class HomePage extends Component {
    componentDidMount(){
    }
    
    _onSelectBasicAssignment(assignmentName){
        Actions.assignmentPage({assignmentName: assignmentName});
    }

    _addNewCustomSet(){

    }

    render(){
        let availableAssignments = Object.keys(LocalDatabase);
        availableAssignments.push('AddCustom');
        return(
            <Container style={styles.container}>
                <ScrollView>
                    <ResponsiveGrid
                            containerStyle={{ backgroundColor: '#fff',}}
                            columnCount={2}
                            dataSource={availableAssignments}
                            renderCell={(assignmentName, index) => this._renderAssignmentName(assignmentName, index)} />
                </ScrollView>
            </Container>
        );
    }

    _renderAssignmentName(assignmentName, index){
        const bgcolor = colors[index];
        if(assignmentName === 'AddCustom'){
             return this._renderAddCustom(bgcolor);
        }else{
            return (
                <TouchableOpacity onPress={() => this._onSelectBasicAssignment(assignmentName)}
                      key={assignmentName} style={[styles.tile, {backgroundColor: bgcolor}]}>
                    <Center>
                        <Text style={styles.nameText}>{assignmentName}</Text>
                    </Center>
                </TouchableOpacity>
            );
        }
    }

    _renderAddCustom(bgcolor){
        //<Text style={styles.nameText}>Add Custom</Text>
        return (
            <View style={[styles.tile, {backgroundColor: bgcolor}]}>
                <Center>
                    <TouchableOpacity onPress={() => this._addNewCustomSet()}>
                        <Icon name='md-add'
                            style={[styles.showAddIcon]}/>
                    </TouchableOpacity>
                </Center>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        padding: 0,
        marginTop: 5,
        marginBottom: 10
    },
    tile:{ 
        overflow: 'hidden',
        justifyContent: 'center', 
        alignItems: 'center', 
        height: 150,
        margin: 1,
    },
    nameText:{
        textAlign: 'center',
        color: 'white'
    },
    showAddIcon: {
        padding: 2,
        fontWeight: 'bold',
        fontSize : 40,
        color: 'white'
    },
});