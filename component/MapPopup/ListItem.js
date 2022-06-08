import React from 'react';

import {View, Text,TouchableOpacity} from 'react-native';

import {MapPopupComponent} from '../../styles';

export class ListItem extends React.PureComponent {
  constructor() {
    super();
  }
  render() {
    const {item,onChoose} = this.props;
    return (
      <TouchableOpacity
        style={MapPopupComponent.BusLinesData}
        onPress={() => {
          onChoose(item);
        }}>
        <Text>{item['route_name']}</Text>
      </TouchableOpacity>
    );
  }
}
