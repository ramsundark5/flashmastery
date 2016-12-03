import React, { Component } from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import { HorizontalRow, Button, Container } from '../common/Common';
import SettingsDao from '../dao/SettingsDao';
import FloatLabelTextInput from 'react-native-floating-label-text-input';
import InputNumber from 'rc-input-number';

export default class SettingsPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            settings: {},
        };
    }

    componentDidMount(){
        let currentSettings = SettingsDao.getSettings();
        this.setState({settings: currentSettings});
    }

    _updateNumericSettingsValue(settingsName, settingsValue){
        let settingsToBeUpdated =  Object.assign({}, this.state.settings);
        settingsToBeUpdated[settingsName] = settingsValue;
        SettingsDao.updateSettings(settingsToBeUpdated);
        this.setState({settings: settingsToBeUpdated});
    }

    _updateSettingsValue(settingsName, settingsValue){
        let settingsToBeUpdated =  Object.assign({}, this.state.settings);
        settingsToBeUpdated[settingsName] = settingsValue;
        SettingsDao.updateSettings(settingsToBeUpdated);
        this.setState({settings: settingsToBeUpdated});
    }

    render(){
        const {settings} = this.state;
        return(
            <View style={styles.content}>
                <View style={styles.settingsContainer}>
                    <Text style={styles.fieldLabel}>Mastered Accuracy threshold in %</Text>
                    <InputNumber value={settings.minimumAccuracy} 
                        styles={inputNumberStyles}
                        min={25} max={100}
                        onChange={(newValue) => this._updateNumericSettingsValue('minimumAccuracy', newValue)}/>
                </View>

                <View style={styles.settingsContainer}>
                    <Text style={styles.fieldLabel}>Minimum Attempts</Text>
                    <InputNumber value={settings.minimumAttempts}
                        styles={inputNumberStyles} 
                        min={2} max={10}
                        onChange={(newValue) => this._updateNumericSettingsValue('minimumAttempts', newValue)}/>
                </View>
            </View>
        );
    }
}

const inputNumberStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    marginBottom: 10
  },
  input: {
    flex: 1,
    textAlign: 'center',
    paddingHorizontal: 8,
    fontSize: 16,
    color: '#222',
  },
  stepWrap: {
    width: 28,
    height: 28,
    borderWidth: 1,
    borderColor: '#d9d9d9',
    borderRadius: 6,
    backgroundColor: 'white',
  },
  stepText: {
    textAlign: 'center',
    fontSize: 20,
    color: '#999',
    backgroundColor: 'transparent',
  },
  stepDisabled: {
    borderColor: '#d9d9d9',
    backgroundColor: 'rgba(239, 239, 239, 0.72)',
  },
  disabledStepTextColor: {
    color: '#ccc',
  },
  highlightStepTextColor: {
    color: '#2DB7F5',
  },
  highlightStepBorderColor: {
    borderColor: '#2DB7F5',
  },
});
const styles = StyleSheet.create({
    content:{
        paddingTop: 100
    },
    settingsContainer: {
        margin: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    },
    fieldLabel:{
        fontSize: 14,
        //fontWeight: 'bold',
        color: '#0076FF',
    },
});