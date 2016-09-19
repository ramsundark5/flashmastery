import React from 'react';
import {Scene, Router, Actions as routes} from 'react-native-router-flux';
import { StyleSheet } from 'react-native';
import ProfilePage from './profile/ProfilePage';
import Deck from './deck/Deck';
import DeckSet from './deck/DeckSet';
import AddNewDeck from './deck/AddNewDeck';
import HomePage from './home/HomePage';

const Routes = ({loading, needRegistration}) => (
    loading ?
        <Loader/> :
        <Router>
            <Scene key="profilePage" component={ProfilePage} title="Profile" titleStyle={styles.titleStyle}/>
            <Scene key="homePage" initial={true} component={HomePage} title="Home" titleStyle={styles.titleStyle}/>
            <Scene key="deckSetPage" component={DeckSet} title="Deck Set" titleStyle={styles.titleStyle}/>
            <Scene key="deckPage" component={Deck} title="Deck" titleStyle={styles.titleStyle}/>
            <Scene key="addNewDeck" component={AddNewDeck} title="New Deck" titleStyle={styles.titleStyle}/>
        </Router>
);

const styles = StyleSheet.create({
    titleStyle:{
        color: "#0076FF"
    }
});

export default Routes;