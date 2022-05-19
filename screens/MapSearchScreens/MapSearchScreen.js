import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import MapView from 'react-native-maps';

import {getAllStations} from '../../util/db/busstation';

import {MapMarker} from '../../component';

import {NewInitialRegion} from '../../util/helper';
import {MapPopup} from '../../component';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

const customStyle = [
  {
    featureType: 'transit.station.bus',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
];

const MapSearchScreen = ({navigation, route}) => {
  const mapRef = React.createRef(NewInitialRegion(47.9177697, 106.9175774));
  const [initialRegion] = useState(NewInitialRegion(47.9177697, 106.9175774));
  const [busStations, setBusStations] = useState([]);
  const [busStation, setBusStation] = useState();
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const initializeData = data => {
    setBusStations(data);
  };
  useEffect(() => {
    /* Load data from database */
    getAllStations(initializeData);
    return () => {};
  }, []);
  useEffect(() => {
    // The screen is focused
    // Call any action
    if (route.params) {
      if (route.params.station) {
        const {station} = route.params;
        console.log(station);
        mapRef.current.animateToRegion(
          NewInitialRegion(station['lat'], station['long']),
        );
        openBusStationDetail(station);
      }
    }
  }, [route]);
  const openBusStationDetail = data => {
    setBusStation(data);
    setIsPopupVisible(true);
  };
  const closeBusStationDetail = () => {
    setIsPopupVisible(false);
    setBusStation(null);
  };
  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={initialRegion}
        customMapStyle={customStyle}>
        {busStations.map((data, id) => {
          return (
            <MapMarker key={id} data={data} onClick={openBusStationDetail} />
          );
        })}
      </MapView>
      {isPopupVisible && (
        <MapPopup data={busStation} close={closeBusStationDetail} />
      )}
    </View>
  );
};
0;
export default MapSearchScreen;
