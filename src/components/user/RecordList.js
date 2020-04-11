import React, { Component } from 'react';
import _ from 'lodash';
import {
  StyleSheet,
  View
} from 'react-native';
import { connect } from 'react-redux';
import ActionButton from 'react-native-action-button';
import { primaryColor} from '../../themes';
import { Wait } from '../common';
import { fetchProjectList, takeATour } from '../../actions/user/record';
import Welcome from './Welcome';


class RecordList extends Component {

  render() {

    const { fetching, navigation} = this.props;
    let records = [];
    // navigation state
    if(fetching || !records) {
      return <Wait />;
    }
    return (
        <View style={{flex: 1, backgroundColor: 'white', paddingBottom: 10}} >
        {_.isEmpty(records) && <Welcome navigation={navigation}/>}
        {
          <ActionButton
          buttonColor={primaryColor}
          onPress={() => navigation.navigate('recordCreate')}
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

  const { fetching, error } = state;
  const { data } = state;

  const records =  [];
  return { records, fetching, error, data };

}

export default RecordList;
