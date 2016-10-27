import React, { Component } from 'react';
import Accordion from 'react-native-collapsible/Accordion';
import {View, ScrollView, StyleSheet, Text, TouchableOpacity,} from 'react-native';
import { Container, Content, HorizontalRow } from '../common/Common';
import PracticeDao from '../dao/PracticeDao';
import PixAccordion from 'react-native-pixfactory-accordion';
import Icon from 'react-native-vector-icons/Ionicons';

export default class ReportDetails extends Component {

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
    const {deck} = this.props;
    let practiseCardResults = PracticeDao.getPracticeSessionsForDeck(deck.id);
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
        <View>
          <HorizontalRow>
            <Text style={styles.deckName}>{deck.name}:</Text>
            <Text style={styles.headerText}>No results</Text>
          </HorizontalRow>
        </View>
      );
    }
    return(
        <View style={styles.deckContainer}>
            <PixAccordion
              onChange={() => this._toggleCollapseIcon()}
              renderHeader={() => this._renderHeader(deck, totalQuestions, totalAnswered)}>
              {practiseCardResults.map( (practiseCardResult, index) => 
                    this._renderResult(practiseCardResult, index)
                )}
            </PixAccordion>
        </View>
    );
  }

  _renderHeader(deck, totalQuestions, totalAnswered){
    const {isCollapsed} = this.state;
    let collapseIcon = isCollapsed ? 'ios-add-circle' : 'ios-remove-circle';
    return(
      <HorizontalRow>
          <Text style={styles.deckName}>{deck.name}:</Text>
          <Text style={styles.headerText}>Total: {totalQuestions}</Text>
          <Text style={styles.headerText}>Correct: {totalAnswered}</Text>
          <Icon name={collapseIcon} style={[styles.collapsedIcon]}/>
      </HorizontalRow>
    );
  }

  _renderResult(practiseCardResult, index){
        return(
            <HorizontalRow style={styles.resultsContainer} key={practiseCardResult.id}>
                <Text style={styles.controlText}>Session {index}: </Text>
                <Text style={styles.controlText}>Total: {practiseCardResult.results.length}</Text>
                <Text style={styles.controlText}>Answered: {practiseCardResult.totalAnsweredCorrect.length}</Text>
            </HorizontalRow>
        );
    }
}

const styles = StyleSheet.create({
  deckContainer:{
    paddingTop: 10,
  },
  deckName:{
    paddingLeft: 10,
    fontWeight: 'bold'
  },
  headerText:{
    paddingLeft: 10,
  },
  resultsContainer:{
      padding: 10,
  },
  controlText: {
    paddingLeft: 10,
    color: 'black',
  },
  collapsedIcon:{
    paddingLeft: 5,
    fontSize : 18,
  }
});