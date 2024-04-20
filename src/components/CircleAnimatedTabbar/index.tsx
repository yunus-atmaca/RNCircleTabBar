import styles from './styles';

import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import React, {FC} from 'react';
import {View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const CircleAnimatedTabbar: FC<BottomTabBarProps> = ({state, descriptors, navigation}) => {
  const {bottom} = useSafeAreaInsets();

  const routes = state.routes;

  return (
    <View>
      {/*routes.map((r, i) => {
        <View></View>;
      })*/}
      <View style={[styles.bottomGap, {height: bottom + 12}]} />
    </View>
  );
};

export default CircleAnimatedTabbar;
