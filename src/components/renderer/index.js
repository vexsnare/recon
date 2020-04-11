import React from 'react';
import { View, Platform, StyleSheet, Text } from 'react-native';
import {FloatingLabelInput} from '../common/FloatingLabelInput';
import { selectionColor, inputErrorTextSize } from '../../themes';

export const renderTextInput = (props) => {
  const { input, meta, label, ...inputProps } = props;
  return  (
    <View
      style={{paddingBottom: meta.touched && meta.error ? 0: inputErrorTextSize}}
    >
     <FloatingLabelInput
       {...inputProps}
       placeholder={label}
       value={input.value}
       onChangeTextValue={input.onChange}
       autoCorrect={false}
       selectionColor={selectionColor}
       onFocus={input.onFocus}
       onBlur={input.onBlur}
     />
     {meta.touched && meta.error && <Text style={styles.error}>{meta.error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  error: {
    color: 'red',
    fontSize: inputErrorTextSize
  }
});
