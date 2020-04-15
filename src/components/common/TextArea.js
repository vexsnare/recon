import React, {Component} from 'react';
import View from 'react-native';


export default MyTextArea = () => {

    return (
        <View style={styles.container}>
  <Textarea
    containerStyle={styles.textareaContainer}
    style={styles.textarea}
    onChangeText={this.onChange}
    defaultValue={this.state.text}
    maxLength={120}
    placeholder={'Start typing'}
    placeholderTextColor={'#c7c7c7'}
    underlineColorAndroid={'transparent'}
  />
</View>
    )
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textareaContainer: {
    height: 180,
    padding: 5,
    backgroundColor: '#F5FCFF',
  },
  textarea: {
    textAlignVertical: 'top',  // hack android
    height: 170,
    fontSize: 14,
    color: '#333',
  },
});