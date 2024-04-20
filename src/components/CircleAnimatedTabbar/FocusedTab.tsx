import styles from './styles';
import {getTabIcon} from './index';

import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {View} from 'react-native';
import Animated, {Easing, useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';

type Props = {
  tabWidth: number;
  cellSize: number;
  svgHeight: number;
};
export interface IFocusedTabRef {
  focus: (index: number) => void;
}

const FocusedTab = forwardRef<IFocusedTabRef, Props>(({tabWidth, cellSize, svgHeight}, ref) => {
  const posX = useSharedValue(0);
  const [tIndex, setTIndex] = useState(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{translateX: posX.value}],
    };
  });

  useImperativeHandle(
    ref,
    () => {
      return {
        focus(tindex: number) {
          posX.value = withTiming(tindex * tabWidth, {
            duration: 150,
            easing: Easing.linear,
          });
          setTIndex(tindex);
        },
      };
    },
    [],
  );

  return (
    <Animated.View style={[styles.focusedTabContainer, {height: svgHeight, bottom: cellSize * 1.5, width: tabWidth}, animatedStyles]}>
      <View
        style={[
          styles.focusedTab,
          {
            width: cellSize * 3,
            height: cellSize * 3,
            borderRadius: cellSize * 3,
          },
        ]}>
        {getTabIcon(tIndex, 'black')}
      </View>
    </Animated.View>
  );
});

export default FocusedTab;
