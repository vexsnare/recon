import React, {Component} from 'react';
import {Image, Button,TouchableHighlight, Text, StyleSheet, View, FlatList, TouchableWithoutFeedback} from 'react-native';
import { ListItem, Icon} from 'react-native-elements'
import { createStackNavigator } from 'react-navigation-stack';
import TouchableScale from 'react-native-touchable-scale';
import { primaryColor } from '../../themes';
import {connect} from 'react-redux';
import { getAllRecords } from '../../actions/admin/records';
import RecordScreen from './Record'
import { Card, Wait } from '../common';
import { phonecall } from 'react-native-communications';
import moment from 'moment';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

class RecordList extends Component {

  componentDidMount() {
    getAllRecords();
  }

  static navigationOptions  = ({ navigation }) => ({
    drawerLabel: "Records",
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('./../../../assets/icon.png')}
        style={[styles.icon, { tintColor: tintColor }]}
      />
    ),
    headerLeft: <TouchableWithoutFeedback
                     onPress={ () => navigation.toggleDrawer()}
                  >
                   <View style={{padding: 10}}><Icon type='ionicon' name="ios-menu" size={35} /></View>
                 </TouchableWithoutFeedback>,
  });

  keyExtractor = (item, index) => item.id;

  onRowPress(item) {
    this.props.navigation.navigate('RecordViewScreen', {record: item})
  }
  renderCardItem(label, text, phone) {
    return (
        <View style={{flex: 1, flexDirection: 'row', paddingVertical: 3, backgroundColor: 'white'}}>
         <View style={{flex: 1, flexDirection: 'row'}}>
            <Text style={{color: 'gray', fontSize: 16 }}>
              {label}
            </Text>
            <Text style={{paddingLeft: 10, fontSize: 16, color: 'black'}}>
              {text}
            </Text>
          </View>
          {phone &&
            <TouchableWithoutFeedback onPress={()=> phonecall(phone, true)} style={{flex: 1, justifyContent: 'flex-end'}}>
              <View>
                <Icon name="phone" size={20} color={primaryColor} style={{paddingLeft: 10, marginVertical: -2}} />
              </View>
            </TouchableWithoutFeedback>
          }
        </View>
    );
  }

  renderListItem = ({ item })=>  {
    const { name, mobileNumber, distric, age, gender, date } = item;
    return (
      <View>
        <Card>
          <View style={styles.heading}>
            <Text style={styles.title}>
              {name}
            </Text>
          </View>
          <TouchableWithoutFeedback onPress={() => this.onRowPress(item)}>
            <View style={{paddingHorizontal: 10, backgroundColor: 'white'}}>
            {this.renderCardItem('Age', age)}
            {this.renderCardItem('Gender', gender)}
            {this.renderCardItem('Disctric', distric)}
            {this.renderCardItem('Phone Number', mobileNumber, true)}
            {this.renderCardItem('Date', moment(new Date()).format('DD MMM YYYY'))}
            </View>
          </TouchableWithoutFeedback>
          <TouchableHighlight onPress={() => this.onRowPress(item)}>
            <View style={styles.bottom}>
              <View style={{flexDirection: 'row', paddingVertical: 15}}>
                <MaterialIcons name="arrow-forward" size={22} />
                <Text style={{fontSize: 16, fontWeight: '500'}}>
                  View Detail
                </Text>
              </View>
            </View>
          </TouchableHighlight>
        </Card>
      </View>
    );
  };

  render() {
    let list = this.props.records;
    if(this.props.loading) {
      return <Wait />;
    }
      return (
        <FlatList
          keyExtractor={this.keyExtractor}
          data={list}
          renderItem={this.renderListItem}
        />
      );
  }
}

const styles = StyleSheet.create({
  btnModal: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 50,
    height: 50,
  },
  boldText: {
    fontWeight: '500'
  },
    title: {
    fontSize: 18,
    paddingLeft: 10,
    padding: 10,
    fontWeight: '500',
    color: primaryColor,

  },
  heading: {
    borderBottomWidth: 1,
    borderColor: '#d2d2d2',
    justifyContent: 'space-between',
  },
  bottom: {
    justifyContent: 'center',
    paddingLeft: 10,
    backgroundColor: 'white',
    backgroundColor: '#fff0e6',
  }
});

const mapStateToProps = (state) => {
  const { records, error, loading } = state.data.admin.records;
  return { records, error, loading };
 };


 const RecordListScreen = connect(mapStateToProps)(RecordList);

 export default createStackNavigator({
   'Record List': RecordListScreen,
   'Record': RecordScreen
 }, {
   initialRouteName: 'Record List'
 }
 )