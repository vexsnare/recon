import React, { Component } from 'react';
import _ from 'lodash';
import { Field } from 'redux-form'
import { View, StyleSheet, Platform, Text } from 'react-native';
import { secondaryColor, inputErrorTextSize, inputTextSize } from '../../themes';
import { Heading, TextInput, Bold } from '../common';
import { required, mobile } from '../../validators';
import { renderTextInput } from '../renderer';

import RNPickerSelect from 'react-native-picker-select';

export const Dropdown = (props) => {
  const { input, label, options, meta, ...otherProps } = props;
  return (
    <View>
      <Text style={{fontSize: inputTextSize}}>{label}</Text>
      <RNPickerSelect
          onValueChange={input.onChange}
          value={input.value == undefined ? input.value : (label == "Gender" ? "male": '0')}
          {...otherProps}
          items={options}
      />
      </View>
  );
};


export const renderTextArea = (props) => {
  const { input, label, ...otherProps } = props;
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
      placeholder="Add remark of your report here"
      style={styles.multiline}
    />
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
          component={renderTextInput}
          validate={[required]}
        />
        <Field
          name='gender'
          label='Gender'
          component={Dropdown}
          options={[
            { label: 'Male', value: 'male' },
            { label: 'Female', value: 'female' },
            { label: 'Other', value: 'other' }
        ]}
          validate={[required]}
        />
        <Field
          name='ward'
          label='Village/Ward'
          validate={[required]}
          component={renderTextInput}
        />
        <Field
          name='tehsil'
          label='Tehsil'
          component={renderTextInput}
        />
        <Field
          name='district'
          label='District'
          component={renderTextInput}
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
        <Heading>
            Symptoms
        </Heading>
        <Field
          name='fever'
          label='Fever'
          component={Dropdown}
          options={[
            { label: 'No', value: '0' },
            { label: 'Yes', value: '1' }
        ]}
        />
        <Field
          name='cough'
          label='Cough'
          maxLength={10}
          options={[
            { label: 'No', value: '0' },
            { label: 'Yes', value: '1' }
        ]}
          component={Dropdown}
        />
        <Field
          name='shortnessOfBreath'
          label='Shortness of breath'
                    options={[
            { label: 'No', value: '0' },
            { label: 'Yes', value: '1' }
        ]}
          
          component={Dropdown}
        />

        <Field
          name='anyOneInFamilyShowingSymptoms'
          label='Anyone In Family Showing Symptoms'
                    options={[
            { label: 'No', value: '0' },
            { label: 'Yes', value: '1' }
        ]}
          component={Dropdown}
        />

<Field
          name='anyOneAround'
          label='Anyone Around Showing Symptoms'
                    options={[
            { label: 'No', value: '0' },
            { label: 'Yes', value: '1' }
        ]}
          component={Dropdown}
        />

<Field
          name='previousHistoryOfDisease'
          label='Previous History Of Disease'
          component={renderTextArea}
        />


        <Field
          name='other_detail'
          label='Other Detail'
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
    borderWidth: 1,
    flex: 1,
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
