import React, { Component } from 'react';
import Accordion from 'react-native-collapsible/Accordion';
import {View, ScrollView, StyleSheet, Text, TouchableOpacity,} from 'react-native';
import { Container, Content, HorizontalRow } from '../common/Common';
import PracticeDao from '../dao/PracticeDao';
import ReportDao from '../dao/ReportDao';
import SettingsDao from '../dao/SettingsDao';
import PixAccordion from 'react-native-pixfactory-accordion';
import Icon from 'react-native-vector-icons/Ionicons';

export default class DeckReport extends Component {

constructor(props){
    super(props);
    this.state = {
        isCollapsed: true,
    };
}

_toggleCollapseIcon(){
  this.setState({isCollapsed: !this.state.isCollapsed}) ;
}

render(){
    const {deck, user} = this.props;
    let practiseCardResults = PracticeDao.getPracticeSessionsForDeck(deck.id, user.id);
    let settings = SettingsDao.getSettings();
    let minimumAccuracy = settings.minimumAccuracy;

    let cardAccuracyMap = new Map();
    let masteredCardsCount = 0;
    deck.cards.map( (card, index) => {
        let cardAccuracy = ReportDao.getPracticeCardAccuracy(card.id, this.props.user.id);
        cardAccuracyMap.set(card.id, cardAccuracy);
        if(cardAccuracy > minimumAccuracy){
            masteredCardsCount++;
        }
    });

    let masteredCardsPercent = (masteredCardsCount/deck.cards.length) * 100;
    masteredCardsPercent = this._roundToPlaces(masteredCardsPercent, 2);

    if(practiseCardResults.length < 1){
      return(
        <Container>
            <View style={styles.deckContainer}>
                <HorizontalRow>
                    <Text style={styles.deckName}>{deck.name}:</Text>
                    <Text style={styles.headerText}>No results</Text>
                </HorizontalRow>
          </View>
        </Container>
      );
    }
    return(
        <Container>
            <ScrollView style={styles.deckContainer}>
                <PixAccordion
                onChange={() => this._toggleCollapseIcon()}
                renderHeader={() => this._renderHeader(deck, cardAccuracyMap, masteredCardsPercent)}>
                {practiseCardResults.map( (practiseCardResult, index) => 
                        this._renderSessionResult(practiseCardResult, index)
                    )}
                </PixAccordion>
            </ScrollView>
        </Container>
    );
  }

  _renderHeader(deck, cardAccuracyMap, masteredCardsPercent){
    const {isCollapsed} = this.state;
    let collapseIcon = isCollapsed ? 'ios-add-circle' : 'ios-remove-circle';
    return(
     <View>
        <HorizontalRow key={deck.id}>
            <Text style={styles.deckName}>{deck.name}:</Text>
            <Text style={styles.headerText}>Mastered: <Text style={styles.correctText}>{masteredCardsPercent} %</Text></Text>
            <Icon name={collapseIcon} style={[styles.collapsedIcon]}/>
        </HorizontalRow>
        <ScrollView>
            {deck.cards.map( (card, index) => 
                    this._renderCardAccuracy(card, index, cardAccuracyMap.get(card.id))
                )}
        </ScrollView>
     </View>
    );
  }

  _renderCardAccuracy(card, index, cardAccuracy){
      return(
          <HorizontalRow key={card.id} style={styles.cardContainer}>
            <Text style={[styles.deckName, {flex: 1}]}>{card.front}:</Text>
            <Text style={[styles.headerText, {flex: 1}]}>Accuracy: <Text style={styles.correctText}>{cardAccuracy} %</Text></Text>
        </HorizontalRow>
      );
  }

  _renderSessionResult(practiseCardResult, index){
       let totalAnsweredCorrect = practiseCardResult.results.filtered('answeredCorrect = true');
        return(
            <HorizontalRow style={styles.resultsContainer} key={practiseCardResult.id}>
                <Text style={styles.controlText}>Session {index}: </Text>
                <Text style={styles.controlText}>Total: <Text style={styles.totalText}>{practiseCardResult.results.length}</Text></Text>
                <Text style={styles.controlText}>Correct: <Text style={styles.correctText}>{totalAnsweredCorrect.length}</Text></Text>
            </HorizontalRow>
        );
    }

    _roundToPlaces(num, places) { 
        let multiplier = Math.pow(10, places); 
        return (Math.round(num * multiplier) / multiplier);
    }
}

const styles = StyleSheet.create({
  deckContainer:{
    paddingTop: 20,
  },
  cardContainer:{
    paddingLeft: 20,
  },
  deckName:{
    paddingLeft: 10,
    fontWeight: 'bold',
    color: '#0277BD'
  },
  headerText:{
    paddingLeft: 10,
    color: '#0277BD'
  },
  resultsContainer:{
      padding: 10,
  },
  controlText: {
    paddingLeft: 10,
    color: '#0277BD'
  },
  collapsedIcon:{
    paddingLeft: 10,
    fontSize : 18,
    color: '#29B6F6'
  },
  totalText:{
    color: 'black', 
    fontWeight: 'bold'
  },
  correctText:{
    color: 'green', 
    fontWeight: 'bold'
  }
});