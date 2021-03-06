
import React from 'react';
import { getNested } from '../utils';
import {
  ActivityIndicator,
  StatusBar,
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
        if (isHydrated || isLogin) {
          this.autoLogin();
          unsubscribe();
        }
      }, (error) => {
        unsubscribe();
      });
    }
  }

  autoLogin() {
    const { isLogin, tokens } = this.props;
    this.props.navigation.navigate(isLogin ? 'Admin' : 'Auth');
    if(isLogin) {
      axios.defaults.headers['Authorization'] = "Bearer " + tokens;
    }
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
  const { isLogin, tokens } = state.services.session; 
  return {isLogin, tokens};
}

export default connect(mapStateToProps)(AppLoadingScreen);

