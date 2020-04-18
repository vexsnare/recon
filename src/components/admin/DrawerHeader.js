import React, { Component } from 'react'
import { Text, View, Image } from 'react-native'
import { h1 } from 'react-native-elements';
import moduleName from '../../../'
export default class DrawerHeader extends Component {
    render() {
        return (
            <View style={{flex: 1, alignItems: 'center'}}>
                <Image source={require('../../../assets/icon.png')} />
            </View>
        )
    }
}
