import React, { Component } from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import { Container, Content, Center, Footer, HorizontalRow, Button } from '../common/Common';
import SwipeableViews from 'react-swipeable-views/lib/index.native.scroll';
import AssessmentItem from './AssessmentItem';
import {LocalDatabase} from '../database/LocalDatabase';

export default class AssessmentPage extends Component {
    componentDidMount(){
    }
    
    render(){
        const {assignmentName} = this.props;
        console.log('inside render of AssessmentPage '+assignmentName);
        const data = LocalDatabase['Kindergarten'];
        return(
            <Container style={styles.container}>
                <SwipeableViews>
                    {
                        data.map( 
                            (assignment, index) => <AssessmentItem key={index} assignment={assignment} />
                        )
                    }
                </SwipeableViews>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        padding: 0,
        backgroundColor: "#E0F2F1"
    },
});