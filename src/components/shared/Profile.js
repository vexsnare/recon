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

class Profile extends React.Component {

  static navigationOptions  = ({ navigation }) => ({
    drawerLabel: "Profile",
    headerLeft: <TouchableWithoutFeedback
                     onPress={ () => navigation.toggleDrawer()}
                  >
                   <View style={{padding: 10}}><Icon type='ionicon' name="ios-menu" size={35} /></View>
                 </TouchableWithoutFeedback>,
  });

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
  icon: {
    width: 24,
    height: 24,
  },
});
const mapStateToProps = (state) => {
  const { user } = state.services.session;
  return { user };
}

const ProfileScreen = connect(mapStateToProps)(Profile);

export default createStackNavigator({
  'Profile': ProfileScreen
},
{
  initialRouteName: 'Profile'
}
)


