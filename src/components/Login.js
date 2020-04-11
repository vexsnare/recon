import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { renderTextInput} from './renderer';
import { required } from '../validators';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Alert,
  TouchableWithoutFeedback,
  Image
} from 'react-native';
import { primaryColor } from '../themes';
import { Button } from './common';
import {
  loginUser,
} from '../actions/login';

class Login extends Component {

  componentDidMount() {
    this.props.reset();
  }
  renderAlert() {
    if (this.props.error) {
      setTimeout(() => {
        Alert.alert('Failed to Authenticate.', this.props.error,
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
        onPress={this.props.handleSubmit((data, dispatch) => loginUser(data, dispatch))}
      >Log In</Button>
    );
  }

  goRegister() {
    this.props.navigation.navigate('register')
  }

  goForgetPassword() {
    this.props.navigation.navigate('forgotPassword');
  }


  render() {
    console.log('Login Props = ', this.props);
    return (
        <ScrollView
          style={styles.container}
          keyboardShouldPersistTaps='always'
        >
          <View style={styles.headerContainer}>
            <View style={styles.logoContainerStyle}>
              <Image source={require('../../assets/icon.png')} style={{ width: 44, height: 44 }} />
            </View>
            <TouchableWithoutFeedback onPress={() => this.props.navigation.goBack()}>
              <View>
                <Text style={{color: primaryColor, margin: 20}}>Back</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={{paddingBottom: 25, paddingTop: 10}}>
            <Text style={styles.mainText}>Login</Text>
          </View>
          <Field
            name='login'
            label="Phone"
            component={renderTextInput}
            validate={[required]}
          />
          <Field
            name='password'
            label="Password"
            secureTextEntry
            component={renderTextInput}
            validate={[required]}
          />
          <View style={styles.navigateBlock}>
            <TouchableWithoutFeedback onPress={this.goRegister.bind(this)}>
              <View>
                <Text style={styles.linkText} >Sign Up</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={this.goForgetPassword.bind(this)}>
              <View>
                <Text style={styles.linkText} >
                Forgot password?
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={{paddingTop: 10}}>
            <View style={styles.line} />
            <View style={{paddingTop: 10, alignSelf: 'flex-end'}}>
              {this.renderButton()}
            </View>
          </View>
              { this.renderAlert() }
              {/* modal for showing loader */}
              <Spinner visible={this.props.submitting} overlayColor={primaryColor} />
        </ScrollView>
    );
  }
}


const loginForm = reduxForm({ form: 'loginForm',  destroyOnUnmount: true })(Login);

export default loginForm;

const styles = StyleSheet.create({
  mainText: {
    fontSize: 26,
    fontWeight: 'normal',
  },
  container: {
    paddingTop: 20,
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#ffffff'
  },
  linkText: {
    margin: 10,
    alignSelf: 'center',
    color: primaryColor,
  },
  navigateBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: -5,
    marginBottom: 5
  },
  logoContainerStyle: {
    paddingTop: 10,
    paddingLeft: 2
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  line: {
    borderColor: 'gray',
    borderWidth: 0.4,
    marginLeft: -10,
    marginRight: -10,
  },
});
