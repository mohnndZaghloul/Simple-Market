import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { GlobalStyles } from '../../constant/styles'
import Button from './Button';

export default function ErrorOverlay({message, onConfirm}) {
  return (
    <View style={styles.continer}>
        <Text style={[styles.text, styles.title]}>An Error occurred!</Text>
        <Text style={styles.text}>{message}</Text>
        <View style={styles.button}>
            <Button style={{width: 120}} onPress={onConfirm}>Okay</Button>
        </View>
    </View>
  )
};

const styles = StyleSheet.create({
    continer: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary50
    },
    text: {
        color: GlobalStyles.colors.primary500,
        fontFamily: 'open-sans',
        textAlign: 'center',
        marginBottom: 8
    },
    title: {
        fontSize: 20,
        fontFamily: 'open-sans-bold'
    },
    button: {
        alignItems: 'center',
        marginVertical: 8
    }
});