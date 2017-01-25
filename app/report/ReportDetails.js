import React, { Component } from 'react';
import Accordion from 'react-native-collapsible/Accordion';
import {View, ScrollView, StyleSheet, Text, TouchableOpacity,} from 'react-native';
import { Container, Content, HorizontalRow, Button } from '../common/Common';
import PracticeDao from '../dao/PracticeDao';
import ReportDao from '../dao/ReportDao';
import SettingsDao from '../dao/SettingsDao';
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
    let masteredPercent = this._getMasteredPercent(deck);
    if(practiseCardResults.length < 1){
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
                <Text style={styles.headerText}>Mastered: <Text style={styles.correctText}>{masteredPercent} %</Text></Text>
                <Icon name='ios-arrow-forward' style={[styles.collapsedIcon]}/>
            </HorizontalRow>
        </TouchableOpacity>
    );
  }

    _getMasteredPercent(deck){
        let masteredCardsCount = 0;
        let settings = SettingsDao.getSettings();
        let minimumAccuracy = settings.minimumAccuracy;
        deck.cards.map( (card, index) => {
            let cardAccuracy = ReportDao.getPracticeCardAccuracy(card.id, this.props.user.id);
            if(cardAccuracy > minimumAccuracy){
                masteredCardsCount++;
            }
        });

        let masteredCardsPercent = (masteredCardsCount/deck.cards.length) * 100;
        masteredCardsPercent = this._roundToPlaces(masteredCardsPercent, 2);
        return masteredCardsPercent;
    }

    _roundToPlaces(num, places) { 
      let multiplier = Math.pow(10, places); 
      return (Math.round(num * multiplier) / multiplier);
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