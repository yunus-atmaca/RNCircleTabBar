import React from 'react';
import {View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: 'red'}}></View>
    </GestureHandlerRootView>
  );
}

export default App;
