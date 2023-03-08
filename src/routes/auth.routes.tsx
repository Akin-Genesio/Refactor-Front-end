import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { FAQsOpen, Login, SignUp } from '../pages';
const AuthStack = createStackNavigator()

const AuthRoutes: React.FC = () => (
    <AuthStack.Navigator headerMode = "none">
        <AuthStack.Screen name = "Login" component ={Login}/>
        <AuthStack.Screen name = "SignUP" component ={SignUp}/>
        <AuthStack.Screen name = "FAQsOpen" component ={FAQsOpen}/>
        
        
    </AuthStack.Navigator>
)

export default AuthRoutes;