import React, { Component } from 'react';
import _ from 'lodash';
import { Field } from 'redux-form'
import { View, StyleSheet, Platform } from 'react-native';
import { secondaryColor, inputErrorTextSize, inputTextSize } from '../../themes';
import { Heading} from '../common';
import { required, mobile } from '../../validators';
import { renderTextInput } from '../renderer';


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
          name='village'
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
          name='number'
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
          keyboardType='numeric'
          component={renderTextInput}
        />
        <Field
          name='cough'
          label='Cough'
          maxLength={10}
          keyboardType='numeric'
          component={renderTextInput}
        />
        <Field
          name='shortness_of_breath'
          label='Shortness of breath'
          maxLength={10}
          keyboardType='numeric'
          component={renderTextInput}
        />

        <Field
          name='family_member_positive'
          label='Family member positive'
          maxLength={10}
          keyboardType='numeric'
          component={renderTextInput}
        />

        <Field
          name='other_detail'
          label='Other Detail'
          maxLength={10}
          keyboardType='numeric'
          component={renderTextInput}
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
