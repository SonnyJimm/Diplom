import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import {StackNavigationStyle} from "../../styles"
import MapSearchScreen from "./MapSearchScreen"
const Stack = createNativeStackNavigator()

const MapSearchScreens=()=>{

    return (
        <Stack.Navigator screenOptions={StackNavigationStyle} initialRouteName = "MapSearchScreen">
            <Stack.Screen name="MapSearchScreen" component={MapSearchScreen} />
        </Stack.Navigator>
    )
}
export default MapSearchScreens;