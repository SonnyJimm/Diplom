import React, {useEffect, useState} from 'react';
import {View} from 'react-native';

import {lineSearchByStation} from '../../util/db/busstation';

const SearchResult = ({navigation, route}) => {
  const [datas, setDatas] = useState([]);
  const setResultData = data => {
    setDatas(data);
    console.log(data);
  };
  useEffect(() => {
    const {start, end} = route.params;
    lineSearchByStation(start, end, setResultData);
  }, [route]);
  return <View></View>;
};
export default SearchResult;
