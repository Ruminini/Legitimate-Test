import { TouchableOpacity, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ArrowLeft from '../assets/svg/arrow-left.svg'

export default function BackButton({ onPress, style}) {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
            <ArrowLeft width={50} height={50}/>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        marginHorizontal: 10,
        marginVertical: 5,
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 1,
    }
})