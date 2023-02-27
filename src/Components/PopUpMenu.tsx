import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { SafeAreaView } from './SafeAreaView';

export function PopUpMenu(){
    const [visible, setVisible] = useState(false)
    return(
        <View>
            <TouchableOpacity>
                <MaterialIcons style={styles.incons} name="menu" size={24} color="black" />
            </TouchableOpacity>
            <Modal
                transparent
                visible = {visible}
            >
                <SafeAreaView 
                    style={styles.areaView}
                    onTouchStart= {() => setVisible(false)}    
                >

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
        backgroundColor: 'red'
    }
  });