import React from 'react';
import {Marker} from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';

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
        onPress={() => {
          onClick(data);
        }}
      />
    );
  }
}
export class PersonLocation extends React.PureComponent {
  constructor() {
    super();
  }
  render() {
    const {data} = this.props;
    return (
      <Marker
        // image={require('../../styles/img/bus-station.png')}
        coordinate={data}
        tracksViewChanges={false}
        focusable
        title={data['bus_stop_name']}>
        <Icon name={'user-circle-o'} color={'blue'} size={20} />
      </Marker>
    );
  }
}
