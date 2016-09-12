import React, { Component } from 'react';
import {View, StyleSheet} from 'react-native';

export default class Footer extends Component {
	render() {
		return (
			<View style={[styles.footer, this.props.style]}>
				{ this.props.children }
			</View>
		);
	}
}

const styles = StyleSheet.create({
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0
    }
});