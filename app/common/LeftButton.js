import React, { Component } from 'react';
import { Image, TouchableOpacity, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class LeftButton extends Component {
  render() {
    return (
      <View style={styles.container} onPress={() => this.props.handler()}>
            <Icon name='ios-arrow-back' style={[styles.leftIcon]}/>
            <Text style={styles.leftText}>Back</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container:{
        marginLeft: 8, 
        top: 8,
        height: 37,
        width: 100,
        //left: 6,
        //padding: 8,
        //flex: 1, 
        flexDirection: 'row',
        //justifyContent: 'center'
    },
    leftIcon:{
        fontSize :28,
        justifyContent: 'center',
        color: '#0076FF'
    },
    leftText:{
        paddingTop: 3,
        paddingLeft: 3,
        fontSize: 17,
        textAlign: 'left',
        color: '#0076FF'
    }
});