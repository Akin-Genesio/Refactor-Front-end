import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import colors from '../styles/colors';
import fonts from '../styles/fonts';


interface AboutProps{
    main: string;
    secundary: string
}

export function About({
    main,
    secundary
    }: AboutProps){

    return(
        <View
            accessible={true}
            accessibilityLabel="Informações sobre o aplicativo" 
            style={styles.container}
        >
            <View style={styles.mainBox}>
                <Text style={styles.main}>{main}</Text>
            </View>
            <View style={styles.secundaryBox}>
                <Text style={styles.secundary}>{secundary}</Text>
            </View>           
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        //flex: 1,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderColor: colors.gray,
        padding: 10
        
    },
    main:{
        fontFamily: fonts.warning,
        fontSize: 20
        
    },
    secundary:{
        fontFamily: fonts.text,
        fontSize: 15,
        color: colors.gray,
    },
    mainBox:{
        padding: 10,
    },
    secundaryBox:{
        padding: 5,
    }
})