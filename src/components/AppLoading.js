
import React from 'react';
import { getNested } from '../utils';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {connect} from 'react-redux';
import axios from 'axios';
import {store } from '../../Store';

class AppLoadingScreen extends React.Component {
  componentDidMount() {
    let isHydrated = getNested(store.getState(), 'services.persist.isHydrated');
    let isLogin = getNested(store.getState(), 'services.session.isLogin');
    if (isHydrated || isLogin) {
      this.autoLogin();
    } else {
      const unsubscribe = store.subscribe(() => {
        isHydrated = getNested(store.getState(), 'services.persist.isHydrated');
        if (isHydrated) {
          this.autoLogin();
          unsubscribe();
        }
      }, (error) => {
        unsubscribe();
      });
    }
  }

  autoLogin() {
    const { isLogin, role, tokens } = this.props;
    if(isLogin) {
      axios.defaults.headers['Authorization'] = "Bearer " + tokens;
      this.props.navigation.navigate(role === "Admin" ? 'Admin' : 'User');
    } else this.props.navigation.navigate('Auth');
  }

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  const { isLogin, user, tokens } = state.services.session; 
  let role = "User";
  if(isLogin && user.roles.length > 1) {
    role = "Admin";
  }
  return {role, isLogin, tokens};
}

export default connect(mapStateToProps)(AppLoadingScreen);

