import React from 'react';

import {TouchableOpacity, View, Text} from 'react-native';

import {ListItemStyle} from '../../styles';

import Icon from 'react-native-vector-icons/FontAwesome';

export class ListItem extends React.PureComponent {
  constructor() {
    super();
  }
  render() {
    const {item, setSelectedValue} = this.props;
    return (
      <TouchableOpacity
        style={ListItemStyle.ComponentStyle}
        onPress={() => {
          setSelectedValue(item);
        }}>
        <Text style={ListItemStyle.ComponentName}>{item['bus_stop_name']}</Text>
        <View style={ListItemStyle.ComponentIcon}>
          <TouchableOpacity style={ListItemStyle.IconTouchable}>
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
