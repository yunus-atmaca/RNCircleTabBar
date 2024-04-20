import styles from '../styles';

import React from 'react';
import {View, Text} from 'react-native';

const Messages = () => {
  return (
    <View style={[styles.container, {backgroundColor: 'aquamarine'}]}>
      <Text style={styles.text}>Messages</Text>
    </View>
  );
};

export default Messages;
