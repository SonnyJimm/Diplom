/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';

// import {} from 'react-native/Libraries/NewAppScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
  createTables,
  dropTables,
  seederInitilizeBusLine,
  seederInitilizeBusStation,
  seederBusLineAndStationCon,
} from './util/db/db';
// import {seederInitilizeBusLine,seederInitilizeBusStation} from './util/db/busstation';
import {TextSearchScreens, MapSearchScreens} from './screens';
import {TabNavigatorStyle} from './styles';

import {LogBox} from 'react-native';

const Tab = createBottomTabNavigator();
LogBox.ignoreLogs([
  "ColorPropType will be removed from React Native. Migrate to ColorPropType exported from 'deprecated-react-native-prop-types'.",
  "PointPropType will be removed from React Native. Migrate to PointPropType exported from 'deprecated-react-native-prop-types'.",
  "EdgeInsetsPropType will be removed from React Native. Migrate to EdgeInsetsPropType exported from 'deprecated-react-native-prop-types'.",
  "ViewPropTypes will be removed from React Native. Migrate to ViewPropTypes exported from 'deprecated-react-native-prop-types'.",
]);
const options = {
  TextSearch: {
    title: 'Хайлт',
    tabBarIcon: ({size, focused, color}) => (
      <Icon name="search" size={size} color={color} />
    ),
  },
  MapSearch: {
    title: 'Газрын зураг',
    tabBarIcon: ({size, focused, color}) => (
      <Icon name="map" size={size} color={color} />
    ),
  },
};

const App = () => {
  useEffect(() => {
    // dropTables();
    // createTables();
    // seederInitilizeBusLine();
    // seederInitilizeBusStation();
    seederBusLineAndStationCon();
  }, []);
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={TabNavigatorStyle}>
        <Tab.Screen
          name="TextSearch"
          options={options.TextSearch}
          component={TextSearchScreens}
        />
        <Tab.Screen
          name="MapSearch"
          options={options.MapSearch}
          component={MapSearchScreens}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
