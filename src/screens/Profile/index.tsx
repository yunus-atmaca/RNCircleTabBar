import styles from '../styles';

import React from 'react';
import {View, Text} from 'react-native';

const Profile = () => {
  return (
    <View style={[styles.container, {backgroundColor: 'blanchedalmond'}]}>
      <Text style={styles.text}>Profile</Text>
    </View>
  );
};

export default Profile;
