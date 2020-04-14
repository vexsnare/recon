import React from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    StyleSheet,
    View,
} from 'react-native';

class AppLoadingScreen extends React.Component {
    componentDidMount() {
        this._bootstrapAsync();
    }

    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async() => {
        let userToken = '323'; //await AsyncStorage.getItem('userToken');
        let userType = "user";
        // This will switch to the App screen or Auth screen and this loading
        // screen will be unmounted and thrown away.
        this.props.navigation.navigate(userToken ? (userType === "admin" ? 'Admin' : 'User') : 'Auth');
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
export default AppLoadingScreen;