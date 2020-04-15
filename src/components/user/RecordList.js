import React, { Component } from 'react';
import _ from 'lodash';
import {
  StyleSheet,
  FlatList,
  View
} from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import ActionButton from 'react-native-action-button';
import { createStackNavigator } from 'react-navigation-stack';
import { primaryColor} from '../../themes';
import { Wait } from '../common';
import RecordView from '../admin/Record';
import Welcome from './Welcome';
import axios from 'axios';
import { fetchNewProjectList } from '../../actions/user/record';

class RecordList extends Component {

  componentDidMount() {
 //   fetchNewProjectList();
  }
  
  keyExtractor = (item, index) => item.id;

  renderItem = ({ item }) => (
    <ListItem
    rightIcon={
    <Icon 
      name='chevron-right'
      type='evilicon'
      size={40}
      record={item}
      color={'#517fa4'}
      chevron
    />
    }
    onPress={() => this.props.navigation.navigate('RecordViewScreen', {record: item})}
    title={item.name}
    subtitle={item.mobileNumber + " | " + item.district}
    bottomDivider
  />
)

  render() {

    if(loading) {
      return <Wait />;
    }
    const { loading, records, navigation} = this.props;
    let list = records;
    // navigation state
    return (
        <View style={{flex: 1, backgroundColor: 'white', paddingBottom: 10}} >
        {_.isEmpty(records) && <Welcome navigation={navigation}/>}
        {!_.isEmpty(records) &&       
        <FlatList
          keyExtractor={this.keyExtractor}
          data={list}
          renderItem={this.renderItem}
        />}
        {
          <ActionButton
          buttonColor={primaryColor}
          onPress={() => navigation.navigate('RecordCreate')}
          hideShadow
          />
        }
        </View>
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
  }
});

const mapStateToProps = (state) => {
  const { loading, error } = state.data.user.records;

  const recordList = state.data.user.records.records.records;
  let records = [];
  if(recordList) {
    records = recordList;
  }
  const tokens  = state.services.session.tokens;
  axios.defaults.headers['Authorization'] = "Bearer " + tokens;
  return { records, error, loading };
}

export default connect(mapStateToProps)(RecordList);