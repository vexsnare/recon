import React, { Component } from 'react';
import _ from 'lodash';
import { Field } from 'redux-form'
import { View, StyleSheet, Platform, Text } from 'react-native';
import { secondaryColor, inputErrorTextSize, inputTextSize } from '../../themes';
import { Heading, TextInput, Bold } from '../common';
import { required, mobile } from '../../validators';
import { renderTextInput } from '../renderer';
import { CheckBox } from 'react-native-elements'

import RNPickerSelect from 'react-native-picker-select';

export const Dropdown = (props) => {
  const { input, label, options, meta, ...otherProps } = props;
  return (
    <View>
      <Text style={{fontSize: inputTextSize}}>{label}</Text>
      <RNPickerSelect
          onValueChange={input.onChange}
          input={input}
          onFocus={input.onFocus}
          onBlur={input.onBlur}
          autoCorrect={false}
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
        />
        <Field
          name='age'
          label='Age'
          keyboardType='numeric'
          component={renderTextInput}
          keyboardType='numeric'
        />
        <Field
          name='mobileNumber'
          label='Phone Number'
          maxLength={10}
          keyboardType='numeric'
          component={renderTextInput}
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
        />
        <Field
          name='district'
          label='District'
          component={renderTextInput}
        />
        <Field
          name='gender'
          label='Gender'
          component={Dropdown}
          options={[
            { label: 'Male', value: 'M' },
            { label: 'Female', value: 'F' },
            { label: 'Other', value: 'O' }
        ]}
        />
        <Heading>
            Symptoms
        </Heading>
        <Text h2>Fever</Text>
        <View style={{flexDirection: 'row'}}>
          
        <CheckBox
            center
            title='yes'
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
            checked='true'//handle it with state
          />
          <CheckBox
            center
            title='No'
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
            checked='false'//handle it with state
          />
        </View>
        <Text>Cough</Text>
        <View style={{flexDirection: 'row'}}>
          
        <CheckBox
            center
            title='yes'
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
            checked='true' //handle it with state 
          />
          <CheckBox
            center
            title='No'
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
            checked='false'//handle it with state
          />
        </View>
        
        <Text h2>Shortness Of Breath</Text>
        <View style={{flexDirection: 'row'}}>
          
        <CheckBox
            center
            title='yes'
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
            checked='true' //handle it with state 
          />
          <CheckBox
            center
            title='No'
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
            checked='false'//handle it with state
          />
        </View>

        <Field
          name='anyOneInFamilyShowingSymptoms'
          label='Anyone In Family Showing Symptoms'
          options={[{label: 'No', value: 0},{label: 'Yes', value: 1}]}
          component={Dropdown}
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
