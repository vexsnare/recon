import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableHighlight,
  Alert
} from 'react-native';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/logout';
import { Entypo } from 'react-native-vector-icons/Entypo';
import { ListItem } from 'react-native-elements';

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
            leftIcon={{type: 'ionicon', name: 'md-phone-portrait'}}
         />

        <ListItem
          wrapperStyle={{padding:5}}
            hideChevron
           title="Logout"
           containerStyle={{backgroundColor: '#ff7e75'}}
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
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
});
const mapStateToProps = (state) => {
  const { user } = state.services.session;
  return { user };
}

export default connect(mapStateToProps)(Profile);

