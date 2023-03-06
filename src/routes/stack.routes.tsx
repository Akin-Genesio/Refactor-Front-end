import React from 'react';
import {createStackNavigator} from '@react-navigation/stack'
import colors from '../styles/colors';
import { Config, FAQNewQuestion, FAQs, HistoryOfSymptoms, Login, Profile, SignUp, Symtopms } from '../pages';

const stackRoutes = createStackNavigator()

const AppRoutes: React.FC = () => (
    <stackRoutes.Navigator
        headerMode="none"
        screenOptions={{
            cardStyle:{
                backgroundColor: colors.white
            }
        }}
    > 
        <stackRoutes.Screen
            name = "Login"
            component={Login}
        />

        <stackRoutes.Screen
            name = "SignUP"
            component={SignUp}
        />
        <stackRoutes.Screen
            name = "Profile"
            component={Profile}
        />

        <stackRoutes.Screen
            name = "Symptoms"
            component={Symtopms}
        />

        <stackRoutes.Screen
            name = "Config"
            component={Config}
        />

        <stackRoutes.Screen
            name = "FAQs"
            component={FAQs}
        />
        <stackRoutes.Screen
            name = "NewQuestion"
            component={FAQNewQuestion}
        />
        <stackRoutes.Screen
            name = "SymptomsHistory"
            component={HistoryOfSymptoms}
        />

    </stackRoutes.Navigator>
)

export default AppRoutes;