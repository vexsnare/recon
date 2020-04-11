import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, Image, Platform, TouchableWithoutFeedback } from 'react-native';
import { primaryColor } from '../themes';
import {Button} from './common/Button';
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from './Login';
import ForgotPasswordScreen from './ForgotPassword';

class AuthScreen extends Component {

  statusBar() {
    if (Platform.OS === 'android') {
      return (
        <StatusBar
          backgroundColor={primaryColor}
          barStyle='light-content'
        />
      );
    }
    return null;
  }

  render() {
    console.log('Auth, this.props = ', this.props);
    return (
      <View style={styles.globalContainerStyle}>
        {this.statusBar()}
        <View style={styles.containerStyle}>
          <View style={styles.logoContainerStyle}>
            <Image source={require('../../assets/icon.png')} style={{ width: 65, height: 65 }} />
          </View>
          <View style={styles.textContainerStyle}>
            <Text style={styles.textHeadingStyle}>
              Welcome to {'\n'}
              Paryavekshan
            </Text>
            <Text style={styles.textStyle}>
                Collect data from wherever you are.
            </Text>
          </View>
          <View style={styles.buttonContainerStyle}>
            <Button
              backgroundColor='white'
              textColor={primaryColor}
              onPress={() => this.props.navigation.navigate('Login')}
            >
              Log In
            </Button>
          </View>
          <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('register')}>
            <View style={styles.signUpTextStyle}>
              <Text style={{ alignSelf: 'center', color: 'white' }}>
                Don't have an account? Please contact Admin
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );askkcds
  }
}

const styles = StyleSheet.create({
  globalContainerStyle: {
    flex: 1,
    backgroundColor: primaryColor
  },
  containerStyle: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  logoContainerStyle: {
    paddingTop: 50
  },
  signUpTextStyle: {
    height: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textHeadingStyle: {
    fontSize: 30,
    fontWeight: '900',
    color: 'white'
  },
  textStyle: {
    paddingTop: 20,
    paddingBottom: 40,
    fontSize: 20,
    color: 'white',
    fontWeight: '600'
  },
  buttonContainerStyle: {
    flexDirection: 'column',
    marginLeft: 15,
    marginRight: 15,
    justifyContent: 'space-between'
  }
});

export default createStackNavigator(
  {
    Login: LoginScreen,
    Forgot: ForgotPasswordScreen,
    Auth: {
      screen: AuthScreen
    }
  },
  {
    initialRouteName: 'Auth',
    headerMode: 'none'
  }
);
