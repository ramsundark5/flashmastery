import React, { Component } from 'react';
import {View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity, KeyboardAvoidingView} from 'react-native';
import { Container, Content, Center, Footer, ResponsiveGrid, Button } from '../common/Common';
import {LocalDatabase} from '../database/LocalDatabase';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import DeckDao from '../dao/DeckDao';
import uuid from 'react-native-uuid';
import DeckTile from '../deck/DeckTile';
import ColorGenerator from '../utils/ColorGenerator';
import NavigationBar from 'react-native-navbar';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const colors = ["#00B0FF", "#1DE9B6", "#FFC400", "#E65100", "#F44336"];
const ADD_NEW_DECK = 'add';

export default class HomePage extends Component {
    constructor(props){
        super(props);
        this._addNewDeckOptionAtEnd();
        this.selectedDeckSets = new Set();
        this.state = {
            deckSets: LocalDatabase,
            selectionModeEnabled: false
        };
    }

    componentDidMount(){
        this._addCustomDeckSetsToLocalDatabase();
    }
    
    _addCustomDeckSetsToLocalDatabase(){
        let customDeckSets = DeckDao.getAllDeckSet();
        let deckSetsAfterCustomAdd = LocalDatabase.concat(customDeckSets);
        this.setState({deckSets: deckSetsAfterCustomAdd, selectionModeEnabled: false});
    }

    _addNewDeckOptionAtEnd(){
        this.addNewDeckSet = {id: uuid.v1(), action: ADD_NEW_DECK, name: ''};
    }

    _onSelectDeckSet(deckSet){
        if(this.state.selectionModeEnabled){
            if(deckSet.selected){
                this.selectedDeckSets.add(deckSet.id);
            }else{
                this.selectedDeckSets.delete(deckSet.id);
            }
        }else{
            Actions.deckSetPage({deckSet: deckSet});
        }
    }

    _onDeckSetNameUpdate(updatedDeckSet){
        //save to db
        DeckDao.updateDeckSet(updatedDeckSet);

        let deckSetsAfterUpdate = this.state.deckSets.map( (existingDeckSet, index) => 
            existingDeckSet.id === updatedDeckSet.id?
                    Object.assign({}, updatedDeckSet) :
                    existingDeckSet
            
        );
        this.setState({deckSets: deckSetsAfterUpdate});
    }

    _onNewDeckSetAdd(addedDeckSet){
        addedDeckSet.decks = [];
        addedDeckSet.custom = true;
        addedDeckSet.lastModified = new Date();
        //save to db
        DeckDao.addNewDeckSet(addedDeckSet);

        this._addNewDeckOptionAtEnd();
        let deckSetsAfterAdd = this.state.deckSets.concat(addedDeckSet);
        this.setState({deckSets: deckSetsAfterAdd});
    }

    _onDeckSetDelete(){
        DeckDao.deleteDeckSets(this.selectedDeckSets);
        this.selectedDeckSets = new Set();
        this._addCustomDeckSetsToLocalDatabase();
    }

    render(){
        let {deckSets} = this.state;
        let navigationState = this.props.navigationState;
        let contentMarginBottom = this.state.selectionModeEnabled? 45 : 0;
        return(
            <View style={{ flex: 1, }}>
                {this._renderHeader()}
                <KeyboardAwareScrollView style={{marginBottom: contentMarginBottom}}>
                        <ResponsiveGrid
                                containerStyle={{ backgroundColor: '#fff'}}
                                columnCount={2}
                                dataSource={deckSets}
                                extraCellAtEnd = {this.addNewDeckSet}
                                renderCell={(deckSet, index) => this._renderDeckSet(deckSet, index)} />
                </KeyboardAwareScrollView>
                <Footer style={styles.footerContainerStyle}>
                    {this._renderFooter()}
                </Footer>
            </View>
        );
    }

    _renderDeckSet(deckSet, index){
        const isCustom = deckSet.custom;
        console.log('deckSet to be rendered is '+JSON.stringify(deckSet));
        let bgColor = colors[index];
        if(!bgColor){
            bgColor = ColorGenerator.getColor(deckSet.name);
        }
        return(
            <DeckTile deck={deckSet} isCustom={isCustom} bgColor={bgColor} key={deckSet.id} 
                onDeckNameUpdate={(updatedDeckSet) => this._onDeckSetNameUpdate(updatedDeckSet)}
                onNewDeckAdd={(addedDeckSet) => this._onNewDeckSetAdd(addedDeckSet)}
                onSelect={(deckSet) => this._onSelectDeckSet(deckSet)}
                selectionModeEnabled={this.state.selectionModeEnabled} />
        );
    }

    _renderHeader(){
        const rightButtonText = this.state.selectionModeEnabled? 'Done': 'Edit';
        let titleConfig = {title: 'Home', tintColor: '#0076FF'};
        let rightButtonConfig = {title: rightButtonText, 
                        handler: () => this.setState({selectionModeEnabled: !this.state.selectionModeEnabled})};
        return(
           <NavigationBar title={titleConfig} rightButton={rightButtonConfig}/>
        );
    }

    _renderFooter(){
        if(!this.state.selectionModeEnabled){
            return null;
        }
        return(
            <Button onPress={() => this._onDeckSetDelete()}
                textStyle={styles.buttonText} style={styles.deleteButton}>
                DELETE
            </Button>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        padding: 0,
        marginTop: 5,
        marginBottom: 10,
    },
    deleteIcon:{
        fontWeight: 'bold',
        fontSize : 40,
        color: 'red'
    },
    footerContainerStyle:{
        flex: 1, 
    },
    deleteButton:{
        bottom: 0,
        marginBottom: 0,
        borderRadius: 0,
        backgroundColor: '#F44336',
        borderColor: '#F44336',
    },
    buttonText:{
        color: 'white', 
        fontSize: 16, 
        fontWeight: 'bold'
    }
});