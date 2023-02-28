import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import {
    Alert, Dimensions, FlatList, StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native';
import { GreenButton, HeaderSimple, PopUpMenu, SafeAreaView, Symptom } from '../Components';
import { useAuth } from '../contexts';
import api from '../services/api';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface SymptomsProps{
    symptom: string
}

export function Symtopms(){
    const {user, refreshToken, token} = useAuth()
    const[isSearchFocused, setIsSearchFocused] = useState(false)
    const [isSearchFilled, setIsSearchFilled] = useState(false)
    const [search, setSearch] = useState<string>('')
    const [symptoms, setSymptoms] = useState<SymptomsProps[]>([])
    const searchRef = useRef(null)
    const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([])

    const [symptomsFilter, setSymptomsFilter] = useState<SymptomsProps[]>([])

    const navigation = useNavigation()

    
    useEffect(() => {
        async function fetchSymptoms(){
            const response = await api.get("/symptom");
            setSymptoms(response.data.symptoms)
            setSymptomsFilter(response.data.symptoms)

        }
        fetchSymptoms();
    },[])

    function handleProfile(){
        navigation.navigate('Profile')
    }
    
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
            const newData = symptoms.filter(item => {
                const itemData = String(item.symptom)? String(item.symptom).toLocaleLowerCase() : ''
                const textData = value.toLocaleLowerCase()
                return itemData.indexOf(textData) > -1;
            })
            setSymptomsFilter(newData)
        }else{
            setSymptomsFilter(symptoms)
        }
        
    }

    function handleSymptomSelection(title: string){
        if(selectedSymptoms.includes(title)){
            setSelectedSymptoms(selectedSymptoms.filter((symptom) => {
                return symptom != title
            }))
        }
        else{
            setSelectedSymptoms([...selectedSymptoms,title])
        }
        
    }

    async function handleSymptom(){
        if(selectedSymptoms.length > 0){
            try{
                await api.post("/symptomoccurrenceSeveral",{
                    patient_id: user?.id,
                    symptoms: selectedSymptoms
                })
                Alert.alert(
                    "Atualização concluida",
                    `Simtomas cadastrados: ${selectedSymptoms}`,
                    [
                        {
                            text: "Ok",
                            onPress: () => (handleProfile())
                        }
                    ]
                )
                console.log("Sintomas submetidos")
            }catch(error){
                
                Alert.alert(
                    "Erro na atualização de sintomas",
                    `${error.response.data.message}`,
                    [
                        {
                            text: "Ok",
                            onPress: () => (handleProfile())
                        }
                    ]
                )
                console.log(error.response.data.message);
                
            }
        }
        else{
            Alert.alert(
                "Erro na atualização de sintomas",
                `Selecione ao menos um sintoma`,
                [
                    {
                        text: "Entendi"
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
                titleScreen = "Atualizar Sintomas"
            /> 
                <View style={styles.container}>
                    <View style={styles.bodyUp} accessible={true}>
                        <PopUpMenu
                            screenName='Atualizar Sintomas'
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
                            placeholder="Digite um sintoma"
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
                        data={symptomsFilter}
                        keyExtractor = {(item: { symptom: any; }) => String(item.symptom)}
                        renderItem = {({item}) => (
                            <Symptom
                            parentHandleSelection = {handleSymptomSelection}
                            title = {item.symptom}
                        />
                        )}
                    />
                    </View>
                    <View style={styles.bottom}>
                        <GreenButton
                            
                            accessibilityLabel="Botão. Clique para ir para a página de atualizar sintomas"
                            title="Atualizar Sintomas"
                            onPress={handleSymptom}
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
