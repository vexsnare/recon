import React, { Component } from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import { Field, reduxForm } from 'redux-form'
import { required, mobile, email } from '../validators';
import { renderTextInput} from './renderer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import {
  View,
  Text,
  StyleSheet,
  Alert,
  Image,
  TouchableOpacity
} from 'react-native';

import { primaryColor } from '../themes';
import { Button } from './common';
import { registerUser } from '../actions/register';

class Register extends Component {

    componentDidMount() {
      this.props.reset();
    }

    renderAlert() {
      if (this.props.error) {
        setTimeout(() => {
          Alert.alert('Unable to Register.', this.props.error,
          [
             {text: 'OK', onPress: () => null}
          ]);
        }, 100);
      }
      return null;
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
          disabled={this.props.error != null}
          size='small'
          onPress={this.props.handleSubmit((data, dispatch) => registerUser(data, dispatch))}
        >Sign Up</Button>
      );
    }

    render() {
      const { error, navigation } = this.props;
      return (
        <KeyboardAwareScrollView
          style={styles.contentContainer}
          keyboardShouldPersistTaps='always'
        >
          <View style={styles.container}>
          <View style={styles.headerContainer}>
            <View style={styles.logoContainerStyle}>
              <Image source={require('../../assets/icon.png')} style={{ width: 44, height: 44 }} />
            </View>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <View>
                <Text style={{color: primaryColor, margin: 20}}>Back</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{paddingBottom: 25, paddingTop: 10}}>
            <Text style={styles.mainText}>Register</Text>
          </View>
          <Field
            name='name'
            label="Full Name"
            component={renderTextInput}
            validate={[required]}
          />
          <Field
            name='contact_number'
            label='Mobile'
            maxLength={10}
            keyboardType='numeric'
            component={renderTextInput}
            validate={[required, mobile]}
          />
          <Field
            name='password'
            label="Password"
            secureTextEntry
            component={renderTextInput}
            validate={[required]}
          />
            <TouchableOpacity onPress={() => this.props.navigation.navigate('legals')}>
              <Text style={styles.tAndcText}>
                Please fill above detail for Sign Up
              </Text>
            </TouchableOpacity>
            <View style={{paddingTop: 10}}>
              <View style={styles.line} />
                <View style={{paddingTop: 10, alignSelf: 'flex-end'}}>
                  {this.renderButton()}
                </View>
              </View>
            </View>
          {/* modal for showing loader */}
          <View style={{ flex: 1 }}>
            { this.renderAlert() }
             <Spinner visible={this.props.submitting} overlayColor={primaryColor} />
          </View>
        </KeyboardAwareScrollView>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10
  },
  tAndcText: {
    color: 'gray',
    alignSelf: 'center',
    paddingLeft: 5,
    paddingBottom: 5,
    fontSize: 12
  },
  line: {
    borderColor: 'gray',
    borderWidth: 0.4,
    marginLeft: -10,
    marginRight: -10
  },
  button: {
    backgroundColor: primaryColor,
    alignSelf: 'flex-end',
    marginTop: 10,
    paddingLeft: 20,
    paddingRight: 20
  },
  logoContainerStyle: {
    paddingTop: 10,
    paddingLeft: 2
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  mainText: {
    fontSize: 26,
    fontWeight: 'normal'
  },
  contentContainer: {
    paddingVertical: 20,
    backgroundColor: '#ffffff',
  }
});

const registerForm = reduxForm({ form: 'signupForm', destroyOnUnmount: true })(Register);

export default registerForm;