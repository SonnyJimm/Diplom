import {StyleSheet} from 'react-native';

import {baseBorderRadius, baseBlue, baseFont, baseFontSize} from '../global';

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
});
