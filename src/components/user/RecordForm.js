import React, { Component } from 'react';
import _ from 'lodash';
import { Field } from 'redux-form'
import { View, StyleSheet, Platform, Text } from 'react-native';
import { secondaryColor, inputErrorTextSize, inputTextSize } from '../../themes';
import { Heading} from '../common';
import { required, mobile } from '../../validators';
import { renderTextInput } from '../renderer';
import { CheckBox } from 'react-native-elements'


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
          keyboardType='numeric'
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
