import React, {Component} from 'react';
import { View, StyleSheet, Button, Image, SafeAreaView, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { createDrawerNavigator, DrawerActions, DrawerItems } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import { Icon } from 'react-native-elements';
import CreateUser from './CreateUser';
import CreateAdmin from './CreateAdmin';
import {ProfileScreen} from '../shared/Profile';
import RecordNavigator from './Records';
import { primaryColor } from '../../themes';


const ProfileStackNav =  createStackNavigator({
  'Profile': {
    screen: ProfileScreen,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: "Profile",
      headerLeft: <TouchableWithoutFeedback
                       onPress={ () => navigation.toggleDrawer()}
                    >
                     <View style={{padding: 10}}><Icon type='ionicon' name="ios-menu" size={35} /></View>
                   </TouchableWithoutFeedback>
    })
  }}, 
  {
    initialRouteName: 'Profile'
  }
)

export default createDrawerNavigator({
  "Records": {
    screen: RecordNavigator,
    navigationOptions: ({navigation}) => ({
      drawerLabel: 'Records.',
      drawerIcon: <Icon type='ionicon' name="ios-journal" />
    })
  },
  "Profile": {
    screen: ProfileStackNav,
    navigationOptions: ({navigation}) => ({
      drawerLabel: 'Profile.',
      drawerIcon: <Icon type='ionicon' name="ios-person" />
    })
  },
  "RegisterUser": { 
    screen: CreateUser,
    navigationOptions: ({navigation}) => ({
      drawerLabel: 'Register User',
      drawerIcon: <Icon type='ionicon' name="ios-body" />
    })
  },
  "RegisterAdmin": {
    screen: CreateAdmin,
    navigationOptions: ({navigation}) => ({
      drawerLabel: 'Register Admin',
      drawerIcon: <Icon type='ionicon' name="ios-build" />
    })
  }
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
