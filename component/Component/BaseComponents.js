import React from 'react';
import {View} from 'react-native';

import {BaseViews} from '../../styles';
export const BaseView = ({children}) => {
  return <View style={BaseViews.BaseView}>{children}</View>;
};
