import {StyleSheet} from 'react-native';
import {baseWhite,baseGrey} from '../global';
export const SearchResultScreenStyle = StyleSheet.create({
  FullScreen: {
    flex: 1,
    backgroundColor: baseWhite,
  },
  Results: {
    flex: 1,
  },
  BusStationDisplay: {
    flexDirection: 'row',
    alignSelf: 'center',
    width:'96%',
    alignItems:'center',
    marginTop:20,
    marginBottom:20,
  },
  DisplayStyle: {
    flex: 1,
    alignSelf: 'center',
  },
  DisplayIconStyle:{
    size:40, 
    color: baseGrey
  },
  DisplayIconViewStyle:{
    flex: 0.3,
    alignItems: 'center',
  }
});
