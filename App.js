import React, {Component} from 'react';
import store from './Store';
import { Provider } from 'react-redux';
import Auth from './src/components/Auth';
import Login from './src/components/Login';
import ForgotPassword from './src/components/ForgotPassword';
import UserScreen from './src/components/user/Tabs';
import Register from './src/components/Register';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

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
  auth: {
    screen: Auth,
  },
  login: {
    screen: Login,
  },
  register: {
    screen: Register,
  },
  forgotPassword: {
    screen: ForgotPassword
  },
  userScreen: {
    screen: UserScreen
  }
}
const StackNavigatorConfig = {
  initialRouteName: 'auth',
  headerMode: 'none'
}
const AuthNavigator = createStackNavigator(RouteConfigs, StackNavigatorConfig);
const UserNavigator = createStackNavigator(RouteConfigs, {...StackNavigatorConfig, initialRouteName: 'userScreen'} );
const AdminNavigator = createStackNavigator(RouteConfigs, {...StackNavigatorConfig, initialRouteName: 'adminScreen'} );
const AppContainer = createAppContainer(UserNavigator);
export default App;


