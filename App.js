import React, {Component} from 'react';
import store from './Store';
import { Provider } from 'react-redux';
import AppLoadingScreen from './src/components/AppLoading';
import UserNavigator from './src/components/user/Tabs';
import AdminNavigator from './src/components/admin/Drawer';
import AuthNavigator from './src/components/Auth';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

class App extends Component {
  state = { initialScene: null };

  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }  
}

const RouteConfigs = {
  Auth: AuthNavigator,
  User: UserNavigator, 
  Admin: AdminNavigator,
  AppLoading: AppLoadingScreen
}
const NavigatorConfig = {
  initialRouteName: 'AppLoading'
}

const InitNavigator = createSwitchNavigator(RouteConfigs, NavigatorConfig)
const AppContainer = createAppContainer(InitNavigator);
export default App;


