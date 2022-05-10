import React, {useState,useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import MapView from 'react-native-maps';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

const MapSearchScreen = ({navigation, route}) => {
  const [initialRegion] = useState({
    latitude: 47.9177697,
    longitude: 106.9175774,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });
  const [busStation,setBusStation] =useState()
  useEffect(() => {
    if (route.params.station){
      setBusStation(route.params.station)
    }
  },[])
  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={initialRegion}>
    

      </MapView>
    </View>
  );
};0
export default MapSearchScreen;
