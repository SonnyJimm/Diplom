import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import {StackNavigationStyle} from "../../styles"
import MapSearchScreen from "./MapSearchScreen"
import MapGraphScreen from "./MapGraphScreen"
const Stack = createNativeStackNavigator()

const MapSearchScreens=()=>{

    return (
        <Stack.Navigator screenOptions={StackNavigationStyle} initialRouteName = "MapSearchScreen">
            <Stack.Screen name="MapSearchScreen" component={MapSearchScreen} />
            <Stack.Screen name="MapGraphScreen" component={MapGraphScreen} />
        </Stack.Navigator>
    )
}
export default MapSearchScreens;