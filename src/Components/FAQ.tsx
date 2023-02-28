import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import colors from '../styles/colors';
import fonts from '../styles/fonts';


interface FAQProps{
    question: string;
    answer: string
}

export function FAQ({
    question,
    answer
    }: FAQProps){

    return(
        <View
            accessible={true}
            accessibilityLabel="Pergunta e resposta vinculadas a perguntas frequentes" 
            style={styles.container}
        >
            <View style={styles.questionBox}>
                <Text style={styles.question}>{question}</Text>
            </View>
            <View style={styles.answerBox}>
                <Text style={styles.answer}>{answer}</Text>
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
    question:{
        fontFamily: fonts.warning,
        fontSize: 20
        
    },
    answer:{
        fontFamily: fonts.text,
        fontSize: 15,
        color: colors.gray,
    },
    questionBox:{
        padding: 10,
    },
    answerBox:{
        padding: 5,
    }
})