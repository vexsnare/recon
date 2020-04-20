import React, { Component } from 'react';
import _ from 'lodash';
import { Field } from 'redux-form';
import { View, StyleSheet, Platform, Text } from 'react-native';
import { secondaryColor, inputErrorTextSize, inputTextSize } from '../../themes';
import { Heading, TextInput, Bold } from '../common';
import { required, mobile, valueIsNotNull } from '../../validators';
import { renderTextInput, renderCheckBox } from '../renderer';

import RNPickerSelect from 'react-native-picker-select';

export const renderDropdown = (props) => {
  const { input, label, placeholder, options, meta, ...otherProps } = props;
  return (
    <View>
      <Text style={{fontSize: inputTextSize}}>{label}</Text>
      <View style={{borderColor: 'gray', borderWidth: 1}}>
      <RNPickerSelect
          onValueChange={input.onChange}
          input={input}
          placeholder={placeholder}
          onFocus={input.onFocus}
          onBlur={input.onBlur}
          value={input.value}
          autoCorrect={false}
          items={options}
      />
      </View>
      {meta.touched && meta.error && <Text style={{color: 'red', fontSize: inputErrorTextSize}}>{meta.error}</Text>}
      </View>
  );
};


export const renderTextArea = (props) => {
  const { input, label, meta, ...otherProps } = props;
  return (
    <View style={{paddingHorizontal: 5, paddingVertical: 20}}>
    <Bold style={{fontSize: 20, paddingBottom: 10}}>{label}</Bold>
    <TextInput
      editable = {true}
      {...otherProps}
      multiline={true}
      onChangeText={input.onChange}
      value={input.value}
      numberOfLines = {8}
      input={input}
      onFocus={input.onFocus}
      onBlur={input.onBlur}
      autoCorrect={false}
      underlineColorAndroid="transparent"
      placeholder="Please start typing here..."
      style={styles.multiline}
    />
    {meta.touched && meta.error && <Text style={{color: 'red', fontSize: inputErrorTextSize}}>{meta.error}</Text>}
  </View>
  );
}

export default class RecordForm extends Component {


  
  render() {
    return (
      <View>
        <Heading>
          PERSON INFORMATION
        </Heading>
        <Field
          name='name'
          label='Full Name'
          component={renderTextInput}
          validate={[required]}
        />
        <Field
          name='age'
          label='Age'
          maxLength={3}
          component={renderTextInput}
          keyboardType='numeric'
          validate={[required]}
        />
        <Field
          name='mobileNumber'
          label='Phone Number'
          maxLength={10}
          keyboardType='numeric'
          component={renderTextInput}
          validate={[required, mobile]}
        />
        <Field
          name='ward'
          label='Village/Ward'
          component={renderTextInput}
        />
        <Field
          name='tehsil'
          label='Tehsil'
          component={renderTextInput}
          validate={[required]}
        />
        <Field
          name='district'
          label='District'
          component={renderTextInput}
          validate={[required]}
        />
        <Field
          name='gender'
          label='Gender'
          component={renderDropdown}
          options={[
            { label: 'Male', value: 'MALE' },
            { label: 'Female', value: 'FEMALE' },
            { label: 'Other', value: 'OTHER' }
        ]}
        validate={[required, valueIsNotNull]}
        />
        <Heading>
            Symptoms
        </Heading>
        <Field
          name='fever'
          label='Fever'
          component={renderCheckBox}
        />
        <Field
          name='cough'
          label='Cough'
          maxLength={10}
          component={renderCheckBox}
        />
        <Field
          name='shortnessOfBreath'
          label='Shortness of breath'
          component={renderCheckBox}
        />

        <Field
          name='anyOneInFamilyShowingSymptoms'
          label='Anyone In Family Showing Symptoms'
          component={renderCheckBox}
        />

        <Field
          label='Anyone Around Showing Symptoms'
          name='anyOneAround'
          component={renderTextArea}
        />

          <Field
          name='previousHistoryOfDisease'
          label='Previous History Of Disease'
          component={renderTextArea}
        />
        <Field
          name='otherDetails'
          label='Other Details'
          component={renderTextArea}
        />
        <Heading>
            Quarantine Detail
        </Heading>
        <Field
          name='quarantineType'
          label='Quarantine Type'
          component={renderDropdown}
          options={[
            { label: 'Home', value: 'HOME' },
            { label: 'Institutional', value: 'INSTITUTIONAL' },
            { label: 'None', value: 'NONE' },
          ]}
        />
        <Field
          name='quarantineAddress'
          label='Quarantine Address'
          component={renderTextArea}
        />
        <Field
          name='contactType'
          label='Contact Type'
          component={renderDropdown}
          options={[
            { label: 'Primary', value: 'PRIMARY' },
            { label: 'Secondary', value: 'SECONDARY' },
            { label: 'None', value: 'NONE' },
          ]}
        />
        <Field
          name='contactDetails'
          label='Contact Details'
          component={renderTextArea}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  checkboxContainer: {
    marginBottom: 20
  },
  picker: Platform.select({
    ios: {
      borderBottomColor: 'gray',
      borderBottomWidth: 0.5,
      top: 8
    },
    android: {
      borderBottomColor: 'gray',
      borderBottomWidth: 0.5,
      bottom: 5
    }
  }),
  infoText: {
    color: secondaryColor,
    fontSize: inputTextSize,
    padding: 5
  },
  multiline: {
    borderWidth: 2,
    flex: 1,
    borderColor: 'gray',
    height: 80,
    fontSize: 15,
    padding: 4,
    marginBottom: 4,
  },
  fieldError: {
    color: 'red',
    fontSize: inputErrorTextSize
  },
  infoTextBox: {
    borderWidth: 1,
    borderColor: secondaryColor,
    marginBottom: 10
  },
  error: {
    color: 'red',
    marginTop: -10,
    fontSize: inputErrorTextSize,
    paddingBottom: inputErrorTextSize
  }
});
