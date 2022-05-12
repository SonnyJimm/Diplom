import {
  baseGrey,
  baseBlue,
  baseWhite,
  baseBorderRadius,
  baseFontSize,
  baseFont,
} from '../global';

import {StyleSheet} from 'react-native';

export const MapPopupComponent = StyleSheet.create({
  Wrapper: {
    position: 'absolute',
    top: 100,
    right: 80,
    width: '60%',
    height: '60%',
    borderRadius: baseBorderRadius,
    borderColor: baseGrey,
    borderWidth: 1,
    backgroundColor: baseWhite,
  },
  Title: {height: 40, width: '100%', flexDirection: 'row', padding: 10},
  TitleTextWrapper: {
    flex: 3,
  },
  TitleCloseButtonWrapper: {
    flex: 1,
    marginLeft:5,
    flexDirection:'row-reverse'
  },
  TitleText:{
    backgroundColor: baseGrey,
    alignSelf: 'center',
    borderRadius: baseBorderRadius,
    paddingLeft:15,
    paddingRight:15,
  },
  TitleCloseButton:{
    backgroundColor: baseGrey,
    borderRadius: baseBorderRadius,
    paddingLeft:5,
    paddingRight:5,
    paddingTop:1
  }
});
