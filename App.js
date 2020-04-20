import React, {Component} from 'react';
import store from './Store';
import { Provider } from 'react-redux';
import AppLoadingScreen from './src/components/AppLoading';
import AdminNavigator from './src/components/admin/Drawer';
import AuthNavigator from './src/components/Auth';
import axios from 'axios';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import NavigatorService from './src/services/navigator';
class App extends Component {

  constructor() {
    super();
    axios.defaults.baseURL = 'https://ancient-dawn-45667.herokuapp.com';
    axios.defaults.headers['Content-Type'] = 'application/json';
    // Will invalidate all log statement in production
    if (!__DEV__) {
      console.log = () => {};
    }
  }

  render() {
    return (
      <Provider store={store}>
        <AppContainer
          ref={navigatorRef => { NavigatorService.setTopLevelNavigator(navigatorRef);}}
        />
      </Provider>
    );
  }  
}

const RouteConfigs = {
  Auth: AuthNavigator, 
  Admin: AdminNavigator,
  AppLoading: AppLoadingScreen
}
const NavigatorConfig = {
  initialRouteName: 'AppLoading'
}

const InitNavigator = createSwitchNavigator(RouteConfigs, NavigatorConfig)
const AppContainer = createAppContainer(InitNavigator);
export default App;


