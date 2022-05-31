import React, {useState, useEffect} from 'react';

import {getAllStations, lineBusStopsLoc} from '../../util/db/busstation';
import {Polyline} from 'react-native-maps';
export const MapPoints = ({data, cls}) => {
  const [line, setLine] = useState([]);
  useEffect(() => {
    console.log(data);
    lineBusStopsLoc(data['bus_lines_id'], setLine);
  }, []);
  return (
    <Polyline
      coordinates={line}
      strokeColor={cls}
      strokeWidth={6}
      geodesic={true}
    />
  );
};
