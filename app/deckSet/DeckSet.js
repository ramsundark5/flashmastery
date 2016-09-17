import React, { Component } from 'react';
import {View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity} from 'react-native';
import { Container, Content, Center, Footer, ResponsiveGrid, Button } from '../common/Common';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';

const {deviceWidth} = Dimensions.get('window');
const colors = ["#00B0FF", "#1DE9B6", "#FFC400", "#E65100", "#F44336"];

export default class DeckSet extends Component {
    constructor(props){
        super(props);
    }

    _onSelectDeck(deck){
        Actions.deckPage({deck: deck});
    }

    render(){
        let {decks} = this.state;
        return(
            <Container style={styles.container}>
                <ScrollView>
                    <ResponsiveGrid
                            containerStyle={{ backgroundColor: '#fff',}}
                            columnCount={2}
                            dataSource={decks}
                            renderCell={(deck, index) => this._renderDeck(deck, index)} />
                </ScrollView>
            </Container>
        );
    }

    _renderDeck(deck, index){
        const bgcolor = colors[index];
        return (
            <TouchableOpacity onPress={() => this._onSelectDeck(deck)}
                    key={deck.id} style={[styles.tile, {backgroundColor: bgcolor}]}>
                <Center>
                    <Text style={styles.nameText}>{deck.name}</Text>
                </Center>
            </TouchableOpacity>
        );
    }

/*    _renderAddCustom(bgcolor){
        //<Text style={styles.nameText}>Add Custom</Text>
        return (
            <TouchableOpacity onPress={() => this._addNewCustomSet()} 
                style={[styles.tile, {backgroundColor: bgcolor}]}>
                <Center>
                    <Icon name='md-add'
                        style={[styles.showAddIcon]}/>
                </Center>
            </TouchableOpacity>
        );
    }*/
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