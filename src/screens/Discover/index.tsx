import styles from '../styles';

import React from 'react';
import {View, Text} from 'react-native';

const Discover = () => {
  return (
    <View style={[styles.container, {backgroundColor: 'crimson'}]}>
      <Text style={styles.text}>Discover</Text>
    </View>
  );
};

export default Discover;
