import React from 'react';
import { StatusBar } from 'expo-status-bar';
import Routes from './src/routes';
import { StyleSheet, Text, View } from 'react-native';
import { Login } from './src/pages';
import AppLoading from 'expo-app-loading';
import * as SplashScreen from 'expo-splash-screen';
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
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {AuthProvider} from './src/contexts/Auth'


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
    <AuthProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <Routes/>
        </NavigationContainer>
      </SafeAreaProvider>
    </AuthProvider>
    
    
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
