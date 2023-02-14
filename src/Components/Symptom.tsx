import Checkbox from 'expo-checkbox';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import colors from '../styles/colors';
import fonts from '../styles/fonts';


interface SymptopmProps{
    title: string;
    parentHandleSelection: (title: string)=>void;
}

export function Symptom({
    title,
    parentHandleSelection
    }: SymptopmProps){

    const[isSelected, setIsSelected] = useState(false);

    function handleSelected(){
        setIsSelected(!isSelected);
        parentHandleSelection(title)
        ///console.log("selected Const: "+isSelected)
    }
    return(
        <View
            accessible={true}
            accessibilityLabel="Caixa de seleção. Marque para selecionar o sintoma" 
            style={[
                    styles.inputField,
                    (isSelected) && 
                    {borderColor: colors.blue}
                ]}
        >
            <Text style={styles.label}>{title}</Text>
            <Checkbox style={styles.checkbox}
                value={isSelected}
                onValueChange={handleSelected}
                color={isSelected ? colors.green : undefined}
                
            />
        </View>
    )
}

const styles = StyleSheet.create({
    inputField: {
        //flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderColor: colors.gray,
        padding: 10
        
    },
    label:{
        fontFamily: fonts.generic,
        
    },
    checkbox:{
        
    }
})