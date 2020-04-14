import React, {Component} from 'react';
import { View, StyleSheet, Button, Image, SafeAreaView, ScrollView } from 'react-native';
import { createDrawerNavigator, DrawerActions, DrawerItems } from 'react-navigation-drawer';
import CreateUser from './CreateUser';
import CreateAdmin from './CreateAdmin';
import Profile from '../shared/Profile';
import RecordNavigator from './Records';
import { primaryColor } from '../../themes';

export default createDrawerNavigator({
  "Records": {
    screen: RecordNavigator,
  },
  "Profile": {
    screen: Profile,
  },
  "RegisterUser": { 
    screen: CreateUser,
  },
  "RegisterAdmin": {
    screen: CreateAdmin
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
