import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import Toast from 'react-native-simple-toast';
import {SearchScreenStyle} from '../../styles/screens/SearchScreen';
import {getAllStations} from '../../util/db/busstation';
import {SearchInput, RecommendLists, Button} from '../../component';
import {NewEmptyStation} from '../../util/helper';

const SearchScreen = ({navigation}) => {
  const [filteredDataStarting, setfilteredDataStarting] = useState([]);
  const [filteredDataEnding, setfilteredDataEnding] = useState([]);

  const [masterData, setMasterData] = useState([]);
  const [startingPoint, setStartingPoint] = useState(NewEmptyStation(''));
  const [endingPoint, setEndingPoint] = useState(NewEmptyStation(''));
  const [isVisibleStartReccomend, setIsVisibleStartReccomend] = useState(false);
  const [isVisibleEndReccomend, setIsVisiblendReccomend] = useState(false);

  const initializeMasterData = data => {
    setfilteredDataStarting(data);
    setfilteredDataEnding(data);
    setMasterData(data);
  };
  useEffect(() => {
    /* Load data from database */
    getAllStations(initializeMasterData);
    return () => {};
  }, []);

  const searchStartingPoint = input => {
    setStartingPoint(NewEmptyStation(input));
    filterDataStart(input);
  };
  const searchEndingPoint = input => {
    setEndingPoint(NewEmptyStation(input));
    filterDataEnd(input);
  };
  /* filter the data using input */
  const filterDataStart = input => {
    // console.log('data :', input.toLowerCase());
    const filteredDataStarts = masterData.filter(data =>
      data['bus_stop_name'].toLowerCase().includes(input.toLowerCase()),
    );
    setfilteredDataStarting(filteredDataStarts);
  };
  const filterDataEnd = input => {
    // console.log('data :', input.toLowerCase());
    const filteredDataEnds = masterData.filter(data =>
      data['bus_stop_name'].toLowerCase().includes(input.toLowerCase()),
    );
    setfilteredDataEnding(filteredDataEnds);
  };
  /* set Starting point */
  const setSelectedStatingPoint = data => {
    setStartingPoint(data);
    filterDataStart(data['bus_stop_name']);
    setStartingPointReccomendListInvisible();
  };
  const setSelectEndingPoint = data => {
    setEndingPoint(data);
    filterDataEnd(data['bus_stop_name']);
    setEndingPointReccomendListInvisible();
  };
  /* setting starting point invisible */
  const setStartingPointReccomendListInvisible = () => {
    setIsVisibleStartReccomend(false);
  };
  const setStartingPointReccomendListVisible = () => {
    setIsVisibleStartReccomend(true);
    setIsVisiblendReccomend(false);
  };
  /* setting ending point invisible */
  const setEndingPointReccomendListInvisible = () => {
    setIsVisiblendReccomend(false);
  };
  const setEndingPointReccomendListVisible = () => {
    setIsVisiblendReccomend(true);
    setIsVisibleStartReccomend(false);
  };
  const showBusStationLocation = data => {
    navigation.navigate('MapSearch', {
      screen: 'MapSearchScreen',
      params: {station: data},
    });
  };
  const onSearch = () => {
    if (startingPoint['id'] == 0) {
      Toast.show('Та эхлэх цэгийн байршил оруулна уу', Toast.SHORT);
      return;
    }
    if (endingPoint['id'] == 0) {
      Toast.show('Та төгсөх цэгийн байршил оруулна уу', Toast.SHORT);
      return;
    }
    navigation.navigate('TextSearch', {
      screen: 'SearchResult',
      params: {start: startingPoint, end: endingPoint},
    });
  };
  return (
    <View style={SearchScreenStyle.FullScreen}>
      <SearchInput
        value={startingPoint['bus_stop_name']}
        setValue={searchStartingPoint}
        onFocusIn={setStartingPointReccomendListVisible}
        placeholder={'Эхлэх цэг'}
      />
      {isVisibleStartReccomend && (
        <RecommendLists
          items={filteredDataStarting}
          setSelectedValue={setSelectedStatingPoint}
          showBusStationLocation={showBusStationLocation}
        />
      )}
      <SearchInput
        value={endingPoint['bus_stop_name']}
        setValue={searchEndingPoint}
        onFocusIn={setEndingPointReccomendListVisible}
        placeholder={'Төгсгөлийн цэг'}
      />
      {isVisibleEndReccomend && (
        <RecommendLists
          items={filteredDataEnding}
          setSelectedValue={setSelectEndingPoint}
          showBusStationLocation={showBusStationLocation}
        />
      )}
      <Button placeholder={'Хайх'} onClick={onSearch} />
    </View>
  );
};
export default SearchScreen;
