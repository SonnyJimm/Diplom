import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import SearchScreen from "./SearchScreen"
import {StackNavigationStyle} from "../../styles"
const Stack = createNativeStackNavigator()

const TextSearchScreens =()=>{

    return (
        <Stack.Navigator screenOptions={StackNavigationStyle} initialRouteName = "SearchScreen">
            <Stack.Screen name="SearchScreen" component={SearchScreen} />
        </Stack.Navigator>
    )
}
export default TextSearchScreens;