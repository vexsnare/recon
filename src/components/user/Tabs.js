import {ProfileScreen} from './../shared/Profile';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { primaryColor} from '../../themes';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import RecordListScreen from './RecordList';
import RecordCreateScreen from './RecordCreate';
import {
  View,
  TouchableWithoutFeedback
} from 'react-native';

const RecordStackNavigator = createStackNavigator({
  "Home": {
    screen: RecordListScreen,
    title: 'Home'
  },
  "RecordCreate": {
    screen: RecordCreateScreen,
    navigationOptions: {
      title: 'Create'
    }
  }
},
{
  initialRouteName: "Home"
}
);

const ProfileStackNavigator = createStackNavigator({
  "Profile": {
    screen: ProfileScreen,
    title: 'Profile'
  }
},
{
  initialRouteName: "Profile"
}
);

const TabScreenNavigator = createBottomTabNavigator(
  {
    home: {
      screen: RecordStackNavigator,
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: ({ tintColor, focused }) => (
          <Ionicons
            name={focused ? 'ios-home' : 'ios-home'}
            size={26}
            style={{ color: tintColor }}
          />
        ),
      },
    },
    profile: {
      screen: ProfileStackNavigator,
      navigationOptions: {
        tabBarLabel: 'Profile',
        tabBarIcon: ({ tintColor, focused }) => (
          <Ionicons
            name={focused ? 'ios-contact' : 'ios-contact'}
            size={26}
            style={{ color: tintColor }}
          />
        ),
      },
    },
  },
  {
    
  activeTintColor: primaryColor,
    labelStyle: {
      fontSize: 12,
    },
    style: {
      backgroundColor: 'blue',
    },
    headerMode: 'screen'
  }
);

export default TabScreenNavigator;
