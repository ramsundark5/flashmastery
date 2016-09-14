import React, { Component } from 'react';
import {View, Text, StyleSheet, ScrollView, Dimensions} from 'react-native';
import { Container, Content, Center, Footer, ResponsiveGrid, Button } from '../common/Common';
import {LocalDatabase} from '../database/LocalDatabase';

const {deviceWidth} = Dimensions.get('window');
const colors = ["#00B0FF", "#1DE9B6", "#E65100", "#FFC400"];

export default class HomePage extends Component {
    componentDidMount(){
    }
    
    render(){
        const availableAssignments = Object.keys(LocalDatabase);
        return(
            <Container style={styles.container}>
                <ScrollView>
                <ResponsiveGrid
                        containerStyle={{ backgroundColor: '#fff',}}
                        columnCount={2}
                        dataSource={availableAssignments}
                        renderCell={this._renderAssignmentName} />
                </ScrollView>
            </Container>
        );
    }

    _renderAssignmentName(assignmentName, index){
        const bgcolor = colors[index];
        console.log('bgcolor '+bgcolor);
        return (
            <View key={assignmentName} style={[styles.tile, {backgroundColor: bgcolor}]}>
                <Center>
                    <Text style={styles.nameText}>{assignmentName}</Text>
                </Center>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        padding: 0,
        marginTop: 10,
        marginBottom: 10
    },
    tile:{ 
        overflow: 'hidden',
        justifyContent: 'center', 
        alignItems: 'center', 
        height: 100,
        margin: 1,
    },
    nameText:{
        textAlign: 'center',
        color: 'white'
    }
});