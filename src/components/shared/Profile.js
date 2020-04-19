import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  StyleSheet,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Alert
} from 'react-native';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/logout';
import { ListItem, Icon } from 'react-native-elements';
import { createStackNavigator } from 'react-navigation-stack';
import { secondaryColor, backgroundColor, touchableColor } from '../../themes';

class Profile extends React.Component {

  logoutPress() {
    logoutUser();
  }
  
  renderConfirmAlert() {
    Alert.alert(
        `Are you sure?`,
        `You want to logout this session`,
        [
          {text: 'Cancel', onPress: this.onDecline.bind(this)},
          {text: 'OK', onPress: this.logoutPress.bind(this)},
        ],
    );
  }
  render() {
    if(!this.props.user) return null;

    const {fullName, mobileNumber, roles} = this.props.user;
    return (
      <ScrollView style={styles.container}>
         <ListItem
           wrapperStyle={{padding:5}}
            hideChevron
            title={fullName}
            leftIcon={{type: 'ionicon', name: 'ios-person'}}
         />

         <ListItem
           wrapperStyle={{padding:5}}
            hideChevron
            title={mobileNumber}
            leftIcon={{type: 'ionicon', name: 'md-phone-portrait'}}
         />

        <ListItem
           wrapperStyle={{padding:5}}
            hideChevron
            title={roles.length > 1 ? "ADMIN USER" : "STANDARD USER"}
            leftIcon={{type: 'ionicon', name: 'ios-key'}}
         />

        <ListItem
          wrapperStyle={{padding:5}}
            hideChevron
           title="Logout"
           containerStyle={{backgroundColor: secondaryColor}}
           leftIcon={{type: 'ionicon', name: 'md-exit'}}
           onPress={() => this.renderConfirmAlert()}
        />
      </ScrollView>
    );
  }

  onDecline() {
  }

}


const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});
const mapStateToProps = (state) => {
  const { user } = state.services.session;
  return { user };
}

export const ProfileScreen = connect(mapStateToProps)(Profile);


