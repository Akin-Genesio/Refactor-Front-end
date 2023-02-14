import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface HeaderProps{
    titleScreen: string
}
export function HeaderWithOutGoBack({titleScreen}: HeaderProps){
    return(
        <View>
            <View style={styles.header}>
                <View style={styles.textScreenName}>
                    <Text style={styles.textScreenName}>
                        {titleScreen}
                    </Text>
                </View>
            </View>
        </View>
            
        
        
            
    )
}

const styles = StyleSheet.create({
    header:{
        width: '100%',
        height: Dimensions.get('window').height * 0.05,
        backgroundColor: colors.blue,
        flexDirection: 'row'   
    },
    incons: {
        paddingLeft: 5
    },
    textScreenName: {
        fontFamily: fonts.generic,
        fontSize: 20,
        paddingLeft: 15,
        color: colors.white,
        justifyContent: 'space-around'
    }
  });