import React, { Component } from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import { Container, Content, Center, Footer, HorizontalRow, Button } from '../common/Common';
import SwipeableViews from 'react-swipeable-views/lib/index.native.scroll';
import AssessmentItem from './AssessmentItem';

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
});