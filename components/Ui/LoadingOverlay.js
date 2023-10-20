import { View, ActivityIndicator, StyleSheet } from 'react-native'
import React from 'react'
import { GlobalStyles } from '../../constant/styles'

export default function LoadingOverlay() {
  return (
    <View style={styles.continer}>
      <ActivityIndicator size='large' color={GlobalStyles.colors.primary500} />
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
    }
});