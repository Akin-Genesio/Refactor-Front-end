import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert, Dimensions, Keyboard, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import { BlueButton, HeaderSimple, PopUpMenu, SafeAreaView } from '../Components';
import api from '../services/api';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function FAQNewQuestion(){
    const[isQuestionFocused, setIsQuestionFocused] = useState(false)
    const [isQuestionFilled, setIsQuestionFilled] = useState(false)
    const [question, setQuestion] = useState<string>('')

    //Creating const for navigation
    const navigation = useNavigation()

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

    function handleProfile(){
        navigation.navigate('Profile')
    }

    async function handleQuestion(){
        if(question != ''){
            try{
                const response = await api.post("/faqsuggestions",{
                    question: question
                })
                Alert.alert(
                    "Questão Enviada",
                    "Sua pergunta foi enviada com sucesso e será analisada",
                    [
                        {
                            text: "Ok",
                            onPress: () => (handleProfile())
                        }
                    ]
                )
            }catch(error){
                Alert.alert(
                    "Erro ao enviar a pergunta",
                    error.response.data.message,
                    [
                        {
                            text: "Ok"
                        }
                    ]
                )
            }
        }
        else{
            Alert.alert(
                "Erro ao enviar a pergunta",
                "Por favor digite uma pergunta",
                [
                    {
                        text: "Ok"
                    }
                ]
            )
        }
        
    }
    return(
        <SafeAreaView
        accessible={true}
        >
            <HeaderSimple
                titleScreen = "Perguntas Frequents"
            />
            <TouchableWithoutFeedback
                    onPress={Keyboard.dismiss}
                >
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
                        style= {styles.boddy}
                    >
                        <View 
                            style={styles.textView}
                        >
                            <Text style={styles.text} accessible={true}>
                                Insira sua pergunta abaixo
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
                </TouchableWithoutFeedback>
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
    boddy:{
        justifyContent: 'center',
        alignItems: 'center',
        
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
        width: Dimensions.get('window').width * 0.9,
        borderWidth: 1,
        borderColor: colors.white,
        padding: 5,
        borderRadius: 8,
        backgroundColor: colors.gray_light1
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
        width: Dimensions.get('window').width * 0.8,
        paddingBottom: 20,
        paddingTop: Dimensions.get('window').height * 0.3,   

    }
})
