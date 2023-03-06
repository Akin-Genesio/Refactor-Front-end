import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
    Dimensions, FlatList, StyleSheet,
    Text, View
} from 'react-native';
import { BlueButton, HeaderSimple, HistoryOfSymptom, PopUpMenu, SafeAreaView } from '../Components';
import { useAuth } from '../contexts';
import api from '../services/api';
import colors from '../styles/colors';
import fonts from '../styles/fonts';


interface HistoryOfSymptomProps{
    symptom_name: string[];
    registered_date: string
    id: string
}

export function HistoryOfSymptoms(){
    const [symptoms, setSymptoms] = useState<HistoryOfSymptomProps[]>([])
    const {user} = useAuth()

    const navigation = useNavigation()

    
    useEffect(() => {
        async function fetchSymptoms(){
            const response = await api.post("/symptomoccurrence/listOcurrences",{
                patient_id: user.id
            });
            setSymptoms(response.data.symptoms)

        }
        fetchSymptoms();
    },[])

    function handleSymptoms(){
        navigation.navigate('Symptoms')
    }

    return(
        <SafeAreaView 
            accessible={true}
            accessibilityLabel="Página de Histórico de Sintomas"
        >
            <HeaderSimple
                titleScreen = "Histórico de Sintomas"
            /> 
            <View style={styles.container}>
                <View style={styles.bodyUp} accessible={true}>
                    <PopUpMenu
                        screenName='Historico de Sintomas'
                    />
                    <View style={styles.textAPP} accessible={true}>
                        <Text style={styles.appName}>MoniPaEp</Text>
                    </View>
                </View>
                <View style={styles.SymptomList}>
                <FlatList
                    data={symptoms}
                    keyExtractor = {(item: { id: any; }) => String(item.id)}
                    renderItem = {({item}) => (
                        <HistoryOfSymptom
                            registered_date= {item.registered_date}
                            symptom_name= {item.symptom_name}
                            id= {item.id}
                        />
                    )}
                />
                </View>
                <View style={styles.bottom}>
                    <BlueButton
                        accessibilityLabel="Botão. Clique para enviar uma pergunta"
                        title="Atualizar Sintomas"
                        onPress={handleSymptoms}
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
    SymptomList: {
        width: Dimensions.get('window').width * 0.8,
        height: Dimensions.get('window').height * 0.6,
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
