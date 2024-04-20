import styles from './styles';
import FocusedTab, {IFocusedTabRef} from './FocusedTab';
import {Ic_Discover, Ic_Home, Ic_Messages, Ic_Profile} from '../../icons';

import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import React, {FC, useRef} from 'react';
import {Text, View, Dimensions, TouchableOpacity} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Svg, {ClipPath, Path, Defs, Rect} from 'react-native-svg';
import Animated, {Easing, useAnimatedProps, useSharedValue, withTiming} from 'react-native-reanimated';

const numberOfTab = 4;
const numberOfCellInATab = 6;

const {width} = Dimensions.get('window');
const TAB_CONTAINER_WIDTH = width / numberOfTab;
const CELL_SIZE = TAB_CONTAINER_WIDTH / numberOfCellInATab;
const SVG_HEIGHT = CELL_SIZE * 4;

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const getTabIcon = (index: number, color: string) => {
  switch (index) {
    case 0:
      return <Ic_Home color={color} />;
    case 1:
      return <Ic_Discover color={color} />;
    case 2:
      return <Ic_Messages color={color} />;
    case 3:
      return <Ic_Profile color={color} />;
    default:
      return null;
  }
};

const CircleAnimatedTabbar: FC<BottomTabBarProps> = ({state, navigation}) => {
  const {bottom} = useSafeAreaInsets();
  const routes = state.routes;

  const tabIndex = useSharedValue(0);
  const focusedTabRef = useRef<IFocusedTabRef>(null);

  const animatedProps = useAnimatedProps(() => {
    const path = `
    M 0 0 
    L ${tabIndex.value * 6 * CELL_SIZE} 0
    C ${tabIndex.value * 6 * CELL_SIZE + 0.33 * CELL_SIZE} 0 ${tabIndex.value * 6 * CELL_SIZE + 0.66 * CELL_SIZE} 0 ${
      tabIndex.value * 6 * CELL_SIZE + 1 * CELL_SIZE
    } ${1 * CELL_SIZE} 
    C ${tabIndex.value * 6 * CELL_SIZE + 1.66 * CELL_SIZE} ${3 * CELL_SIZE} ${tabIndex.value * 6 * CELL_SIZE + 4.33 * CELL_SIZE} ${
      3 * CELL_SIZE
    } ${tabIndex.value * 6 * CELL_SIZE + 5 * CELL_SIZE} ${1 * CELL_SIZE} 
    C ${tabIndex.value * 6 * CELL_SIZE + 5.33 * CELL_SIZE} 0 ${tabIndex.value * 6 * CELL_SIZE + 5.66 * CELL_SIZE} 0 ${
      tabIndex.value * 6 * CELL_SIZE + 6 * CELL_SIZE
    } 0 
    L ${tabIndex.value * 6 * CELL_SIZE + 6 * CELL_SIZE} ${-1 * CELL_SIZE} 
    L 0 ${-1 * CELL_SIZE} 
    L 0 0
  `;
    return {
      d: path,
    };
  });

  const animation = (tabindex: number) => {
    tabIndex.value = withTiming(tabindex, {
      duration: 150,
      easing: Easing.linear,
    });
  };

  return (
    <View style={styles.container}>
      <View style={[styles.svgContainer, {height: SVG_HEIGHT}]}>
        <Svg height={SVG_HEIGHT} width={width}>
          <Defs>
            <ClipPath id="clip">
              <Rect x="0" y="0" width={width} height={SVG_HEIGHT} />
              <AnimatedPath animatedProps={animatedProps} />
            </ClipPath>
          </Defs>
          <Rect x="0" y="0" width={width} height={SVG_HEIGHT} fill="white" clipPath="url(#clip)" />
        </Svg>
        <View style={styles.tabs}>
          {routes.map((r, i) => {
            const isFocused = state.index === i;

            const onPress = () => {
              animation(i);
              focusedTabRef.current?.focus(i);
              const event = navigation.emit({
                type: 'tabPress',
                target: r.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(r.name, r.params);
              }
            };

            return (
              <TouchableOpacity activeOpacity={0} onPress={onPress} style={[styles.tab, {opacity: isFocused ? 0 : 1}]} key={'tab-' + i}>
                {getTabIcon(i, 'grey')}
                <Text style={styles.tabText}>{r.name}</Text>
              </TouchableOpacity>
            );
          })}
          <FocusedTab ref={focusedTabRef} svgHeight={SVG_HEIGHT} cellSize={CELL_SIZE} tabWidth={TAB_CONTAINER_WIDTH} />
        </View>
      </View>
      <View style={[styles.bottomGap, {height: bottom + 12}]} />
    </View>
  );
};

export default CircleAnimatedTabbar;
