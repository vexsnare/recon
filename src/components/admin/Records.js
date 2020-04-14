import React, {Component} from 'react';
import {Image, Button, StyleSheet, View, FlatList} from 'react-native';
import { ListItem, Icon } from 'react-native-elements'
import { createStackNavigator } from 'react-navigation-stack';
import TouchableScale from 'react-native-touchable-scale';
import { primaryColor } from '../../themes';
import {connect} from 'react-redux';
import { getAllRecords } from '../../actions/admin/records';
import RecordScreen from './Record'

class RecordList extends Component {

  componentDidMount() {
    getAllRecords();
  }

  static navigationOptions = {
    drawerLabel: "Records",
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('./../../../assets/icon.png')}
        style={[styles.icon, { tintColor: tintColor }]}
      />
    ),
  };

  keyExtractor = (item, index) => item.id;

  renderItem = ({ item }) => (
      <ListItem
      leftIcon={
      <Icon 
        name='chevron-right'
        type='evilicon'
        size={40}
        record={item}
        color={'#517fa4'}
        chevron
      />
      }
      onPress={() => this.props.navigation.navigate('Record', {record: item})}
      title={item.name}
      subtitle={item.mobileNumber + " | " + item.district}
      bottomDivider
    />
  )

  render() {
    let list = this.props.records;
    
      return (
        <FlatList
          keyExtractor={this.keyExtractor}
          data={list}
          renderItem={this.renderItem}
        />
      );
  }
}

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
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