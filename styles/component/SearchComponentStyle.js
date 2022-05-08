import {StyleSheet} from 'react-native';
import {baseGrey, baseBorderRadius,baseWhite,baseFont,baseFontSize} from '../global';
export const SearchComponentStyle = StyleSheet.create({
  InputView: {
    backgroundColor: baseGrey,
    alignSelf: 'center',
    width: '80%',
    height: 45,
    borderRadius: baseBorderRadius,
    marginTop: 30,
    flexDirection: 'row',
  },
  IconProp: {
    size: 22,
    color: baseWhite,
  },
  IconStyle: {
    paddingTop:10,
    paddingLeft:15,
    paddingRight:10
  },
  InputStyle: {
    fontFamily:baseFont,
    fontSize:baseFontSize,
    flex:1
  }
});
