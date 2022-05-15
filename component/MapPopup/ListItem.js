import React from 'react';

import {View, Text} from 'react-native';

import {MapPopupComponent} from '../../styles';

export class ListItem extends React.PureComponent {
  constructor() {
    super();
  }
  render() {
    const {item} = this.props;
    return (
      <View
        style={MapPopupComponent.BusLinesData}
        onPress={() => {
          setSelectedValue(item);
        }}>
        <Text>{item['route_name']}</Text>
      </View>
    );
  }
}
