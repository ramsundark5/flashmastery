import React, { Component } from 'react';
import Accordion from 'react-native-collapsible/Accordion';
import {View, ScrollView, StyleSheet, Text, TouchableOpacity,} from 'react-native';
import { Container, Content, HorizontalRow } from '../common/Common';
import PracticeDao from '../dao/PracticeDao';
import ReportDao from '../dao/ReportDao';
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
    let totalQuestions = 0;
    let totalAnswered = 0;
    practiseCardResults.map( (practiseCardResult, index) => {
        let totalAnsweredCorrect = practiseCardResult.results.filtered('answeredCorrect = true');
        practiseCardResult.totalAnsweredCorrect = totalAnsweredCorrect;
        totalQuestions = totalQuestions + practiseCardResult.results.length;
        totalAnswered  = totalAnswered + totalAnsweredCorrect.length;
    });

    if(totalQuestions < 1){
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
            <View style={styles.deckContainer}>
                <PixAccordion
                onChange={() => this._toggleCollapseIcon()}
                renderHeader={() => this._renderHeader(deck, totalQuestions, totalAnswered)}>
                {practiseCardResults.map( (practiseCardResult, index) => 
                        this._renderSessionResult(practiseCardResult, index)
                    )}
                </PixAccordion>
            </View>
        </Container>
    );
  }

  _renderHeader(deck, totalQuestions, totalAnswered){
    const {isCollapsed} = this.state;
    let collapseIcon = isCollapsed ? 'ios-add-circle' : 'ios-remove-circle';
    let accuracy = Math.round( totalAnswered/totalQuestions ) * 100; 
    return(
     <View>
        <HorizontalRow key={deck.id}>
            <Text style={styles.deckName}>{deck.name}:</Text>
            <Text style={styles.headerText}>Accuracy: <Text style={styles.correctText}>{accuracy} %</Text></Text>
            <Icon name={collapseIcon} style={[styles.collapsedIcon]}/>
        </HorizontalRow>
        <ScrollView>
            {deck.cards.map( (card, index) => 
                    this._renderCardAccuracy(card, index)
                )}
        </ScrollView>
     </View>
    );
  }

  _renderCardAccuracy(card, index){
      let cardAccuracy = ReportDao.getPracticeCardAccuracy(card.id, this.props.user.id);
      return(
          <HorizontalRow key={card.id} style={styles.cardContainer}>
            <Text style={styles.deckName}>{card.front}:</Text>
            <Text style={styles.headerText}>Accuracy: <Text style={styles.correctText}>{cardAccuracy} %</Text></Text>
        </HorizontalRow>
      );
  }

  _renderSessionResult(practiseCardResult, index){
        return(
            <HorizontalRow style={styles.resultsContainer} key={practiseCardResult.id}>
                <Text style={styles.controlText}>Session {index}: </Text>
                <Text style={styles.controlText}>Total: <Text style={styles.totalText}>{practiseCardResult.results.length}</Text></Text>
                <Text style={styles.controlText}>Answered: <Text style={styles.correctText}>{practiseCardResult.totalAnsweredCorrect.length}</Text></Text>
            </HorizontalRow>
        );
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
    //color: 'black',
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