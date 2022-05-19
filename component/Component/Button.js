import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import { ButtonStyle } from '../../styles';
export const Button = ({placeholder,onClick}) => {
  return (
    <TouchableOpacity style={ButtonStyle.ButtonOppacity} onPress={onClick}>
      <Text style={ButtonStyle.Text}>{placeholder}</Text>
    </TouchableOpacity>
  );
};
