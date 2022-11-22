import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native'
import {View, ActivityIndicator, StyleSheet} from 'react-native'

import {useAuth} from '../contexts/Auth'

import StackRoutes from './stack.routes'
import AuthRoutes from './auth.routes'
import AppRoutes from './app.routes'


export function Routes(){
    return(
        <NavigationContainer>
           <AuthRoutes/> 
        </NavigationContainer>
    )
}
