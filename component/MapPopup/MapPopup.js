import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import {MapPopupComponent} from '../../styles/component';
import Icon from 'react-native-vector-icons/FontAwesome';
import {getStationLines} from '../../util/db/busstation';
import {ListItem} from './ListItem';
export const MapPopup = ({data, close}) => {
  const [busLines, setBusLines] = useState([]);
  useEffect(() => {
    console.log('popup in bound');
    getStationLines(data, setBusLines);
  }, []);
  const render = ({item}) => {
    return <ListItem item={item} />;
  };
  return (
    <View style={MapPopupComponent.Wrapper}>
      <View style={MapPopupComponent.Title}>
        <View style={MapPopupComponent.TitleTextWrapper}>
          <Text style={MapPopupComponent.TitleText}>
            {data['bus_stop_name']}
          </Text>
        </View>
        <View style={MapPopupComponent.TitleCloseButtonWrapper}>
          <TouchableOpacity
            style={MapPopupComponent.TitleCloseButton}
            onPress={() => {
              close();
            }}>
            <Icon name="close" size={15} color={'black'} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={MapPopupComponent.BusLinesSection}>
        <FlatList
          data={busLines}
          keyExtractor={item => item['id']}
          renderItem={render}
        />
      </View>
    </View>
  );
};
