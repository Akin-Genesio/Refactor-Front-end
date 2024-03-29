import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Login } from './src/pages';
import AppLoading from 'expo-app-loading';
import * as SplashScreen from 'expo-splash-screen';
import {Routes} from './src/routes'
import {
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black, useFonts
} from '@expo-google-fonts/inter';


export default function App() {
  let [fontsLoaded] = useFonts({
    Inter_100Thin, 
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black 
  })

  if(!fontsLoaded){
    return (
      <AppLoading/>
    );
  }

  return(
    <>
      <StatusBar
        //barStyle="light-content"
        //backgroundColor="red"
        translucent = {true}
      />
      <Routes/>
    </>
    
  )

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
