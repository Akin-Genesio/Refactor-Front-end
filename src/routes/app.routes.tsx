import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import {Config, FAQs, Profile, Symtopms } from '../pages';

const AppStack = createStackNavigator()

const AppRoutes: React.FC = () => (
    <AppStack.Navigator
        headerMode = "none"
    >
        <AppStack.Screen name = "Profile" component ={Profile}/>
        <AppStack.Screen name = "Symptoms" component ={Symtopms}/>
        <AppStack.Screen name = "Config" component ={Config}/>
        <AppStack.Screen name = "FAQ" component ={FAQs}/>
    </AppStack.Navigator>
)

export default AppRoutes;