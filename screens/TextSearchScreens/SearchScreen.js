import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {SearchScreenStyle} from '../../styles/screens/SearchScreen';
import {getAllStations} from '../../util/db/busstation';
import {SearchInput, RecommendLists} from '../../component';
import {NewEmptyStation} from '../../util/helper';

const SearchScreen = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [masterData, setMasterData] = useState([]);
  const [startingPoint, setStartingPoint] = useState(NewEmptyStation(''));
  const [isVisibleStartReccomend, setIsVisibleStartReccomend] = useState(false);
  const initializeMasterData = data => {
    setFilteredData(data);
    setMasterData(data);
  };

  const searchStartiongPoint = input => {
    setStartingPoint(NewEmptyStation(input));
    filterData(input);
  };
  /* filter the data using input */
  const filterData = input => {
    // console.log('data :', input.toLowerCase());
    const filteredDatas = masterData.filter(data =>
      data['bus_stop_name'].toLowerCase().includes(input.toLowerCase()),
    );
    setFilteredData(filteredDatas);
  };
  /* set Starting point */
  const setSelectedStatingPoint = data => {
    setStartingPoint(data);
    filterData(data['bus_stop_name']);
    setStartingPointReccomendListInvisible();
  };
  const setStartingPointReccomendListInvisible = () => {
    setIsVisibleStartReccomend(false);
  };
  const setStartingPointReccomendListVisible = () => {
    setIsVisibleStartReccomend(true);
  };
  useEffect(() => {
    /* Load data from database */
    getAllStations(initializeMasterData);
    return () => {};
  }, []);
  return (
    <View style={SearchScreenStyle.FullScreen}>
      <SearchInput
        value={startingPoint['bus_stop_name']}
        setValue={searchStartiongPoint}
        onFocusIn={setStartingPointReccomendListVisible}
      />
      {isVisibleStartReccomend && (
        <RecommendLists
          items={filteredData}
          setSelectedValue={setSelectedStatingPoint}
        />
      )}
    </View>
  );
};
export default SearchScreen;
