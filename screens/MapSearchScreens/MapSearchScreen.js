import React from 'react';
import { View,StyleSheet} from 'react-native';
import MapView from 'react-native-maps';
const styles = StyleSheet.create({
  container: {
    flex:1
  },
  map: {
    flex:1
  },
});

const MapSearchScreen = () => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}></MapView>
    </View>
  );
};
export default MapSearchScreen;
