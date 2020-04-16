import React, { Component } from 'react';
import _ from 'lodash';
import {
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback,
  TouchableHighlight,
  Text,
  View
} from 'react-native';
import { phonecall } from 'react-native-communications';
import { Icon, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import ActionButton from 'react-native-action-button';
import { primaryColor, secondaryColor} from '../../themes';
import { Card } from '../common';
import moment from 'moment';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Welcome from './Welcome';
import axios from 'axios';
import { fetchNewProjectList } from '../../actions/user/record';
import { submitOfflineReports } from '../../helpers';

class RecordList extends Component {

  componentDidMount() {
    fetchNewProjectList();
  }

  keyExtractor = (item, index) => item.id;

  renderSyncReportAction(offlineReports) {
    if(offlineReports) {
      return (
        <Button
          raised
          icon={{name: 'sync', size: 22}}
          buttonStyle={{backgroundColor: secondaryColor}}
          textStyle={{textAlign: 'center'}}
          containerViewStyle={{marginRight: 0, marginLeft: 0, borderWidth: 1}}
          title={`Click to sync offline records`}
          onPress={()=>submitOfflineReports(true)}
        />
      );
    }
  }



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
    const { name, mobileNumber, distric, age, gender, updatedTimeStamp } = item;
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
            {this.renderCardItem('Date', moment(new Date(updatedTimeStamp)).format('DD/MMM/YYYY HH:MM'))}
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
    const { loading, records, navigation, offlineRecords} = this.props;

    if(loading) {
      return <Wait />;
    }
    
    let list = records;
    // navigation state
    return (
        <View style={{flex: 1, backgroundColor: 'white', paddingBottom: 10}} >
        <View style={{backgroundColor: 'white'}}>
        {this.renderSyncReportAction(offlineRecords)}
        </View>
        {_.isEmpty(records) && <Welcome navigation={navigation}/>}
        {!_.isEmpty(records) &&       
        <FlatList
          keyExtractor={this.keyExtractor}
          data={list}
          renderItem={this.renderListItem}
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
    backgroundColor: '#f0f6ff',
  }
});

const mapStateToProps = (state) => {
  const { loading, error } = state.data.user.records;
  const offlineRecords = state.data.offline.records;
  const recordList = state.data.user.records.records.records;
  let records = [];
  if(recordList) {
    records = recordList;
  }
  const tokens  = state.services.session.tokens;
  axios.defaults.headers['Authorization'] = "Bearer " + tokens;
  return { records, error, loading, offlineRecords };
}

export default connect(mapStateToProps)(RecordList);