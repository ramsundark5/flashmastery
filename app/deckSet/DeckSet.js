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
        /*this.state = {
            deckSet: props.deckSet
        };*/
    }

    _onSelectDeck(deck){
        Actions.deckPage({deck: deck});
    }

    render(){
        let {deckSet} = this.props;
        let decks = deckSet.decks;
        if(deckSet.custom){
            decks = decks.concat({addCustom: true});
        }
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
        console.log('deck to be rendered is '+JSON.stringify(deck));
        const bgcolor = colors[index];
        if(deck.addCustom){
            return this._renderAddCustom(bgcolor);
        }
        return (
            <TouchableOpacity onPress={() => this._onSelectDeck(deck)}
                    key={index} style={[styles.tile, {backgroundColor: bgcolor}]}>
                <Center>
                    <Text style={styles.nameText}>{deck.name}</Text>
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
        color: 'white'
    },
    showAddIcon: {
        padding: 2,
        fontWeight: 'bold',
        fontSize : 40,
        color: 'white'
    },
});