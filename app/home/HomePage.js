import React, { Component } from 'react';
import {View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity} from 'react-native';
import { Container, Content, Center, Footer, ResponsiveGrid, Button } from '../common/Common';
import {LocalDatabase} from '../database/LocalDatabase';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import DeckDao from '../dao/DeckDao';
import uuid from 'react-native-uuid';
import DeckTile from '../deck/DeckTile';

const {deviceWidth} = Dimensions.get('window');
const colors = ["#00B0FF", "#1DE9B6", "#FFC400", "#E65100", "#F44336", "#F44336"];
const ADD_NEW_DECK = 'add';

export default class HomePage extends Component {
    constructor(props){
        super(props);
        this.addNewDeckSet = {id: uuid.v1(), action: ADD_NEW_DECK};
        this.state = {
            deckSets: LocalDatabase
        };
    }

    componentDidMount(){
    }
    
    _onSelectDeckSet(deckSet){
        Actions.deckSetPage({deckSet: deckSet});
    }

    _onDeckSetNameUpdate(updatedDeckSet){
        let deckSetsAfterUpdate = this.state.deckSets.map( (existingDeckSet, index) => 
            existingDeckSet.id === updatedDeckSet.id?
                    Object.assign({}, updatedDeckSet) :
                    existingDeckSet
            
        );
        this.setState({deckSets: deckSetsAfterUpdate});
    }

    _onNewDeckSetAdd(addedDeckSet){
        this.addNewDeckSet = {id: uuid.v1(), action: ADD_NEW_DECK};
        let deckSetsAfterAdd = this.state.deckSets.concat(addedDeckSet);
        this.setState({deckSets: deckSetsAfterAdd});
        console.log('extra cells is '+this.addNewDeck);
    }

    render(){
        let {deckSets} = this.state;
        return(
            <Container style={styles.container}>
                <ScrollView>
                    <ResponsiveGrid
                            containerStyle={{ backgroundColor: '#fff',}}
                            columnCount={2}
                            dataSource={deckSets}
                            extraCellAtEnd = {this.addNewDeckSet}
                            renderCell={(deckSet, index) => this._renderDeckSet(deckSet, index)} />
                </ScrollView>
            </Container>
        );
    }

    _renderDeckSet(deckSet, index){
        console.log('deckSet to be rendered is '+JSON.stringify(deckSet));
        const bgColor = colors[index];
        return(
            <DeckTile deck={deckSet} bgColor={bgColor} key={deckSet.id} 
                onDeckNameUpdate={(updatedDeckSet) => this._onDeckSetNameUpdate(updatedDeckSet)}
                onNewDeckAdd={(addedDeckSet) => this._onNewDeckSetAdd(addedDeckSet)}
                onSelect={(deckSet) => this._onSelectDeckSet(deckSet)}/>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        padding: 0,
        marginTop: 5,
        marginBottom: 10
    },
    tile:{ 
        overflow: 'hidden',
        justifyContent: 'center', 
        alignItems: 'center', 
        height: 150,
        margin: 1,
    },
    nameText:{
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
    },
    showAddIcon: {
        padding: 2,
        fontWeight: 'bold',
        fontSize : 40,
        color: 'white'
    },
});