import styles from '../styles';

import React from 'react';
import {View, Text} from 'react-native';

const Home = () => {
  return (
    <View style={[styles.container, {backgroundColor: 'cadetblue'}]}>
      <Text style={styles.text}>Home</Text>
    </View>
  );
};

export default Home;
