import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import SearchScreen from "./SearchScreen"
import SearchResult from "./SearchResult"
import {StackNavigationStyle} from "../../styles"
const Stack = createNativeStackNavigator()

const TextSearchScreens =()=>{

    return (
        <Stack.Navigator screenOptions={StackNavigationStyle} initialRouteName = "SearchScreen">
            <Stack.Screen name="SearchScreen" component={SearchScreen} />
            <Stack.Screen name="SearchResult" component={SearchResult} />
        </Stack.Navigator>
    )
}
export default TextSearchScreens;