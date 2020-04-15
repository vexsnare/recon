import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import {Divider} from 'react-native-elements'
import {Card, CardHeading, CardSection, Container, TextInput } from './../common';

export default class Record extends Component {

    display(key, value) {
        return (
            <View>
            <View style={{margin: 10, flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{fontSize: 20, flex: 1}}>
                    {key}
                </Text>
                <Text style={{fontSize: 20, flex: 2}}>
                    {typeof value ==="boolean" ? (value? "YES": "NO") : value}
                </Text>
            </View>
                <View style={{borderWidth: 0.5}}></View>
            </View>
        );
    }

    render() {
        const record = this.props.navigation.getParam("record", "NO RECORD");
        return (
            <Container>
                {this.display("Full Name", record.name)}
                {this.display("Phone", record.mobileNumber)}
                {this.display("Age", record.age)}
                {this.display("Gender", record.gender)}
                {this.display("Ward", record.ward)}
                {this.display("Tehsil", record.tehsil)}
                {this.display("District", record.district)}
                {this.display("Cough", record.cough)}
                {this.display("Shortness Of Breath", record.shortnessOfBreath)}
                {this.display("Anyone In Family Showing Symptoms", record.anyOneInFamilyShowingSymptoms)}
                {this.display("Anyone Around", record.anyOneAround)}
                {this.display("Previous History Of Disease", record.previousHistoryOfDisease)}
                {this.display("OtherDetails", record.otherDetails)}

            </Container>
        )
    }
}


const styles = StyleSheet.create({
    icon: {
      width: 24,
      height: 24,
    },

});
