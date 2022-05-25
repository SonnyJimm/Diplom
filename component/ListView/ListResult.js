import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {ListResultStyle} from '../../styles';
import {BaseView} from '../Component';
import {BusStationLists} from './ListView';
import {lineBusStops} from '../../util/db/busstation';
export const ListResult = ({line, start, end}) => {
  const [busStations, setBusStations] = useState([]);
  const [isBusStationsVisible, setIsBusStationsVisible] = useState(false);
  const onClick = () => {
    if (isBusStationsVisible) {
      setIsBusStationsVisible(false);
    } else {
      setIsBusStationsVisible(true);
    }
  };
  useEffect(() => {
    lineBusStops(line['id'], setBusStations,start['id'],end['id']);
  }, []);
  return (
    <View style={ListResultStyle.FullScreen}>
      <TouchableOpacity onPress={onClick}>
        <BaseView>
          <Text>{line['route_name']}</Text>
        </BaseView>
      </TouchableOpacity>
      {isBusStationsVisible && (
        <BusStationLists stations={busStations} start={start} end={end} />
      )}
    </View>
  );
};
