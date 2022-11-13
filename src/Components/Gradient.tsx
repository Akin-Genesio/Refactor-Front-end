import React, { ReactNode } from 'react';
import {LinearGradient} from 'expo-linear-gradient'
import {StyleSheet} from 'react-native'
import colors from '../styles/colors';

type Props = {
    children: ReactNode
}

export function Gradient({children}: Props) {
    return(
        <LinearGradient
            style={styles.container}
            colors = {[colors.blue, colors.white]}
        >
            {children}
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})