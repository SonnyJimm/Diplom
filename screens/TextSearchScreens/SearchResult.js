import React, {useEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import {SearchResultScreenStyle} from '../../styles/screens/SearchResultScreen';
import {
  lineSearchByStation,
  getBusLineBetweenStation,
} from '../../util/db/busstation';
import {NewEmptyStation} from '../../util/helper';
import Icon from 'react-native-vector-icons/FontAwesome';

import {BackButtonHeader, BaseView, ListResult} from '../../component';
const SearchResult = ({navigation, route}) => {
  const [datas, setDatas] = useState([]);
  const [destinationStart, setDestinationStart] = useState(NewEmptyStation(''));
  const [destinationEnd, setDestinationEnd] = useState(NewEmptyStation(''));
  const setResultData = data => {
    setDatas(data);
  };
  useEffect(() => {
    const {start, end} = route.params;
    setDestinationStart(start);
    setDestinationEnd(end);
    lineSearchByStation(start, end, setResultData);
    // getBusLineBetweenStation(start, end);
  }, [route]);
  const previosPage = () => {
    navigation.navigate('TextSearch', {
      screen: 'SearchScreen',
    });
  };
  const showBusStationLocation = data => {
    data["id"] = data["bus_lines_id"]
      navigation.navigate('MapSearch', {
      screen: 'MapSearchScreen',
      params: {station: data},
    });
  };
  return (
    <View style={SearchResultScreenStyle.FullScreen}>
      <BackButtonHeader placeholder={'Буцах'} onClick={previosPage} />
      <View style={SearchResultScreenStyle.Results}>
        <View style={SearchResultScreenStyle.BusStationDisplay}>
          <View style={SearchResultScreenStyle.DisplayStyle}>
            <BaseView>
              <Text style={SearchResultScreenStyle.TextColor}>
                {destinationStart['bus_stop_name']}
              </Text>
            </BaseView>
          </View>
          <View style={SearchResultScreenStyle.DisplayIconViewStyle}>
            <Icon
              name={'arrow-circle-right'}
              size={SearchResultScreenStyle.DisplayIconStyle.size}
              color={SearchResultScreenStyle.DisplayIconStyle.color}
            />
          </View>
          <View style={SearchResultScreenStyle.DisplayStyle}>
            <BaseView style={SearchResultScreenStyle.DisplayStyle}>
              <Text style={SearchResultScreenStyle.TextColor}>
                {destinationEnd['bus_stop_name']}
              </Text>
            </BaseView>
          </View>
        </View>
        <FlatList
          data={datas}
          keyExtractor={line => line['id']}
          renderItem={({item}) => {
            return (
              <ListResult
                line={item}
                onPressed={showBusStationLocation}
                start={destinationStart}
                end={destinationEnd}
              />
            );
          }}
        />
      </View>
    </View>
  );
};
export default SearchResult;
