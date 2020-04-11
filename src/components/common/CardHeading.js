import React from 'react';
import { View , Text} from 'react-native';

const CardHeading = (props) => {
  const viewStyle = [styles.viewStyle];
  if(props.underline) viewStyle.push({borderBottomWidth: 1});
  return (<View style={[viewStyle, props.style]}>
            <Text style={[styles.textStyle, {color: props.color}]}>{props.children}</Text>
          </View>
    );
};

const styles = {
  viewStyle: {
    padding: 5,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#ddd',
    position: 'relative'
  },
  textStyle: {
    color: 'gray',
    fontWeight: '500',
    fontSize: 20,
    padding: 7
  }
};

export { CardHeading };
