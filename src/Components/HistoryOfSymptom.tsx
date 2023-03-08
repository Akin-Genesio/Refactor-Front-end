import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import colors from '../styles/colors';
import fonts from '../styles/fonts';


interface HistoryOfSymptomProps{
    symptom_name: string[];
    registered_date: string
    id: string
}

export function HistoryOfSymptom({
    symptom_name,
    registered_date,
    id
    }: HistoryOfSymptomProps){

    return(
        <View
            accessible={true}
            accessibilityLabel="Simtomas registrados nesta data e horário" 
            style={styles.container}
        >
            <View style={styles.dateBox}>
                <Text style={styles.date}>Enviado em: {registered_date.split('T')[0]} {registered_date.split('T')[1].split('.')[0]} 
                    
                </Text>
            </View> 
            <View style={styles.symptomsBox}>
                <Text style={{fontFamily: fonts.warning, fontSize: 15}}>Sintoma: </Text>
                <Text style={styles.symptoms}>{symptom_name}</Text>
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
    symptoms:{
        fontFamily: fonts.text,
        fontSize: 15,
        
    },
    date:{
        fontFamily: fonts.generic,
        fontSize: 15,
    },
    symptomsBox:{
        padding: 10,
        flexDirection: 'row',
        //justifyContent: 'space-between'
    },
    dateBox:{
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',

    }
})