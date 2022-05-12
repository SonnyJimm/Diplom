export const NewEmptyStation = stationName => {
  return {bus_stop_name: stationName, id: 0, lat: 0, long: 0};
};
export const NewInitialRegion = (lat, long) => {
  return {
    latitude: lat,
    longitude: long,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  };
};
