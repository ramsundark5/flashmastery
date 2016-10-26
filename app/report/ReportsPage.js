import React, { Component } from 'react';
import { Container, Content, HorizontalRow } from '../common/Common';
import {View, ScrollView, StyleSheet, Text, TouchableOpacity,} from 'react-native';
import PracticeDao from '../dao/PracticeDao';
import DeckDao from '../dao/DeckDao';

export default class ReportsPage extends Component{

    constructor(props){
        super(props);
        this.state = {
            deckSets: []
        };
    }

    componentDidMount(){
        let deckSets = DeckDao.getAllDeckSet();
        this.setState({deckSets: deckSets});
    }

    render(){
        const {deckSets} = this.state;
        return(
            <Container>
                <ScrollView style={styles.container}>
                    {deckSets.map( (deckSet, index) => 
                        this._renderDeckSet(deckSet, index)
                    )}
                </ScrollView>
            </Container>
        );
    }

    _renderDeckSet(deckSet){
        return(
            <ScrollView style={styles.container} key={deckSet.id}>
                {deckSet.decks.map( (deck, index) => 
                    this._renderDeck(deck, index)
                )}
            </ScrollView>
        );
    }

    _renderDeck(deck){
        let practiseCardResults = PracticeDao.getPracticeSessionsForDeck(deck.id);
        practiseCardResults.map( (practiseCardResult, index) => {
            let totalAnsweredCorrect = practiseCardResult.results.filtered('answeredCorrect = true');
            practiseCardResult.totalAnsweredCorrect = totalAnsweredCorrect;
        });
        return(
            <ScrollView style={styles.container} key={deck.id}>
                {practiseCardResults.map( (practiseCardResult, index) => 
                    this._renderResult(deck, practiseCardResult, index)
                )}
            </ScrollView>
        );
    }

    _renderResult(deck, practiseCardResult, index){
        return(
            <HorizontalRow key={practiseCardResult.id}>
                <Text style={styles.controlText}>{deck.name}</Text>
                <Text style={styles.controlText}>{practiseCardResult.results.length}</Text>
                <Text style={styles.controlText}>{practiseCardResult.totalAnsweredCorrect.length}</Text>
            </HorizontalRow>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  controlText: {
    paddingLeft: 10,
    color: 'black',
  },
});