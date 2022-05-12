import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {MapPopupComponent} from '../../styles/component';
import Icon from 'react-native-vector-icons/FontAwesome';
export const MapPopup = ({data, close}) => {
  return (
    <View style={MapPopupComponent.Wrapper}>
      <View style={MapPopupComponent.Title}>
        <View style={MapPopupComponent.TitleTextWrapper}>
          <Text style={MapPopupComponent.TitleText}>
            {data['bus_stop_name']}
          </Text>
        </View>
        <View style={MapPopupComponent.TitleCloseButtonWrapper}>
          <TouchableOpacity
            style={MapPopupComponent.TitleCloseButton}
            onPress={() => {
              close();
            }}>
            <Icon name="close" size={15} color={'black'} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
