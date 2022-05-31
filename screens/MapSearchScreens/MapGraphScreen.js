import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import MapView from 'react-native-maps';

import {getStationLines} from '../../util/db/busstation';
import {MapMarker} from '../../component';
import {MapPoints} from '../../component/MapPoints/MapPoint';
import {NewInitialRegion} from '../../util/helper';
import {MapPopup} from '../../component';
import MapViewDirections from 'react-native-maps-directions';
import { Polyline } from 'react-native-maps';

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

const MapGraphScreen = ({navigation, route}) => {
  const [stroke1, setStroke1] = useState([]);
  const [stroke2, setStroke2] = useState([]);
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
    // lineBusStopsLoc(199, setStroke1);
    // lineBusStopsLoc(204, setStroke2);
    getStationLines({id: 199}, setStroke1);
    getStationLines({id: 204}, setStroke2);
    console.log(setStroke1);
    console.log(setStroke2);
    // getAllStations(initializeData);
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
    console.log(data);
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
        {/* {busStations.map((data, id) => {
          return (
            <MapMarker key={id} data={data} onClick={openBusStationDetail} />
          );
        })} */}
        {
          stroke1.length>0 && <MapViewDirections
          apikey={'AIzaSyAh73XM70RojdhGetvrR2YowEEDNX7NFOg'}
          origin={stroke1[0]}
          waipoints={stroke1}
          destination={stroke1[stroke1.length-1]}
          >
        </MapViewDirections>
        }
      </MapView>
      {/* {(stroke1.length>0) && <Polyline coordinates={stroke2} strokeColor="blue"/>} */}
      {isPopupVisible && (
        <MapPopup data={busStation} close={closeBusStationDetail} />
      )}
    </View>
  );
};
export default MapGraphScreen;
