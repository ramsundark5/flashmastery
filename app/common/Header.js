import React, { Component } from 'react';
import {View, StyleSheet} from 'react-native';

export default class Header extends Component {
	render() {
		return (
			<View style={[styles.header, this.props.style]}>
				{ this.props.children }
			</View>
		);
	}
}

const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0
    }
});