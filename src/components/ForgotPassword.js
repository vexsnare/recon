import React, { Component } from 'react';
import { required, email } from '../validators';
import { Field, reduxForm } from 'redux-form';
import { phonecall } from 'react-native-communications';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableWithoutFeedback,
  TouchableOpacity
} from 'react-native';
import { primaryColor, inputErrorTextSize } from '../themes';
import {  Button } from './common';
import { renderTextInput} from './renderer';

class ForgotPassword extends Component {
  renderAlert() {
    if (this.props.error) {
      setTimeout(() => {
        Alert.alert('Error', this.props.error,
        [
           {text: 'OK', onPress: null }
        ]
      );
      }, 100);
    }
    return null;
  }
  renderContactInfo() {
    return (
      <View style={{marginTop: 20, paddingBottom: 10, backgroundColor: '#f1f1f1'}}>
        <View style={styles.line} />
          <Text>
            You can also contact us directly.
          </Text>
        <View>
          <Text><Text style={styles.boldText}>Email:</Text>contact@demo.co.in</Text>
        </View>
        <TouchableWithoutFeedback onPress={() => phonecall('+11111111', true)} style={{flex: 1, justifyContent: 'flex-end'}}>
          <View>
            <Text style={{marginLeft: 5}}><Text style={styles.boldText}>Phone:</Text>+91-11111111</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
  renderButton() {
    if (this.props.submitting) {
      return null;
    }
    return (
      <Button
        color={primaryColor}
        backgroundColor={primaryColor}
        textColor={'white'}
        size='small'
        onPress={null}
      >Submit</Button>
    );

  }

  render() {
    return (
        <View style={styles.globalContainer}>
        <ScrollView style={styles.container}>
          <View style={{paddingTop: 10, flexDirection: 'column', justifyContent: 'space-around'}}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <View>
                <Text style={{color: primaryColor}}>Back</Text>
              </View>
            </TouchableOpacity>
            <Text style={styles.mainText}>Forgot Password</Text>
          </View>
          <Field
            name='login'
            label="Email"
            component={renderTextInput}
            validate={[required, email]}
          />
          <View>
            <Text style={styles.instructionText}>
              We would send you a link to reset your password.
            </Text>
          </View>
          <View style={{paddingTop: 10}}>
            <View style={styles.line} />
            <View style={{paddingTop: 10, alignSelf: 'flex-end'}}>
              {this.renderButton()}
            </View>
          </View>
          { this.renderAlert() }
          { this.renderContactInfo()}
          </ScrollView>
          </View>
    );
  }
}

const forgotPasswordForm = reduxForm({ form: 'forgotPasswordForm',  destroyOnUnmount: true })(ForgotPassword);

export default forgotPasswordForm;

const styles = StyleSheet.create({
  mainText: {
    fontSize: 26,
    fontWeight: 'normal',
    paddingVertical: 15
  },
  globalContainer: {
    flex: 1,
    backgroundColor: 'white'
  },
  container: {
    paddingTop: 20,
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
  },
  instructionText: {
    color: 'gray',
    alignSelf: 'center',
    paddingLeft: 5,
    paddingBottom: 5,
    fontSize: 12
  },
  boldText: {
    fontWeight: '500'
  },
  line: {
    borderColor: 'gray',
    borderWidth: 0.4,
    marginLeft: -10,
    marginRight: -10
  },
  error: {
    color: 'red',
    fontSize: inputErrorTextSize
  }
});
