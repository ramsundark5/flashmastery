import React from 'react';
import {Scene, Router, Actions as routes} from 'react-native-router-flux';
import { StyleSheet } from 'react-native';
import ProfilePage from './profile/ProfilePage';
import AssessmentPage from './assessment/AssessmentPage';

const Routes = ({loading, needRegistration}) => (
    loading ?
        <Loader/> :
        <Router>
            <Scene key="profilePage" component={ProfilePage} title="Profile"/>
            <Scene key="assessment" initial={true} component={AssessmentPage}/>
        </Router>
);

const styles = StyleSheet.create({
});

export default Routes;