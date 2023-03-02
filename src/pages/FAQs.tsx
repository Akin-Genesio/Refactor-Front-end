import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import {
    Alert, Dimensions, FlatList, StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native';
import { BlueButton, FAQ, GreenButton, HeaderSimple, PopUpMenu, SafeAreaView, Symptom } from '../Components';
import { useAuth } from '../contexts';
import api from '../services/api';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface FAQProps{
    question: string;
    answer: string
}

export function FAQs(){
    const[isSearchFocused, setIsSearchFocused] = useState(false)
    const [isSearchFilled, setIsSearchFilled] = useState(false)
    const [search, setSearch] = useState<string>('')
    const searchRef = useRef(null)
    const [faq, setFaq] = useState<FAQProps[]>([])


    const [faqFilter, setFaqFilter] = useState<FAQProps[]>([])

    const navigation = useNavigation()

    
    useEffect(() => {
        async function fetchSymptoms(){
            const response = await api.get("/faq");
            setFaq(response.data.faqs)
            setFaqFilter(response.data.faqs)

        }
        fetchSymptoms();
    },[])
    
    //Functions handle for Search
    function handleInputSearchBlur(){
        setIsSearchFocused(false)
        setIsSearchFilled(!!search)
    }

    function handleInputSearchFocus(){
        setIsSearchFocused(true)
    }

    function handleInputSearchChange(value: string){
        setSearch(value)
        if(value){
            const newData = faq.filter(item => {
                const itemData = String(item.question)? String(item.question).toLocaleLowerCase() : ''
                const textData = value.toLocaleLowerCase()
                return itemData.indexOf(textData) > -1;
            })
            setFaqFilter(newData)
        }else{
            setFaqFilter(faq)
        }   
    }

    function handleQuestion(){
        navigation.navigate('NewQuestion')
    }


    return(
        <SafeAreaView 
            accessible={true}
        >
            <HeaderSimple
                titleScreen = "Perguntas Frequents"
            /> 
                <View style={styles.container}>
                    <View style={styles.bodyUp} accessible={true}>
                        <PopUpMenu
                            screenName='Perguntas Frequentes'
                        />
                        <View style={styles.textAPP} accessible={true}>
                            <Text style={styles.appName}>MoniPaEp</Text>
                        </View>
                    </View>
                    <View style={[
                            styles.search,
                            (isSearchFocused || isSearchFilled) && 
                            {borderColor: colors.blue}
                        ]}>
                        <TextInput
                            accessible={true}
                            placeholder="Digite uma pergunta"
                            style={styles.textSerch}
                            value={search}
                            ref = {searchRef}
                            onBlur={handleInputSearchBlur}
                            onFocus={handleInputSearchFocus}
                            onChangeText={handleInputSearchChange}
                        />
                        <MaterialIcons 
                            name="search" 
                            size={24} 
                            color="gray"
                            style={[
                                styles.Icon,
                                (isSearchFocused || isSearchFilled) && 
                                {color: colors.blue}
                            ]}
                            />
                    </View>
                    <View style={styles.symptomsList}>
                    <FlatList
                        data={faqFilter}
                        keyExtractor = {(item: { question: any; }) => String(item.question)}
                        renderItem = {({item}) => (
                            <FAQ
                                question={item.question}
                                answer={item.answer}
                            />
                        )}
                    />
                    </View>
                    <View style={styles.bottom}>
                        <BlueButton                            
                            accessibilityLabel="Botão. Clique para enviar uma pergunta"
                            title="Enviar uma Pergunta"
                            onPress={handleQuestion}
                        />
                    </View>
                </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
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
    icons: {
        padding: 20
    },
    appName:{
        fontFamily: fonts.appName,
        fontSize: 32,
        color: colors.blue
    },
    textAPP: {
        alignItems: 'center',
    },
    search: {
        flexDirection: 'row',
        borderWidth: 1,
        justifyContent: 'center',
        width: Dimensions.get('window').width * 0.9,
        backgroundColor: colors.gray_light1,
        borderColor: colors.black,
        height: 50,
        borderRadius: 100,
        
        alignItems: 'center'
    },
    textSerch:{
        color: colors.gray_dark2,
        width: '70%',
        fontFamily: fonts.generic,
        fontSize: 16,
    },
    Icon:{
        padding: 10,
    },
    symptomsList: {
        width: Dimensions.get('window').width * 0.8,
        paddingTop: 20,
        justifyContent: 'center'
    },
    bottom:{
        //marginTop: 40,
        width: Dimensions.get('window').width * 0.9,
        paddingBottom: 20,
        paddingTop: 30,   
    }
})
