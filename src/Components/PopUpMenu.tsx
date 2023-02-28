import { MaterialIcons } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import { Alert, Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View, Animated, Easing } from 'react-native';
import { useAuth } from '../contexts';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { SafeAreaView } from './SafeAreaView';

interface PopUpMenuProps{
    screenName: string;
}
export function PopUpMenu({screenName}: PopUpMenuProps){
    const {user, signOut} = useAuth()
    const [visible, setVisible] = useState(false)
    const scale = useRef(new Animated.Value(0)).current

    function LogOut(){
        console.log("Tamo de saida")
        signOut
    }
    const options = [
        {
            title: 'Perfil',
            icon: 'account-circle',
            action: () => navigation.navigate('Profile')
        },
        {
            title: 'Atualizar Sintomas',
            icon: 'sick',
            action: () => navigation.navigate('Symptoms')
        },
        {
            title: 'Perguntas Frequentes',
            icon: 'chat',
            action: () => navigation.navigate('FAQ')
        },
        {
            title: 'Configurações',
            icon: 'settings',
            action: () => navigation.navigate('Config')
        },
        {
            title: 'Sair',
            icon: 'logout',
            action: () => signOut()
        }
    ]

    //Creating const for navigation
    const navigation = useNavigation()

    function resizeMenu(size: number){
        size === 1 && setVisible(true)
        Animated.timing(scale, {
            toValue: size,
            useNativeDriver: true,
            duration: 300,
            easing: Easing.linear
        }).start(() => size === 0 && setVisible(false))
    }

    return(
        <View>
            <TouchableOpacity
                onPress={() => resizeMenu(1)}
            >
                <MaterialIcons style={styles.incons} name="menu" size={24} color="black" />
            </TouchableOpacity>
            <Modal
                transparent
                visible = {visible}
            >
                <SafeAreaView 
                    style={styles.areaView}
                    onTouchStart= {() => resizeMenu(0)}    
                >
                    <Animated.View style={[
                        styles.popup,
                        {
                            opacity: scale.interpolate({
                                inputRange: [0,1],
                                outputRange: [0,1]
                            })
                        },
                        {
                            transform:[
                                {
                                    perspective: scale
                                
                                },
                            ]
                        }                        
                        ]}
                    >
                        {options.map((op, i)=> (
                            <TouchableOpacity
                                style={[
                                    styles.option,
                                    {borderBottomWidth: i === options.length - 1? 0 : 1},
                                    {borderBottomColor: op.title === screenName? colors.blue : '#fff'}
                                ]}
                                key={i}
                                onPress={op.action}
                            >
                                <Text style={[
                                    styles.text, 
                                    {color: op.title === screenName? colors.blue : colors.black}
                                    ]}>{op.title}</Text>
                                    <MaterialIcons 
                                        style={[
                                            styles.iconMenu,
                                            {color: op.title === screenName? colors.blue : colors.black}                                        
                                        ]} 
                                        name={op.icon} 
                                        size={24} 
                                        color="black" />
                                

                            </TouchableOpacity>
                        ))}
                    </Animated.View>
                </SafeAreaView>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    incons: {
        padding: 20
    },
    areaView: {
        flex: 1,
    },
    popup:{
        borderColor: '#FFF',
        borderWidth: 2,
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        position: 'absolute',
        top: 60,
        left: 1
    },
    text:{
        fontFamily: fonts.generic,
        fontSize: 16
    },
    option:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 7,
        borderBottomColor: '#ccc'
    },
    iconMenu:{
        padding: 10
    }
  });