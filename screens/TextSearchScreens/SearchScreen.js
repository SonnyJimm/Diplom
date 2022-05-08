import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {SearchScreenStyle} from '../../styles/screens/SearchScreen';
import {getAllStations} from '../../util/db/busstation';
import {SearchInput, RecommendLists} from '../../component';
const SearchScreen = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [masterData, setMasterData] = useState([]);
  const [startingPoint, setStartingPoint] = useState();
  const initializeMasterData = data => {
    setFilteredData(data);
    setMasterData(data);
  };
  const filterData = input => {
    setStartingPoint(input);
    console.log('data :', input.toLowerCase());
    const filteredDatas = masterData.filter(data =>
      data['bus_stop_name'].toLowerCase().includes(input.toLowerCase()),
    );
    setFilteredData(filteredDatas)
  };
  useEffect(() => {
    getAllStations(initializeMasterData);
  }, []);
  return (
    <View style={SearchScreenStyle.FullScreen}>
      <SearchInput value={startingPoint} setValue={filterData} />
      <RecommendLists items={filteredData} />
    </View>
  );
};
export default SearchScreen;
