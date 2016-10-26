import React, { Component } from 'react';
import Accordion from 'react-native-collapsible/Accordion';
import {View, ScrollView, StyleSheet, Text, TouchableOpacity,} from 'react-native';
import Collapsible from 'react-native-collapsible';
import { Container, Content, HorizontalRow } from '../common/Common';
import PracticeDao from '../dao/PracticeDao';

export default class ReportDetails extends Component {

constructor(props){
    super(props);
    this.state = {
        isCollapsed: false,
    };
}

render(){
    const {deck} = this.props;
    const {isCollapsed} = this.state;
    let practiseCardResults = PracticeDao.getPracticeSessionsForDeck(deck.id);
    let totalQuestions = 0;
    let totalAnswered = 0;
    practiseCardResults.map( (practiseCardResult, index) => {
        let totalAnsweredCorrect = practiseCardResult.results.filtered('answeredCorrect = true');
        practiseCardResult.totalAnsweredCorrect = totalAnsweredCorrect;
        totalQuestions = totalQuestions + practiseCardResult.results.length;
        totalAnswered  = totalAnswered + totalAnsweredCorrect.length;
    });
    return(
        <View style={styles.deckContainer}>
            <HorizontalRow onPress={() => this.setState({isCollapsed: !isCollapsed}) }>
                <Text style={styles.headerText}>{deck.name}:</Text>
                <Text style={styles.headerText}>Total: {totalQuestions}</Text>
                <Text style={styles.headerText}>Correct: {totalAnswered}</Text>
            </HorizontalRow>
            <Collapsible collapsed={isCollapsed}>
                {practiseCardResults.map( (practiseCardResult, index) => 
                    this._renderResult(practiseCardResult, index)
                )}
            </Collapsible>
        </View>
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
  headerText:{
    paddingLeft: 10,
    //color: 'white',
  },
  resultsContainer:{
      padding: 10,
  },
  controlText: {
    paddingLeft: 10,
    color: 'black',
  },
});