import { View, Text, StyleSheet } from 'react-native';
import ExpensesSummary from './ExpensesSummary';
import ExpensesList from './ExpensesList';
import { GlobalStyles } from '../constant/styles';



export default function ExpensesOutput({ expenses, expensesPeriod, fallbackText }) {

    let content = <Text style={styles.infoText}>{fallbackText}</Text>

    if(expenses.length > 0) {
        content = <ExpensesList expenses={expenses} />
    }

  return (
    <View style={styles.container}>
        <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
        {content}
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        paddingBottom: 0,
        backgroundColor: GlobalStyles.colors.primary50
    },
    infoText: {
        color: GlobalStyles.colors.primary200,
        fontSize: 16,
        fontFamily: 'open-sans-bold',
        textAlign: 'center',
        marginTop: 32
    }
});