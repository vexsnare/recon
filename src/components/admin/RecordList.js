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
import { Icon, Button } from 'react-native-elements';
import {createStackNavigator } from 'react-navigation-stack';
import { connect } from 'react-redux';
import ActionButton from 'react-native-action-button';
import { primaryColor, secondaryColor} from '../../themes';
import { Card,Wait } from '../common';
import Welcome from './Welcome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import { getRecords, recordToEdit } from '../../actions/admin/records';
import { submitOfflineReports } from '../../helpers';
import { Linking  } from 'expo';
import RecordViewScreen from './Record'
import RecordCreateScreen from './RecordCreate'
import RecordEditScreen from './RecordEdit'
import { timing } from 'react-native-reanimated';
import {formatDate} from '../../utils';
import {recordCardDateFormat} from '../../const'


class RecordList extends Component {

  componentDidMount() {
    getRecords();
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
    recordToEdit(item);
    this.props.navigation.push('RecordView', {record: item})
  }
  renderCardItem(label, text, phone) {
    return (
        <View style={{flex: 1, flexDirection: 'row', paddingVertical: 3, backgroundColor: 'white'}}>
         <View style={{flex: 2, flexDirection: 'row'}}>
            <Text style={{color: 'gray', fontSize: 16 }}>
              {label}
            </Text>
            <Text style={{paddingLeft: 10, fontSize: 16, color: 'black'}}>
              {text}
            </Text>
          </View>
          {phone &&
            <TouchableWithoutFeedback onPress={()=> Linking.openURL("tel:+91"+phone)} style={{flex: 1, justifyContent: 'flex-end'}}>
              <View>
                <Icon name="phone" size={20} color={primaryColor} style={{paddingLeft: 10, marginVertical: -2}} />
              </View>
            </TouchableWithoutFeedback>
          }
        </View>
    );
  }

  renderListItem = ({ item })=>  {
    const { name, mobileNumber, district, age, gender, updatedTimeStamp } = item;
    return (
      <View>
        <Card>
          <View style={styles.heading}>
            <Text style={styles.title}>
              Name: {name}
            </Text>
          </View>
          <TouchableWithoutFeedback onPress={() => this.onRowPress(item)}>
            <View style={{paddingHorizontal: 10, backgroundColor: 'white'}}>
            <View style={{flex: 6, flexDirection: 'row', justifyContent:'space-between'}}>{this.renderCardItem('Gender', gender)}{this.renderCardItem('Age', age)}</View>
            {this.renderCardItem('District', district)}
            {this.renderCardItem('Phone Number', mobileNumber, mobileNumber)}
            {this.renderCardItem('Date', formatDate(updatedTimeStamp, recordCardDateFormat) )}          
            </View>
          </TouchableWithoutFeedback>
          <TouchableHighlight onPress={() => this.onRowPress(item)}>
            <View style={styles.bottom}>
              <View style={{flexDirection: 'row', paddingVertical: 15}}>
                <MaterialIcons name="arrow-forward" size={22} />
                <Text style={{fontSize: 16}}>
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
    // navigation state
    return (
        <View style={{flex: 1, backgroundColor: 'white', paddingBottom: 10}} >
        <View style={{backgroundColor: 'white'}}>
        {this.renderSyncReportAction(offlineRecords)}
        </View>
        {(!records || _.isEmpty(records)) && <Welcome navigation={navigation}/>}
        {!_.isEmpty(records) &&       
        <FlatList
          keyExtractor={this.keyExtractor}
          data={records}
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

  const { records, error, loading } = state.data.user.records.records;
  const offlineRecords = state.data.offline.records;
  const tokens  = state.services.session.tokens;
  axios.defaults.headers['Authorization'] = "Bearer " + tokens;
  return { records, error, loading, offlineRecords };
}

const RecordListScreen = connect(mapStateToProps)(RecordList);

export default createStackNavigator({
  'RecordList': {
    screen: RecordListScreen,
    navigationOptions: ({navigation}) => ({    
      title: 'Record List',
      headerLeft: 
        <TouchableWithoutFeedback
          onPress={ () => navigation.toggleDrawer()}
      >
        <View style={{padding: 10}}><Icon type='ionicon' name="ios-menu" size={35} /></View>
      </TouchableWithoutFeedback>}
      )
  },
  'RecordView':  {
    screen: RecordViewScreen,
    navigationOptions: ({navigation}) => ({
      title: 'View',
      headerRight:
                  <TouchableWithoutFeedback
                     onPress={ () => navigation.navigate('RecordEdit') }
                  >
                   <View style={{padding: 10, flexDirection: 'row', justifyContent: 'space-between'}}><Text style={{fontSize: 20, color: primaryColor}}>EDIT</Text><Icon name="mode-edit" size={25} /></View>
                 </TouchableWithoutFeedback>
              })
  },
  'RecordCreate': {
    screen: RecordCreateScreen,
    navigationOptions: ({navigation}) => ({    
      title: 'Record Create',
    })
  },
  'RecordEdit': {
    screen: RecordEditScreen,
    navigationOptions: ({navigation}) => ({    
      title: 'Record Edit',
    })
  }
},{
  initialRouteName: 'RecordList'
}
)