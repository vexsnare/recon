import React, { Component } from 'react'
import { Text, View, Image } from 'react-native'
import { h1 } from 'react-native-elements';
import moduleName from 'expo/AppEntry'
export default class DrawerHeader extends Component {
    render() {
        return (
            <View style={{flexGrow: 1, flex: 1, flexWrap: true, backgroundColor: 'yellow', flexDirection: 'column', alignItems:'center'}}>
                <Text style={{fontSize: 12, paddingVertical: 20}}>All rights reserved to Paryavekshan.</Text>
            </View>
        )
    }
}
