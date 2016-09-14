import React from 'react';
import {Scene, Router, Actions as routes} from 'react-native-router-flux';
import { StyleSheet } from 'react-native';
import ProfilePage from './profile/ProfilePage';
import AssignmentPage from './assessment/AssignmentPage';
import CustomAssignmentPage from './assessment/CustomAssignmentPage';
import HomePage from './home/HomePage';

const Routes = ({loading, needRegistration}) => (
    loading ?
        <Loader/> :
        <Router>
            <Scene key="profilePage" component={ProfilePage} title="Profile" titleStyle={styles.titleStyle}/>
            <Scene key="homePage" initial={true} component={HomePage} title="Home" titleStyle={styles.titleStyle}/>
            <Scene key="assignmentPage" component={AssignmentPage} title="Vocab" titleStyle={styles.titleStyle}/>
            <Scene key="customAssignmentPage" component={CustomAssignmentPage} title="Add Custom Set" titleStyle={styles.titleStyle}/>
        </Router>
);

const styles = StyleSheet.create({
    titleStyle:{
        color: "#0076FF"
    }
});

export default Routes;