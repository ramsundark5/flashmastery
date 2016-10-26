import React, { Component } from 'react';
import { Container, Content, HorizontalRow } from '../common/Common';
import {View, ScrollView, StyleSheet, Text, TouchableOpacity,} from 'react-native';
import ReportDetails from './ReportDetails';

export default class ReportsPage extends Component{

    constructor(props){
        super(props);
        this.state = {
            deckSets: props.deckSets,
        };
    }

    componentDidMount(){
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
                <View style={{backgroundColor: '#0277BD'}}>
                    <Text style={styles.controlText}>{deckSet.name}</Text>
                </View>
                {deckSet.decks.map( (deck, index) => 
                    <ReportDetails deck={deck} key={deck.id}/>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: 'white',
  },
  deckSetContainer:{
      padding: 10,
  },
  controlText: {
    paddingLeft: 10,
  },
});