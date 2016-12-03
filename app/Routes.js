import React from 'react';
import {Scene, Router, Actions, ActionConst} from 'react-native-router-flux';
import { StyleSheet } from 'react-native';
import Deck from './deck/Deck';
import DeckSet from './deck/DeckSet';
import HomePage from './home/HomePage';
import NavigationBar from 'react-native-navbar';
import CardListPage from './card/CardListPage';
import ReportsPage from './report/ReportsPage';
import DeckReport from './report/DeckReport';
import ManageUserPage from './user/ManageUserPage';
import SwitchUserPage from './user/SwitchUserPage';
import SettingsPage from './profile/SettingsPage';

const Routes = ({loading, needRegistration}) => (
    loading ?
        <Loader/> :
        <Router>
            <Scene key="homePage" initial={true} component={HomePage} title="Home" titleStyle={styles.titleStyle} hideNavBar={true}/>
            <Scene key="deckSetPage" component={DeckSet} title="Deck Set" titleStyle={styles.titleStyle} hideNavBar={true}/>
            <Scene key="deckPage" component={Deck} title="Deck" titleStyle={styles.titleStyle} hideNavBar={true}/>
            <Scene key="cardListPage" component={CardListPage} title="Cards" titleStyle={styles.titleStyle} hideNavBar={true}/>
            <Scene key="reportsPage" component={ReportsPage} title="Report" titleStyle={styles.titleStyle} hideNavBar={false} onBack={() => Actions.homePage({type: ActionConst.RESET})} />
            <Scene key="deckReportsPage" component={DeckReport} title="Deck Report" titleStyle={styles.titleStyle} hideNavBar={false} />
            <Scene key="deckReportsPageFromDeck" component={DeckReport} title="Deck Report" titleStyle={styles.titleStyle} hideNavBar={false} onBack={() => Actions.homePage({type: ActionConst.RESET})}/>
            <Scene key="manageUsersPage" component={ManageUserPage} title="Manage Users" titleStyle={styles.titleStyle} hideNavBar={false} />
            <Scene key="switchUsersPage" component={SwitchUserPage} title="Switch Users" titleStyle={styles.titleStyle} hideNavBar={false} />
            <Scene key="settingsPage" component={SettingsPage} title="Settings" titleStyle={styles.titleStyle} hideNavBar={false} />
        </Router>
);

const styles = StyleSheet.create({
    titleStyle:{
        color: "#0076FF"
    }
});

export default Routes;