import React from 'react';
import {Scene, Router, Actions as routes} from 'react-native-router-flux';
import { StyleSheet } from 'react-native';
import ProfilePage from './profile/ProfilePage';
import AssessmentPage from './assessment/AssessmentPage';
import Loader from './common/Loader';
import TabIcon from './common/TabIcon';

const Routes = ({loading, needRegistration}) => (
    loading ?
        <Loader/> :
        <Router>
            <Scene key="profilePage" initial={true} component={ProfilePage} title="Profile"/>
            <Scene key="assessment" initial={true} component={ProfilePage}/>
        </Router>
);

const styles = StyleSheet.create({
});

export default Routes;