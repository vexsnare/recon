import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { web, email } from 'react-native-communications';
import {
  View,
  Alert
} from 'react-native';
import { SideMenuItem } from '../common';
import { logoutUser } from '../../actions/logout';
import { Grid, Row, Icon } from 'react-native-elements';
class SideMenu extends Component {


  renderConfirmAlert() {
        Alert.alert(
            `Are you sure?`,
            `You want to logout this session`,
            [
              {text: 'Cancel', onPress: null},
              {text: 'OK', onPress: this.logoutPress.bind(this)},
            ],
        );
  }

  logoutPress() {
    this.props.logoutUser();
  }

  helpPress() {
    email(['contact@alitus.co.in'], null, null, 'Query on Sighte App', 'Dear Sighte Team, ');
  }

  aboutUs() {
    web("http://www.alitus.co.in");
  }

  tutorial() {
    web("https://www.youtube.com/watch?v=4XFH91p0aUA");
  }


  followUs() {
    web("https://www.linkedin.com/company-beta/13219565/");
  }

  rateApplication() {
    web("http://bit.ly/altsgta");
  }

  render() {

    if (this.props.user) {
      const { first_name, email, contact_number } = this.props.user;
      return (
        <Grid>
          <Row size={5}>
            <View style={{flex: 1, backgroundColor: '#ffffff', borderBottomWidth: 0.5, borderBottomColor: 'gray'}}>
              <SideMenuItem icon={{name:"ios-person", type: 'ionicon'}}>{first_name}</SideMenuItem>
              <SideMenuItem icon={{name:"ios-mail", type: 'ionicon'}}>{email}</SideMenuItem>
              <SideMenuItem icon={{name:"ios-call", type: 'ionicon'}}>{contact_number}</SideMenuItem>
            </View>
          </Row>
          <Row size={4}>
          <View style={{flex: 1, backgroundColor: '#ffffff'}}>
          <TouchableOpacity onPress={this.renderConfirmAlert.bind(this)}>
            <SideMenuItem icon={{name:"ios-exit", type: 'ionicon'}} >Logout</SideMenuItem>
          </TouchableOpacity>
          <TouchableOpacity  onPress={this.followUs.bind(this)}>
            <SideMenuItem icon={{name:"ios-leaf", type: 'ionicon'}}>Follow Us</SideMenuItem>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.helpPress.bind(this)}>
            <SideMenuItem icon={{name:"ios-megaphone", type: 'ionicon'}}>Need Help</SideMenuItem>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.rateApplication.bind(this)}>
            <SideMenuItem icon={{name:"ios-heart", type: 'ionicon'}}>Rate Application</SideMenuItem>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.aboutUs.bind(this)}>
            <SideMenuItem icon={{name:"ios-information-circle", type: 'ionicon'}}>About us</SideMenuItem>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.tutorial.bind(this)}>
            <SideMenuItem icon={{name:"ios-information-circle", type: 'ionicon'}}>Tutorial</SideMenuItem>
          </TouchableOpacity>
          </View>
          </Row>
        </Grid>
      );
    }
    return <View />;
  }
}
const mapStateToProps = (state) => {
  const { user } = state.services.session;
  return { user};
};

export default connect(mapStateToProps, {logoutUser})(SideMenu);
