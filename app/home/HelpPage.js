import React, { Component } from 'react';
import {View, ScrollView, StyleSheet, Text, TouchableOpacity,} from 'react-native';
import HTML from 'react-native-fence-html';
import {HelpContent} from './HowtoUse';

export default class HelpPage extends Component{
    render(){
        console.log('html view is '+HelpContent);
        return(
            <ScrollView style={styles.container}>
                <HTML html={HelpContent}/>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        paddingTop: 65,
        flex: 1,
        backgroundColor: 'white',
        margin: 15
    }
});