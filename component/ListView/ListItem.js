import React from 'react';

import {TouchableOpacity, View, Text} from 'react-native';

import {ListItemStyle, ListItemBusStationRes} from '../../styles';

import Icon from 'react-native-vector-icons/FontAwesome';

import {TRIP_START, TRIP_NODE, TRIP_END, TRIP_NONE} from '../../const';
export class ListItem extends React.PureComponent {
  constructor() {
    super();
  }
  render() {
    const {item, setSelectedValue, showBusStationLocation} = this.props;
    return (
      <TouchableOpacity
        style={ListItemStyle.ComponentStyle}
        onPress={() => {
          setSelectedValue(item);
        }}>
        <Text style={ListItemStyle.ComponentName}>{item['bus_stop_name']}</Text>
        <View style={ListItemStyle.ComponentIcon}>
          <TouchableOpacity
            style={ListItemStyle.IconTouchable}
            onPress={() => {
              showBusStationLocation(item);
            }}>
            <Icon
              name="map-marker"
              size={ListItemStyle.IconProp.size}
              color={ListItemStyle.IconProp.color}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  }
}
export class ListItemBusStops extends React.PureComponent {
  constructor() {
    super();
  }
  renderIcon(trip){
    switch(trip){
      case TRIP_START:
        return <Icon
        name="street-view"
        size={ListItemBusStationRes.Icon.size}
        color={ListItemBusStationRes.Icon.ActiveColor}
      />
      case TRIP_NONE:
        return <Icon
        name="chevron-down"
        size={ListItemBusStationRes.Icon.size}
        color={ListItemBusStationRes.Icon.inActiveColor}
      />
      case TRIP_END:
        return <Icon
        name="street-view"
        size={ListItemBusStationRes.Icon.size}
        color={ListItemBusStationRes.Icon.ActiveColor}
      />
      case TRIP_NODE:
        return <Icon
        name="chevron-down"
        size={ListItemBusStationRes.Icon.size}
        color={ListItemBusStationRes.Icon.ActiveColor}
      />
    }
  }
  render() {
    const {item} = this.props;
    console.log(item);
    return (
      <View style={ListItemBusStationRes.ListItem}>
       {this.renderIcon(item['trip'])}
        <Text style={ListItemBusStationRes.Text}>{item['bus_stop_name']}</Text>
      </View>
    );
  }
}
