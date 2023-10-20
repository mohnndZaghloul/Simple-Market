import { View, Text, StyleSheet } from 'react-native';
import { GlobalStyles } from '../constant/styles';

function ExpensesSummary({ expenses, periodName }) {

    const expensesSum = expenses.reduce((sum, expense) => {
        return sum + expense.amount;
    }, 0);

  return (
    <View style={styles.container}>
        <Text style={styles.period}>{periodName}</Text>
        <Text style={styles.sum}>${expensesSum.toFixed(2)}</Text>
    </View>
  );
}

export default ExpensesSummary ;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary200,
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  period: {
    fontSize: 12,
    fontFamily: 'open-sans',
    color: GlobalStyles.colors.light
  },
  sum: {
    fontSize: 16,
    fontFamily: 'open-sans-bold',
    color: GlobalStyles.colors.light
  }
});