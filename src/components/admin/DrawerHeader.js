import React, { Component } from 'react'
import { Text, View, Image } from 'react-native'
import { primaryColor} from './../../themes';
export default class DrawerHeader extends Component {
    render() {
        return (
            <View style={{flex: 1, alignItems: 'center', backgroundColor: primaryColor}}>
                <Image source={require('../../../assets/icon.png')} />
            </View>
        )
    }
}
