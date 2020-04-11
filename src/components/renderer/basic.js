import React from 'react';
import { View, Platform, StyleSheet, Text, TextInput } from 'react-native';
import { inputErrorTextSize, inputLabelFontSize, inputTextSize } from '../../themes';

export const renderTextInput = (props) => {
  const { input, meta, unit, label, required, ...inputProps } = props;
    return (
    <View
      style={{paddingBottom: meta.touched && meta.error ? 0: inputErrorTextSize}}
    >
    <View style={{flexDirection: 'row', flex: 1, justifyContent: 'space-between'}}>
       <Text style={{fontSize: inputTextSize}}>{label}</Text>
       <TextInput
         {...inputProps}
         placeholder={required ? "required": "optional"}
         value={input.value}
         onChangeText={input.onChange}
         autoCorrect={false}
         onFocus={input.onFocus}
         onBlur={input.onBlur}
         style={styles.textInput}
       />
       {
         unit &&
         <Text style={{fontSize: inputTextSize, paddingLeft: 5, paddingTop: 2}}>{unit}</Text>
       }
     </View>
     {meta.touched && meta.error && <Text style={styles.error}>{meta.error}</Text>}
     </View>
   );
}

const styles = StyleSheet.create({
  error: {
    color: 'red',
    fontSize: inputErrorTextSize,
    marginTop: Platform.OS === 'ios'? 0 : -18,
    marginBottom: Platform.OS === 'ios'? 0 : 15,
  },

  errorPicker: {
    color: 'red',
    fontSize: inputErrorTextSize,
    marginBottom: Platform.OS === 'ios'? 0 : 15,
  },
  pickerView: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    marginBottom: Platform.OS === 'ios'? 0 : -10,
  },
  textInput:
  {
    textAlign: 'right',
    flex: 1,
    paddingLeft: 5,
    paddingTop: -12,
    lineHeight: inputTextSize,
    fontSize: inputLabelFontSize
  }
});
