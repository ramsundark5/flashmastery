import React, { Component } from 'react';
import { Container, Content, HorizontalRow } from '../common/Common';
import {View, ScrollView, StyleSheet, Text, TouchableOpacity,} from 'react-native';
import ReportDetails from './ReportDetails';
import {LocalDatabase} from '../database/LocalDatabase';
import DeckDao from '../dao/DeckDao';

export default class ReportsPage extends Component{

    constructor(props){
        super(props);
        this.state = {
            deckSets: LocalDatabase,
        };
    }

    componentDidMount(){
        this._addCustomDeckSetsToLocalDatabase();
    }
    
    _addCustomDeckSetsToLocalDatabase(){
        let customDeckSets = DeckDao.getAllDeckSet();
        let deckSetsAfterCustomAdd = LocalDatabase.concat(customDeckSets);
        this.setState({deckSets: deckSetsAfterCustomAdd,});
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
            <View style={styles.deckSetContainer} key={deckSet.id}>
                <View style={styles.deckSetHeader}>
                    <Text style={styles.controlText}>{deckSet.name}</Text>
                </View>
                {deckSet.decks.map( (deck, index) => 
                    <ReportDetails deck={deck} key={deck.id} user={this.props.user}/>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: 'white',
  },
  deckSetContainer:{
      padding: 10,
  },
  deckSetHeader:{
      backgroundColor: '#CFD8DC',
  },
  controlText: {
    padding: 10,
    color: 'black',
    //fontWeight: 'bold'
  },
});