import {StyleSheet} from 'react-native';

import {
  baseBorderRadius,
  baseBlue,
  baseFont,
  baseFontSize,
  baseGrey,
} from '../global';

export const ButtonStyle = StyleSheet.create({
  ButtonOppacity: {
    borderRadius: baseBorderRadius,
    backgroundColor: baseBlue,
    marginTop: 30,
    height: 40,
    alignSelf: 'center',
    width: 200,
    justifyContent: 'center',
    // alignContent: 'center',
  },
  Text: {
    alignSelf: 'center',
    fontFamily: baseFont,
    fontSize: baseFontSize,
  },
  HeaderBackButton: {
    height: 50,
    width: '100%',
    fontFamily: baseFont,
    fontSize: baseFontSize,
  },
  HeaderButtonBackButtonIcon: {
    size: 40,
    color: baseBlue,
  },
  BackButtonTouchable: {
    flexDirection: 'row',
    width: '20%',
    marginLeft: '2%',
  },
  BackButtonTouchableText: {
    fontFamily: baseFont,
    color: baseBlue,
    marginLeft: '5%',
    marginTop: 6,
    fontSize: baseFontSize * 1.3,
  },
});
export const BaseViews = StyleSheet.create({
  BaseView: {
    backgroundColor: baseGrey,
    padding: 10,
    borderRadius: baseBorderRadius,
  },
});
