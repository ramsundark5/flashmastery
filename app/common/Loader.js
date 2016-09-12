import React, {Component} from 'react';
import {View, ActivityIndicator, ProgressBarAndroid, Platform} from 'react-native';

class Loader extends Component{

    _getSpinner(height, size) {
        if (Platform.OS === 'android') {
            let spinnerHeight = height || 20;
            return (
                <ProgressBarAndroid
                    style={{height: spinnerHeight,}}
                    styleAttr="Inverse"
                    {...this.props}
                />
            );
        } else {
            return (
                <ActivityIndicator
                    animating={true}
                    size={size || "large"}
                    {...this.props}
                />
            );
        }
    }

    render(){
        const {height, size} = this.props;
        return (
            <View>
                {this._getSpinner(height, size)}
            </View>
        );
    }
}


export default Loader;