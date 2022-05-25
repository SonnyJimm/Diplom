import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {ListResultStyle} from '../../styles';
import {BaseView} from '../Component';
export const ListResult = ({line}) => {
  useEffect(() => {
    console.log(line);
  }, []);
  return (
    <View style={ListResultStyle.FullScreen}>
      <BaseView>
        <Text>{line['route_name']}</Text>
      </BaseView>
    </View>
  );
};
