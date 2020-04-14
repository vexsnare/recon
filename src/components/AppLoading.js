import React from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    StyleSheet,
    View,
} from 'react-native';
import {connect} from 'react-redux';

class AppLoadingScreen extends React.Component {
  componentDidMount() {
    const { isLogin, role } = this.props;
    this.props.navigation.navigate(isLogin ? ( role === "Admin" ? 'Admin' : 'User' ): 'Auth');
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    let userToken = await AsyncStorage.getItem('userToken');
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? ( userType === "admin" ? 'Admin' : 'User' ): 'Auth');
  };

    // Render any loading content that you like here
    render() {
        return ( <
            View >
            <
            ActivityIndicator / >
            <
            StatusBar barStyle = "default" / >
            <
            /View>
        );
    }
}
const mapStateToProps = (state) => {
  const { isLogin, user } = state.services.session; 
  let role = "User";
  if(isLogin && user.roles.length > 1) {
    role = "Admin";
  }
  return {role, isLogin};
}

export default connect(mapStateToProps)(AppLoadingScreen);

