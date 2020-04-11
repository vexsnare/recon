import React, { Component } from 'react';

import {
  View,
  StyleSheet,
} from 'react-native';

import { TextInput as Input } from 'react-native';
import { primaryColor } from '../../themes';
import { inputLabelFontSize, inputTextSize, placeholderTextColor } from '../../themes';

class TextInput extends Component {
  state = { inputStyle: { borderColor: 'gray', borderBottomWidth: 0.5 } }

  onFocus(func) {
    this.setState({
      inputStyle: {
        borderColor: primaryColor,
        borderBottomWidth: 1
      }
    });
    func();
  }
  onBlur(func) {
   this.setState({
     inputStyle: {
       borderColor: 'gray',
       borderBottomWidth: 1/2
     }
   });
   func();
  }

  render() {
    const { label, style, onFocus, onBlur, ...otherProps } = this.props;
    inputStyle = [];
    inputStyle.push(this.state.inputStyle);

    return (
      <View style={styles.container}>
        <View style={inputStyle}>
        <Input
          style={[styles.input, style]}
          {...otherProps}
          underlineColorAndroid="transparent"
          placeholder={label}
          placeholderTextColor={placeholderTextColor}
          onFocus={() => this.onFocus(onFocus)}
          onBlur={() => this.onBlur(onBlur)}
        />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    bottom: 0
  },
  input: {
    height: 30,
    lineHeight: inputTextSize,
    fontSize: inputLabelFontSize,
  }
});

export { TextInput };
