import React, { Component } from 'react';
import {View, Text, TextInput, StyleSheet, ScrollView, Dimensions, TouchableOpacity} from 'react-native';
import { Container, Content, Center, Footer, ResponsiveGrid, Button } from '../common/Common';
import {Actions} from 'react-native-router-flux';
import DeckTile from './DeckTile';
import uuid from 'react-native-uuid';

const {deviceWidth} = Dimensions.get('window');
const colors = ["#00B0FF", "#1DE9B6", "#FFC400", "#E65100", "#F44336"];
const ADD_NEW_DECK = 'add';

export default class DeckSet extends Component {
    constructor(props){
        super(props);
        this._addNewDeckOptionAtEnd();
        this.state = {
            decks: props.deckSet.decks
        };
    }

    componentDidMount(){
    }

    _addNewDeckOptionAtEnd(){
        if(this.props.deckSet.custom){
            this.addNewDeck = {id: uuid.v1(), action: ADD_NEW_DECK};
        }
    }

    _onSelectDeck(deck){
        Actions.deckPage({deck: deck});
    }

    _onDeckNameUpdate(updatedDeck){
        let decksAfterUpdate = this.state.decks.map( (existingDeck, index) => 
            existingDeck.id === updatedDeck.id?
                    Object.assign({}, updatedDeck) :
                    existingDeck
            
        );
        this.setState({decks: decksAfterUpdate});
    }

    _onNewDeckAdd(addedDeck){
        let decksAfterAdd = this.state.decks.concat(addedDeck);
        this._addNewDeckOptionAtEnd();
        this.setState({decks: decksAfterAdd});
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
                            extraCellAtEnd = {this.addNewDeck}
                            renderCell={(deck, index) => this._renderDeck(deck, index)} />
                </ScrollView>
            </Container>
        );
    }

    _renderDeck(deck, index){
        console.log('deck to be rendered is '+JSON.stringify(deck));
        const bgColor = colors[index];
        return(
            <DeckTile deck={deck} bgColor={bgColor} key={deck.id} 
                onDeckNameUpdate={(updatedDeck) => this._onDeckNameUpdate(updatedDeck)}
                onNewDeckAdd={(addedDeck) => this._onNewDeckAdd(addedDeck)}
                onSelect={(deck) => this._onSelectDeck(deck)}/>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        padding: 0,
        marginTop: 5,
        marginBottom: 10
    },
});