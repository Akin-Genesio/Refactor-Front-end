import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import {Profile } from '../pages';

const AppStack = createStackNavigator()

const AppRoutes: React.FC = () => (
    <AppStack.Navigator
        headerMode = "none"
    >
        <AppStack.Screen name = "Profile" component ={Profile}/>
    </AppStack.Navigator>
)

export default AppRoutes;