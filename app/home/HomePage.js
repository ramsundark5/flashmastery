import React, { Component } from 'react';
import {View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity} from 'react-native';
import { Container, Content, Center, Footer, ResponsiveGrid, Button } from '../common/Common';
import {LocalDatabase} from '../database/LocalDatabase';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import DeckDao from '../dao/DeckDao';

const {deviceWidth} = Dimensions.get('window');
const colors = ["#00B0FF", "#1DE9B6", "#FFC400", "#E65100", "#F44336"];

export default class HomePage extends Component {
    constructor(props){
        super(props);
        this.state = {
            deckSets: LocalDatabase
        };
    }

    componentWillMount(){
    }

    componentDidMount(){
    }
    
    _onSelectDeckSet(deckSet){
        Actions.deckSetPage({deckSet: deckSet});
    }

    render(){
        let {deckSets} = this.state;
        let customDeckSet = {addCustom: true};
        deckSets.push(customDeckSet);
        return(
            <Container style={styles.container}>
                <ScrollView>
                    <ResponsiveGrid
                            containerStyle={{ backgroundColor: '#fff',}}
                            columnCount={2}
                            dataSource={deckSets}
                            renderCell={(deckSet, index) => this._renderDeckSet(deckSet, index)} />
                </ScrollView>
            </Container>
        );
    }

    _renderDeckSet(deckSet, index){
        const bgcolor = colors[index];
        if(deckSet.addCustom){
            return this._renderAddCustom(bgcolor);
        }
        return (
            <TouchableOpacity onPress={() => this._onSelectDeckSet(deckSet)}
                    key={deckSet.id} style={[styles.tile, {backgroundColor: bgcolor}]}>
                <Center>
                    <Text style={styles.nameText}>{deckSet.name}</Text>
                </Center>
            </TouchableOpacity>
        );
    }

    _renderAddCustom(bgcolor){
        return (
            <TouchableOpacity onPress={() => this._addNewCustomSet()} 
                style={[styles.tile, {backgroundColor: bgcolor}]}>
                <Center>
                    <Icon name='md-add'
                        style={[styles.showAddIcon]}/>
                </Center>
            </TouchableOpacity>
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
        color: 'white',
        fontWeight: 'bold',
    },
    showAddIcon: {
        padding: 2,
        fontWeight: 'bold',
        fontSize : 40,
        color: 'white'
    },
});