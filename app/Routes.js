import React from 'react';
import {Scene, Router, Actions} from 'react-native-router-flux';
import { StyleSheet } from 'react-native';
import ProfilePage from './profile/ProfilePage';
import Deck from './deck/Deck';
import DeckSet from './deck/DeckSet';
import HomePage from './home/HomePage';
import NavigationBar from 'react-native-navbar';
import CardListPage from './card/CardListPage';

const Routes = ({loading, needRegistration}) => (
    loading ?
        <Loader/> :
        <Router>
            <Scene key="profilePage" component={ProfilePage} title="Profile" titleStyle={styles.titleStyle} hideNavBar={false}/>
            <Scene key="homePage" initial={true} component={HomePage} title="Home" titleStyle={styles.titleStyle} hideNavBar={true}/>
            <Scene key="deckSetPage" component={DeckSet} title="Deck Set" titleStyle={styles.titleStyle} hideNavBar={true}/>
            <Scene key="deckPage" component={Deck} title="Deck" titleStyle={styles.titleStyle} hideNavBar={true}/>
            <Scene key="cardListPage" component={CardListPage} title="Cards" titleStyle={styles.titleStyle} hideNavBar={false}/>
        </Router>
);

const styles = StyleSheet.create({
    titleStyle:{
        color: "#0076FF"
    }
});

export default Routes;