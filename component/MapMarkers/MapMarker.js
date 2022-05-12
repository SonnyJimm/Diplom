import React from 'react';
import {Marker} from 'react-native-maps';

export class MapMarker extends React.PureComponent {
  constructor() {
    super();
  }
  render() {
    const {data, onClick} = this.props;
    return (
      <Marker
        image={require('../../styles/img/bus-station.png')}
        coordinate={{latitude: data['lat'], longitude: data['long']}}
        tracksViewChanges={false}
        title={data['bus_stop_name']}
        onPress={()=>{onClick(data)}}
      />
    );
  }
}
