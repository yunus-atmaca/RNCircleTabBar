import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
  },
  svgContainer: {
    width: '100%',
    backgroundColor: 'transparent',
    marginBottom: -4,
  },
  bottomGap: {
    backgroundColor: 'white',
    width: '100%',
  },
  tabs: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    fontSize: 12,
    color: 'grey',
    marginTop: 2,
  },
  focusedTabContainer: {
    position: 'absolute',
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  focusedTab: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});
