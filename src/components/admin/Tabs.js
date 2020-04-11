import Profile from './Profile';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { primaryColor} from '../../themes';
import Records from './Records.js';
import { createBottomTabNavigator } from 'react-navigation-tabs';


const TabScreenNavigator = createBottomTabNavigator(
  {
    home: {
      screen: Profile,
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
      screen: Records,
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
  }
);

export default TabScreenNavigator;
