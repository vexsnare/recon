import React, {Component} from 'react';
import { View, StyleSheet, Button, Image, SafeAreaView, ScrollView } from 'react-native';
import { createDrawerNavigator, DrawerActions, DrawerItems } from 'react-navigation-drawer';
import CreateUser from './CreateUser';
import CreateAdmin from './CreateAdmin';
import Profile from './Profile';
import Records from './Records';
import { primaryColor } from '../../themes';

class RegisterUser extends Component {
  static navigationOptions = {
    drawerLabel: "RegisterUser..",
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('./../../../assets/icon.png')}
        style={[styles.icon, { tintColor: tintColor }]}
      />
    )
  }
  render() {
    return <CreateUser />
  }
}

class RegisterAdmin extends Component {
  static navigationOptions = {
    drawerLabel: "RegisterAdmin..",
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('./../../../assets/icon.png')}
        style={[styles.icon, { tintColor: tintColor }]}
      />
    ),
    
  }
  render() {
    return <CreateAdmin />
  }
}

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});

export default createDrawerNavigator({
  Records: {
    screen:Records,
    navigationOptions: ({ navigation }) => ({
      title: 'Profile',
    }), 
  },
  Profile: Profile,
  RegisterUser: RegisterUser,
  RegisterAdmin: RegisterAdmin,
}, {
  headerMode: 'screen',
  initialRouteName: 'Records',
  drawerPosition: 'Left',
  contentOptions: {
    activeTintColor: primaryColor,
    itemsContainerStyle: {
      marginVertical: 0,
      flex: 1,
      flexDirection: 'column'
    },
    iconContainerStyle: {
      opacity: 1
    }
  }
}
);


