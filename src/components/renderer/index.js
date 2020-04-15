import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { selectionColor, inputErrorTextSize } from '../../themes';
import { TextInput, FloatingLabelInput } from '../common';

export const renderTextInput = (props) => {
  const { input, meta, label, ...inputProps } = props;
  if(Platform.OS === 'ios') {
    return (
      <View
        style={{paddingBottom: meta.touched && meta.error ? 0: inputErrorTextSize}}
      >
       <TextInput
         {...inputProps}
         label={label}
         value={input.value}
         onChangeText={input.onChange}
         autoCorrect={false}
         onFocus={input.onFocus}
         onBlur={input.onBlur}
       />
       {meta.touched && meta.error && <Text style={styles.error}>{meta.error}</Text>}
       </View>
   );
  }
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
