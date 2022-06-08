import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  PermissionsAndroid,
} from 'react-native';
import MapView ,{ Polyline} from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';
import {getAllStations,lineBusStopsLoc} from '../../util/db/busstation';

import {MapMarker, PersonLocation} from '../../component';

import {NewInitialRegion} from '../../util/helper';
import {MapPopup} from '../../component';

import Geolocation from 'react-native-geolocation-service';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  button: {
    position: 'absolute',
    bottom: 10,
    right: 20,
    width: 40,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 40,
  },
  buttonClose: {
    position: 'absolute',
    bottom: 60,
    right: 20,
    width: 40,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 40,
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
  const mapRef = useRef(null);
  const [initialRegion] = useState(NewInitialRegion(47.9177697, 106.9175774));
  const [busStations, setBusStations] = useState([]);
  const [busStation, setBusStation] = useState();
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isLocationActive, setLocationActive] = useState(false);
  const [isLineVisible, setLineVisible] = useState(false);
  const [lineLocations, setLineLocations] = useState([]);
  const [userLocation, setUserLocation] = useState(
    NewInitialRegion(47.9177697, 106.9175774),
  );

  let watchID = 0;
  const initializeData = data => {
    setBusStations(data);
  };
  useEffect(() => {
    getAllStations(initializeData);
    return () => {
      Geolocation.clearWatch(watchID);
    };
  }, []);
  useEffect(() => {
    // The screen is focused
    // Call any action
    if (route.params) {
      if (route.params.station) {
        const {station} = route.params;
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
  const activateLocation = () => {
    if (isLocationActive) {
      setLocationActive(false);
      Geolocation.clearWatch(watchID);
      // console.log(watchID);
    } else {
      setLocationActive(true);
      getLocation();
    }
  };
  const setLocationTrack = location => {
    setUserLocation(location);
    mapRef.current.animateToRegion(location);
  };
  const onChoose = data => {
    console.log(data);
    setLineVisible(true);
    lineBusStopsLoc(data["bus_lines_id"],setLineLocations)
  };
  const closeLines = () => {
    setLineVisible(false);
    setLineLocations([]);
  };

  const getLocation = async () => {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    watchID = Geolocation.watchPosition(
      data => {
        setLocationTrack(
          NewInitialRegion(data.coords.latitude, data.coords.longitude),
        );
        console.log(data);
      },
      error => {
        console.log(error);
      },
      {enableHighAccuracy: true, distanceFilter: 0, interval: 3000},
    );
    console.log(watchID);
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
        {isLocationActive && <PersonLocation data={userLocation} />}
        {(lineLocations.length>0) && <Polyline coordinates={lineLocations} strokeWidth={5} strokeColor="blue"/>}
      </MapView>
      {isPopupVisible && (
        <MapPopup
          data={busStation}
          onChoose={onChoose}
          close={closeBusStationDetail}
        />
      )}
      <TouchableOpacity style={styles.button} onPress={activateLocation}>
        <View style={{alignItems: 'center', marginTop: 7}}>
          <Icon
            name={'street-view'}
            size={30}
            color={isLocationActive ? 'blue' : 'black'}
          />
        </View>
      </TouchableOpacity>
      {isLineVisible && (
        <TouchableOpacity style={styles.buttonClose} onPress={closeLines}>
          <View style={{alignItems: 'center', marginTop: 3}}>
            <Icon
              name={'close'}
              size={30}
              color={isLocationActive ? 'blue' : 'black'}
            />
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};
export default MapSearchScreen;
