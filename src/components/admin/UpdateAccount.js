import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Field, reduxForm } from 'redux-form'
import { required, mobile, email } from '../../validators';
import { renderTextInput, renderCheckBox} from '../renderer';
import {createStackNavigator} from 'react-navigation-stack';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { Icon } from 'react-native-elements';

import { primaryColor, secondaryColor } from '../../themes';
import { Button, Loader } from '../common';
import { updateAccount } from '../../actions/register';
import NotAuthorized from './NotAuthorized';

class UpdateAccount extends Component {

    renderAlert() {
      if (this.props.error) {
        setTimeout(() => {
          Alert.alert('Unable to update.', this.props.error,
          [
             {text: 'OK', onPress: () => null}
          ]);
        }, 100);
      }
      return null;
    }

    renderRegisterButton() {
      if (this.props.submitting) {
        return null;
      }
      return (
        <Button
          color={primaryColor}
          backgroundColor={primaryColor}
          textColor={'white'}
          disabled={this.props.error != null}
          size='medium'
          onPress={this.props.handleSubmit((data, dispatch) => updateAccount(data, dispatch))}
        >Update</Button>
      );
    }

    render() {
      const { error, role, navigation } = this.props;
      if(role != 'Admin') {
        return <NotAuthorized />
      }
      return (
        <KeyboardAwareScrollView
          style={styles.contentContainer}
          keyboardShouldPersistTaps='always'
        >
          <View style={styles.container}>
          <Field
            name='name'
            label="Full Name"
            component={renderTextInput}
            validate={[required]}
          />
          <Field
            name='phone'
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
          
        <Field
          name='admin'
          label='This user is Admin'
          component={renderCheckBox}
        />
        <View>
          <View style={styles.line} />
            <TouchableOpacity>
              <Text style={styles.tAndcText}>
                Please fill above detail for Sign Up.
              </Text>
            </TouchableOpacity>            
            <View>
              <View style={styles.line} />
              
                <View style={{paddingTop: 20}}>
                  {this.renderRegisterButton()}
                </View>
                <View style={styles.line} />
                
              </View>        
              </View>
            </View>
          {/* modal for showing loader */}
          <View style={{ flex: 1 }}>
            { this.renderAlert() }
             <Loader visible={this.props.submitting} />
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
    paddingVertical: 15,
    fontSize: 12
  },
  tAndcForAdminText: {
    color: 'blue',
    alignSelf: 'center',
    paddingLeft: 5,
    paddingBottom: 5,
    fontSize: 16
  },
  line: {
    borderColor: 'gray',
    borderWidth: 0.4,
    marginLeft: -10,
    marginRight: -10,
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
  },
  icon: {
    width: 24,
    height: 24,
  },
});

const updateAccountForm = reduxForm({ form: 'updateFormAdmin', destroyOnUnmount: true })(UpdateAccount);

const mapStateToProps = (state) => {
  const { loading, status }  = state.data.register;
  const { user } = state.services.session; 
  let role = "User";
  if(user && user.roles.length > 1) {
    role = "Admin";
  }
  return { loading, role, status };
};

const updateAccountScreen = connect(mapStateToProps)(updateAccountForm);

export default createStackNavigator({
  'UpdateAccountScreen': {
    screen: updateAccountScreen,
    navigationOptions: ({navigation}) => ({    
      title: 'Update Existing Account',
      headerLeft: 
        <TouchableWithoutFeedback
          onPress={ () => navigation.toggleDrawer()}
      >
        <View style={{padding: 10}}><Icon type='ionicon' name="ios-menu" size={35} /></View>
      </TouchableWithoutFeedback>}
      )
  }
},
{
  initialRouteName: 'UpdateAccountScreen'
}
)

