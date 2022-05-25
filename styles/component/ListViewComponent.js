import {StyleSheet} from 'react-native';
import {
  baseGrey,
  baseBlue,
  baseBorderRadius,
  baseFontSize,
  baseFont,
} from '../global';
export const ListComponentStyle = StyleSheet.create({
  ListView: {
    marginTop: 10,
    alignSelf: 'center',
    width: '80%',
    height: '60%',
    borderRadius: baseBorderRadius,
    borderColor: baseGrey,
    borderWidth: 1,
  },
});
export const ListItemStyle = StyleSheet.create({
  ComponentStyle: {
    flexDirection: 'row',
    backgroundColor: baseGrey,
    width: '96%',
    height: 30,
    alignSelf: 'center',
    fontFamily: baseFont,
    fontSize: baseFontSize,
    marginTop: 5,
    borderRadius: 5,
    paddingLeft: 5,
    paddingTop: 4,
  },
  IconProp: {
    size: 20,
    color: baseBlue,
  },
  ComponentName: {
    flex: 2,
  },
  ComponentIcon: {
    flex: 1,
    flexDirection: 'row-reverse',
  },
  IconTouchable: {
    marginRight: 10,
    alignItems: 'center',
    width: 40,
  },
});
export const ListResultStyle = StyleSheet.create({
  FullScreen: {
    width: '96%',
    alignSelf: 'center',
  },
});
