import React, { Component, } from 'react'
import { View, Text, StyleSheet} from 'react-native'
import { primaryColor } from '../../themes';

class Heading extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          {this.props.children}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    fontWeight: '500',
    fontSize: 17,
    paddingLeft: 20,
    color: primaryColor,
  },
  container: {height: 30, backgroundColor: 'white', flex: 1, justifyContent: 'center', marginHorizontal: -20, marginBottom: 10}
})

export { Heading };
