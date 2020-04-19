import React, { Component } from 'react';
import { required, mobile } from '../validators';
import { Field, reduxForm } from 'redux-form';
import { Linking } from 'expo';
import { connect } from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity
} from 'react-native';
import { primaryColor, inputErrorTextSize } from '../themes';
import {  Button, Loader } from './common';
import { renderTextInput} from './renderer';
import {Icon} from 'react-native-elements'
import { forgotPassword } from '../actions/forgot_password/forgotPasswordAction'

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
  renderContactInfo(phone) {
    if(!phone) {
      return null;
    }
    return (

      <View style={{marginTop: 20, padding: 10, backgroundColor: '#f1f1f1'}}>
        <View style={styles.line} />
          <Text style={{fontSize: 20, paddingVertical: 10}}>
            Please call this number directly and ask them to reset your password.
          </Text>
        <TouchableWithoutFeedback onPress={() => Linking.openURL("tel:+91"+phone)} style={{flex: 1, justifyContent: 'flex-end'}}>
          <View style={{flex: 3, flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.boldText}>Phone:</Text><Text style={{fontSize: 20}}>+91-{phone}</Text>
                <Icon name="phone" size={25} color={primaryColor} style={{paddingLeft: 10, marginVertical: -2}} />
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
        onPress={this.props.handleSubmit((data, dispatch) => forgotPassword(data, dispatch))}
      >Submit</Button>
    );

  }

  render() {
    const { myAdmin } = this.props;
    return (
      <ScrollView>
        <View style={styles.globalContainer}>
       <View style={styles.containerStyle}>
        <View style={styles.logoContainerStyle}>
          <Image source={require('../../assets/icon.png')} style={{ width: 64, height: 64 }} />
        </View>
        <TouchableWithoutFeedback onPress={() => this.props.navigation.goBack()}>
          <View>
            <Text style={{color: primaryColor, margin: 20}}>Back</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
        <Loader visible={this.props.submitting} />
          <View style={{paddingTop: 10, flexDirection: 'column', justifyContent: 'space-around'}}>
            <Text style={styles.mainText}>Forgot Password</Text>
          </View>
          <Field
            name='username'
            label="Your mobile number"
            component={renderTextInput}
            validate={[required]}
          />
          <View>
            <Text style={styles.instructionText}>
              We would fetch your admin detail.
            </Text>
          </View>
          <View style={{paddingTop: 10}}>
            <View style={styles.line} />
            <View style={{paddingTop: 10, alignSelf: 'flex-end'}}>
              {this.renderButton()}
            </View>
          </View>
          { this.renderAlert() }
          { this.renderContactInfo(myAdmin)}
          
          </View>
          </ScrollView>
    );
  }
}

const forgotPasswordForm = reduxForm({ form: 'forgotPasswordForm',  destroyOnUnmount: true })(ForgotPassword);

const mapStateToProps = (state) => {
  const { myAdmin } = state.services.session;
  return { myAdmin };
};

export default connect(mapStateToProps)(forgotPasswordForm);

const styles = StyleSheet.create({
  mainText: {
    fontSize: 26,
    fontWeight: 'normal',
    paddingVertical: 15
  },
  globalContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white'
  },
  containerStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
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
    fontSize: 20
  },
  textHeadingStyle: {
    fontSize: 30,
    fontWeight: '900',
    color: 'white'
  },
  logoContainerStyle: {
    paddingTop: 20
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
