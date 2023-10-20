import { View, StyleSheet } from 'react-native';
import { useContext, useLayoutEffect, useState } from 'react';
import { ExpensesContext } from '../store/expenses-context';

import IconButton from '../components/Ui/IconButton';
import ExpenseForm from '../components/Ui/ExpenseForm';

import { GlobalStyles } from '../constant/styles';
import { deleteExpense, storeExpense, updateExpense } from '../util/http';
import LoadingOverlay from '../components/Ui/LoadingOverlay';
import ErrorOverlay from '../components/Ui/ErrorOverlay';

const ManageExpenses = ({ route, navigation }) => {
  const expensesCtx = useContext(ExpensesContext);

  const [error, setError] = useState(); 
  const [isSubmitting, setIsSubmitting] = useState(false);

  const editedExpenseId = route.params?.expenseId ;
  const isEditing = !! editedExpenseId;
  const selectedExpense = expensesCtx.expenses.find(expense => expense.id === editedExpenseId)

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense'
    });
  },[navigation,isEditing]);

  async function deleteExpenseHandler() {
    //DELETE DATA AT SERVER FIRST THEN LOCAL AT CONTEXT API
    setIsSubmitting(true);
    try {
      deleteExpense(editedExpenseId);
      expensesCtx.deleteExpense(editedExpenseId);
      navigation.goBack();
    } catch (error) {
      setError('Could not Delete expenses - please try again later.');
      setIsSubmitting(false);
    }
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(expenseData) {
    setIsSubmitting(true);
    try {
      if(isEditing){
        //UPDATE DATA AT SERVER FIRST THEN LOCAL AT CONTEXT API
        updateExpense(editedExpenseId, expenseData);
        expensesCtx.updateExpense(editedExpenseId,expenseData);
      }else{
        //STORE IN FIREBASE AND GET ID
        const id = await storeExpense(expenseData);
        //STORE IN LOCAL CONTEXT API
        expensesCtx.addExpense({...expenseData, id: id});
      }
      navigation.goBack();
    } catch (error) {
      setError('Could not save expenses - please try again later!');
      setIsSubmitting(false);
    }
  }

  if(error && !isSubmitting) {
    return <ErrorOverlay message={error} onConfirm={() => setError(null)}/>
  }

  if(isSubmitting) {
    return <LoadingOverlay />
  }

  return (
    <View style={styles.container}>
      <ExpenseForm 
        onCancel={cancelHandler} 
        onSubmit={confirmHandler}
        initialValues={selectedExpense}
        submitButtonLabel={isEditing ? 'Update' : 'Add'}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon='trash'
            size={36}
            color={GlobalStyles.colors.danger} 
            onPress={deleteExpenseHandler}
            />
        </View>
      )}
    </View>
  )
}

export default ManageExpenses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary500
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary300,
    alignItems: 'center'
  }
});