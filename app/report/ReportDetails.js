import React, { Component } from 'react';
import Accordion from 'react-native-collapsible/Accordion';
import {View, ScrollView, StyleSheet, Text, TouchableOpacity,} from 'react-native';
import { Container, Content, HorizontalRow, Button } from '../common/Common';
import PracticeDao from '../dao/PracticeDao';
import PixAccordion from 'react-native-pixfactory-accordion';
import Icon from 'react-native-vector-icons/Ionicons';
import {Actions, ActionConst} from 'react-native-router-flux';

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

_gotoDeckReport(){
    Actions.deckReportsPage({deck: this.props.deck, user: this.props.user});
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
        <View>
          <HorizontalRow>
            <Text style={styles.deckName}>{deck.name}:</Text>
            <Text style={styles.headerText}>No results</Text>
          </HorizontalRow>
        </View>
      );
    }
    return(
        <TouchableOpacity style={styles.deckContainer} onPress={() => this._gotoDeckReport()}>
            <HorizontalRow>
                <Text style={styles.deckName}>{deck.name}:</Text>
                <Text style={styles.headerText}><Text style={styles.totalText}>{totalQuestions}</Text></Text>
                <Text style={styles.headerText}>Correct: <Text style={styles.correctText}>{totalAnswered}</Text></Text>
                <Icon name='ios-arrow-forward' style={[styles.collapsedIcon]}/>
            </HorizontalRow>
        </TouchableOpacity>
    );
  }

  _renderHeader(deck, totalQuestions, totalAnswered){
    const {isCollapsed} = this.state;
    let collapseIcon = isCollapsed ? 'ios-add-circle' : 'ios-remove-circle';
    return(
      <HorizontalRow>
          <Text style={styles.deckName}>{deck.name}:</Text>
          <Text style={styles.headerText}><Text style={styles.totalText}>{totalQuestions}</Text></Text>
          <Text style={styles.headerText}>Correct: <Text style={styles.correctText}>{totalAnswered}</Text></Text>
          <Icon name={collapseIcon} style={[styles.collapsedIcon]}/>
          <Button style={styles.detailsButton} textStyle={styles.detailsButtonText} 
                  onPress={() => this._gotoDeckReport()}>
             Report
          </Button>
      </HorizontalRow>
    );
  }

  _renderResult(practiseCardResult, index){
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
    paddingTop: 10,
    marginBottom: 10,
     //backgroundColor: 'grey'
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
    paddingRight: 20,
    fontSize : 18,
    color: '#29B6F6',
    position: 'absolute',
    right: 0
  },
  totalText:{
    color: 'black', 
    fontWeight: 'bold'
  },
  correctText:{
    color: 'green', 
    fontWeight: 'bold'
  },
  detailsButton:{
      backgroundColor: '#48BBEC',
      borderColor: '#48BBEC',
      width: 100,
      height: 20,
      marginLeft: 10,
  },
  detailsButtonText:{
      color: 'white',
      fontSize: 14
  },
});