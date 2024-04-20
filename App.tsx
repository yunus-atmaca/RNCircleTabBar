import React, {useEffect, useRef} from 'react';
import {View, Dimensions} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Svg, {ClipPath, Path, Defs, Rect} from 'react-native-svg';
import Animated, {Easing, useAnimatedProps, useSharedValue, withTiming} from 'react-native-reanimated';

const {width} = Dimensions.get('window');
const TAB_CONTAINER_WIDTH = width / 4;
const CELL_SIZE = TAB_CONTAINER_WIDTH / 6;

const AnimatedPath = Animated.createAnimatedComponent(Path);

function App() {
  /*const p = `
    M 0 0
    L 0 0
    C ${0.33 * CELL_SIZE} 0 ${0.66 * CELL_SIZE} 0 ${1 * CELL_SIZE} ${1 * CELL_SIZE}
    C ${1.66 * CELL_SIZE} ${3 * CELL_SIZE} ${4.33 * CELL_SIZE} ${3 * CELL_SIZE} ${5 * CELL_SIZE} ${1 * CELL_SIZE}
    C ${5.33 * CELL_SIZE} 0 ${5.66 * CELL_SIZE} 0 ${6 * CELL_SIZE} 0
    L ${6 * CELL_SIZE} ${-1 * CELL_SIZE}
    L 0 ${-1 * CELL_SIZE}
    L 0 0
`;*/
  /*
    M 0 0 --- M 0 0 -
    L 0 0 --- L 6 0 -
    C 0.3333 0 0.6667 0 1 1 --- C 6.3333 0 6.6667 0 7 1 -
    C 1.66 3 4.33 3 5 1 --- C 7.66 3 10.33 3 11 1
    C 5.33 0 5.66 0 6 0 --- C 11.33 0 11.66 0 12 0 -
    L 6 -1 --- L 12 -1 -
    L 0 -1 --- L 0 -1 -
    L 0 0 --- L 0 0 -
  */

  const tabIndex = useSharedValue(0);
  const next = useRef(0);

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

  const animation = (previous: number) => {
    if (previous === 3) next.current = 0;
    else next.current = previous + 1;

    tabIndex.value = withTiming(next.current, {
      duration: 150,
      easing: Easing.linear,
    });
  };

  useEffect(() => {
    setTimeout(() => {
      animation(next.current);
    }, 1000);
    const timer = setInterval(() => {
      animation(next.current);
    }, 5000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: 'red', justifyContent: 'flex-end'}}>
        <View style={{height: 100, width: '100%', backgroundColor: 'transparent'}}>
          <Svg height={100} width={width}>
            <Defs>
              <ClipPath id="clip">
                <Rect x="0" y="0" width={width} height={100} />
                <AnimatedPath animatedProps={animatedProps} stroke="black" />
              </ClipPath>
            </Defs>
            <Rect x="0" y="0" width={width} height={100} fill="white" clipPath="url(#clip)" />
          </Svg>
        </View>
      </View>
    </GestureHandlerRootView>
  );
}

export default App;
