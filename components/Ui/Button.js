import { View, Text, Pressable, StyleSheet } from 'react-native';
import { GlobalStyles } from '../../constant/styles';

export default function Button({children, onPress, mode, style }) {
  return (
    <View style={style}>
        <Pressable onPress={onPress} style={({pressed}) => pressed && styles.pressed}>
            <View style={[styles.button, mode === 'flat' && styles.flat]}>
                <Text style={[styles.buttonText, mode === 'flat' && styles.flatText]}>{children}</Text>
            </View>
        </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 4,
        padding: 8,
        backgroundColor: GlobalStyles.colors.primary300
    },
    flat: {
        backgroundColor: 'transparent'
    },
    buttonText: {
        color: GlobalStyles.colors.light,
        textAlign: 'center',
        fontFamily: 'open-sans'
    },
    flatText: {
        color: GlobalStyles.colors.primary200
    },
    pressed: {
        opacity: 0.75,
        backgroundColor: GlobalStyles.colors.primary50,
        borderRadius: 4
    }
});