import React, { useState } from 'react';
import { Dimensions, KeyboardAvoidingView, StyleSheet, Text, TextInput, View } from 'react-native';
import { BlueButton, HeaderSimple, PopUpMenu, SafeAreaView } from '../Components';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function FAQNewQuestion(){
    const[isQuestionFocused, setIsQuestionFocused] = useState(false)
    const [isQuestionFilled, setIsQuestionFilled] = useState(false)
    const [question, setQuestion] = useState<string>('')

    //Functions handle for Question
    function handleInputQuestionBlur(){
        setIsQuestionFocused(false)
        setIsQuestionFilled(!!question)
    }

    function handleInputQuestionFocus(){
        setIsQuestionFocused(true)
    }

    function handleInputQuestionChange(value: string){
        setIsQuestionFilled(!!value)
        setQuestion(value)
    }

    function handleQuestion(){
        console.log("Send the question")
    }
    return(
        <SafeAreaView
        accessible={true}
        >
            <HeaderSimple
                titleScreen = "Perguntas Frequents"
            />
            <View
                style= {styles.body}
            >
                <View style={styles.bodyUp} accessible={true}>
                    <PopUpMenu
                        screenName='Nova Pergunta'
                    />
                    <View style={styles.textAPP} accessible={true}>
                        <Text style={styles.appName}>MoniPaEp</Text>
                    </View>
                </View>
                <View
                    accessible = {true}
                >
                    <View 
                        style={styles.textView}
                    >
                        <Text style={styles.text} accessible={true}>
                            Insira sua Pergunta abaixo
                        </Text>
                    </View>
                    <View
                        style={[
                            styles.inputText,
                            (isQuestionFocused || isQuestionFilled) && 
                            {borderColor: colors.blue}
                        ]}
                        accessible={true}
                    >
                        <TextInput
                            accessible={true}
                            placeholder="Digite sua Pergunta"
                            style={styles.input}
                            value = {question}
                            
                            onBlur={handleInputQuestionBlur}
                            onFocus = {handleInputQuestionFocus}
                            onChangeText = {handleInputQuestionChange}
                        />
                    </View>
                </View>
                <View
                    accessible={true}
                    style={styles.bottom}
                >
                    <BlueButton                            
                            accessibilityLabel="Botão. Clique para enviar a pergunta"
                            title="Enviar a Pergunta"
                            onPress={handleQuestion}
                        />
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    body:{
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center'
    },
    bodyUp: {
        width: '100%',
        height: Dimensions.get('window').height * 0.15,
        justifyContent: 'center',
        paddingBottom: 15
    },
    textView: {
        padding: 20
    },
    text:{
        fontFamily: fonts.warning,
        fontSize: 24
    },
    inputText:{
        //alignItems: 'center',
        height: Dimensions.get('window').height * 0.3,
        width: Dimensions.get('window').height * 0.5,
        borderWidth: 1,
        borderColor: colors.black,
        padding: 20
    },
    input:{
        fontFamily: fonts.text,
        fontSize: 15
    },
    appName:{
        fontFamily: fonts.appName,
        fontSize: 32,
        color: colors.blue
    },
    textAPP: {
        alignItems: 'center',
    },
    bottom:{
        //marginTop: 40,
        width: Dimensions.get('window').width * 0.9,
        paddingBottom: 20,
        paddingTop: 30,   
    }
})
