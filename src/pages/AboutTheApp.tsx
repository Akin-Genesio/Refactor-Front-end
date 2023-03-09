import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import {
    Alert, Dimensions, FlatList, StyleSheet,
    Text,
    TextInput,
    ScrollView,
    View,
    KeyboardAvoidingView
} from 'react-native';
import { BlueButton, About, GreenButton, HeaderSimple, PopUpMenu, SafeAreaView, Symptom } from '../Components';
import { useAuth } from '../contexts';
import api from '../services/api';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface AboutProps{
    main: string;
    secundary: string
}

export function AboutTheApp(){
    const[isSearchFocused, setIsSearchFocused] = useState(false)
    const [isSearchFilled, setIsSearchFilled] = useState(false)
    const [search, setSearch] = useState<string>('')
    const searchRef = useRef(null)
    const [about, setAbout] = useState<AboutProps[]>([])


    const [aboutFilter, setAboutFilter] = useState<AboutProps[]>([])

    const navigation = useNavigation()

    
    useEffect(() => {
        async function fetchSymptoms(){
            const response = await api.get("/about");
            setAbout(response.data.AboutTheApps)
            setAboutFilter(response.data.AboutTheApps)

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
            const newData = about.filter(item => {
                const itemData = String(item.main)? String(item.main).toLocaleLowerCase() : ''
                const textData = value.toLocaleLowerCase()
                return itemData.indexOf(textData) > -1;
            })
            setAboutFilter(newData)
        }else{
            setAboutFilter(about)
        }   
    }


    return(
        <SafeAreaView 
            accessible={true}
            accessibilityLabel="Página de Informações sobre o aplicativo"
        >
            <HeaderSimple
                titleScreen = "Sobre o aplicativo"
            /> 
            <KeyboardAvoidingView style={styles.container}>
                <View style={styles.bodyUp} accessible={true}>
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
                <View style={styles.FAQList}>
                <FlatList
                    data={aboutFilter}
                    keyExtractor = {(item: { main: any; }) => String(item.main)}
                    renderItem = {({item}) => (
                        <About
                            main={item.main}
                            secundary={item.secundary}
                        />
                    )}
                />
                </View>
            </KeyboardAvoidingView>
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
    FAQList: {
        width: Dimensions.get('window').width * 0.8,
        height: Dimensions.get('window').height * 0.72,
        paddingTop: 20,
        paddingBottom: 10,
        justifyContent: 'center'
    },
})
