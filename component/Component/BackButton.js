import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import {ButtonStyle} from '../../styles';
import Icon from 'react-native-vector-icons/FontAwesome';
export const BackButtonHeader = ({placeholder, onClick}) => {
  return (
    <View style={ButtonStyle.HeaderBackButton}>
      <TouchableOpacity
        style={ButtonStyle.BackButtonTouchable}
        onPress={onClick}>
        <Icon
          name="angle-left"
          size={ButtonStyle.HeaderButtonBackButtonIcon.size}
          color={ButtonStyle.HeaderButtonBackButtonIcon.color}
        />
        <Text style={ButtonStyle.BackButtonTouchableText}>{placeholder}</Text>
      </TouchableOpacity>
    </View>
  );
};
