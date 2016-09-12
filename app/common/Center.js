import React, { Component } from 'react';
import {View, StyleSheet} from 'react-native';
const NAV_BAR_HEIGHT = 39;
const STATUS_BAR_HEIGHT = 20;
const HEADER_HEIGHT = NAV_BAR_HEIGHT + STATUS_BAR_HEIGHT;

export default class Center extends Component {
	render() {
		return (
			<View style={[styles.Center, this.props.style]}>
				{ this.props.children }
			</View>
		);
	}
}

const styles = StyleSheet.create({
    Center: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center'
    }
});