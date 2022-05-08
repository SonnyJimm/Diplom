import React  from 'react';

import {View, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { SearchComponentStyle } from '../../styles';

export const SearchInput = ({value, setValue}) => {
  return (
    <View style={SearchComponentStyle.InputView}>
      <Icon name="search" size={SearchComponentStyle.IconProp.size} style={SearchComponentStyle.IconStyle} color={SearchComponentStyle.IconProp.color} />
      <TextInput style={SearchComponentStyle.InputStyle} placeholder="Эхлэх цэг" onChangeText={data=>setValue(data)} value={value} />
    </View>
  );
};
