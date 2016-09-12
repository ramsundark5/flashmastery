import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Animated,
  Clipboard,
  TouchableWithoutFeedback,
} from 'react-native'
import t from 'tcomb-form-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Textbox = t.form.Textbox
const DISABLED_COLOR = '#777777';
const DISABLED_BACKGROUND_COLOR = '#eeeeee';

const customTemplate = {
  textbox: {
    normal: {
      borderWidth: 0,
    },
    error: {
      borderWidth: 0,
    },
    notEditable: {
      height: 36,
      padding: 7,
      color: DISABLED_COLOR,
    }
  },
  formGroup: {
    normal: {
      marginBottom: 10,
      paddingTop: 10,
      borderBottomColor: '#00BCD4',
      borderBottomWidth: 1,
    },
    error: {
      marginBottom: 10,
      paddingTop: 10,
      borderBottomColor: 'red',
      borderBottomWidth: 1,
    }
  },
  controlLabel:{
    normal: {
      fontSize: 12,
      color: '#1482fe',
    },
    error: {
      fontSize: 12,
      color: 'red',
    }
  }
};

class FloatingLabel extends Textbox {
  constructor (props) {
    super(props);
    this.state = {
      fieldFocused: (props.value) ? true : false,
      value: (props.value) ? String(props.value) : undefined,
      fadeAnim: (props.value) ? new Animated.Value(1) : new Animated.Value(0),
      placeholderString: undefined,
    };
  }

  getLocals() {
    let locals = super.getLocals();
    [
      'copyToclipboard',
      'clipboardMessage',
      'showPassword',
      'generatePassword'
    ].forEach((name) => locals[name] = this.props.options[name]);

    return locals;
  }

  getTemplate () {
    let self = this
    return function (locals) {
      const stylesheet = locals.stylesheet;
      let formGroupStyle = customTemplate.formGroup.normal;
      let controlLabelStyle = customTemplate.controlLabel.normal;
      let textboxStyle = customTemplate.textbox.normal;
      let helpBlockStyle = stylesheet.helpBlock.normal;
      let errorBlockStyle = stylesheet.errorBlock;

      if (locals.hasError) {
        controlLabelStyle = customTemplate.controlLabel.error;
        formGroupStyle = customTemplate.formGroup.error;
        textboxStyle = customTemplate.textbox.error;
        helpBlockStyle = stylesheet.helpBlock.error;
      }

      if (locals.editable === false) {
        textboxStyle = customTemplate.textbox.notEditable;
      }
      const help = locals.help ? <Text style={helpBlockStyle}>{locals.help}</Text> : null;
      const error = locals.hasError && locals.error ? <Text style={errorBlockStyle}>{locals.error}</Text> : null;
      const label =
        <Animated.Text style={[controlLabelStyle, {
          opacity: self.state.fadeAnim,
          transform: [{
            translateY: self.state.fadeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [10, 0]
            }),
          }]}]}>
          {locals.label}
        </Animated.Text>

      const placeholderString = (self.state.fieldFocused) ? '' : self.state.placeholderString || locals.label;
      return (
        <TouchableWithoutFeedback onPress={() => {
            if (locals.editable === false) {
              return
            }
            self.refs.input.focus()
          }}>
          <View style={formGroupStyle}>
            {label}
            <View style={styles.row}>
              <TextInput
                ref='input'
                autoCapitalize={locals.autoCapitalize}
                autoCorrect={locals.autoCorrect}
                autoFocus={locals.autoFocus}
                bufferDelay={locals.bufferDelay}
                clearButtonMode={locals.clearButtonMode}
                editable={locals.editable}
                enablesReturnKeyAutomatically={locals.enablesReturnKeyAutomatically}
                keyboardType={locals.keyboardType}
                multiline={locals.multiline}
                onBlur={self._onBlur.bind(self, locals)}
                onEndEditing={locals.onEndEditing}
                onFocus={self._onFocus.bind(self, locals)}
                onSubmitEditing={locals.onSubmitEditing}
                password={locals.password}
                placeholderTextColor={(locals.hasError) ? locals.errorPlaceholderTextColor || 'red' : locals.placeholderTextColor || 'grey'}
                returnKeyType={locals.returnKeyType}
                selectTextOnFocus={locals.selectTextOnFocus}
                secureTextEntry={locals.secureTextEntry}
                selectionState={locals.selectionState}
                onChangeText={(value) => {
                  locals.onChange(value)
                  self._onChangeText.bind(self, value, locals)
                }}
                onChange={locals.onChangeNative}
                placeholder={placeholderString}
                maxLength={locals.maxLength}
                numberOfLines={locals.numberOfLines}
                textAlign={locals.textAlign}
                textAlignVertical={locals.textAlignVertical}
                underlineColorAndroid={locals.underlineColorAndroid}
                style={[styles.textInput, textboxStyle]}
                value={locals.value}
              />
              {self.renderShowPassword()}
              {self.renderCopyToClipBoard()}
              {self.renderGeneratePassword()}
            </View>
            {help}
            {error}
          </View>
        </TouchableWithoutFeedback>
      )
    }
  }

  renderCopyToClipBoard(){
    const {copyToclipboard, clipboardMessage} = this.props.options;
    if(!copyToclipboard){
      return null;
    }
    return(
        <View style={styles.iconContainer}>
          <Icon.Button name="ios-copy-outline"
                       backgroundColor="transparent" underlayColor="blue"
                       iconStyle={styles.icon}
                       onPress={() => this.copyContent()} />
        </View>
    )
  }

  renderShowPassword(){
    const {showPassword} = this.props.options;
    if(!showPassword){
      return null;
    }
    return(
        <View style={styles.iconContainer}>
          <Icon.Button name="ios-eye"
                       backgroundColor="transparent" underlayColor="blue"
                       iconStyle={styles.icon}
                       onPress={() => this.showPassword()} />
        </View>
    )
  }

  renderGeneratePassword(){
    const {generatePassword} = this.props.options;
    if(!generatePassword){
      return null;
    }
    return(
        <View style={styles.iconContainer}>
          <Text>Generate</Text>
        </View>
    )
  }

  copyContent(){
    Clipboard.setString(this.state.value);
  }

  showPassword(){

  }
  generatePassword(){

  }

  _onChangeText (text, locals) {
    this.setState({value: text});
  }

  _onFocus (locals) {
    Animated.spring(
      this.state.fadeAnim,
      {toValue: 1, friction: 5},
    ).start();
    this.setState({
      fieldFocused: true,
      placeholderString: '',
    });
    if (locals.onFocus) {
      locals.onFocus();
    }
  }

  _onBlur (locals) {
    if (!this.state.value) {
      Animated.timing(
        this.state.fadeAnim,
        {toValue: 0},
      ).start();
    }
    this.setState({
      fieldFocused: false,
      placeholderString: locals.label
    });
    if (locals.onBlur) {
      locals.onBlur();
    }
  }

  getLocals () {
    let locals = super.getLocals();
    [
      'errorPlaceholderTextColor'
    ].forEach((name) => locals[name] = this.props.options[name]);
    return locals;
  }

  shouldComponentUpdate (nextProps, nextState) {
    return true;
  }
}

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    borderWidth: 0,
    flex: 1
  },
  row:{
    flexDirection: 'row'
  },
  iconContainer:{
    paddingTop: 5,
  },
  icon:{
    color: 'black'
  }
});

export default FloatingLabel
