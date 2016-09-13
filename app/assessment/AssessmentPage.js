import React, { Component } from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import { Container, Content, Center, Footer, HorizontalRow, Button, SwipeableViews } from '../common/Common';
import AssessmentItem from './AssessmentItem';
const { width } = Dimensions.get('window');
import Swiper from 'react-native-swiper';

export default class AssessmentPage extends Component {
    componentDidMount(){

    }
    
    render(){
        return(
            <Container>
                <SwipeableViews>
                    <AssessmentItem/>
                    <AssessmentItem/>
                    <AssessmentItem/>
                </SwipeableViews>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    answerButtonContainer:{
        justifyContent: 'space-between',
        padding: 10,
    },
    answerButton:{
        flex: 1,
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
    },
    answerText:{
        color: 'white',
        textAlign: 'center'
    },
    vocabText: {
        fontSize: 32,
    },
    dummySpace:{
        margin: 10
    }
});