import { StyleSheet, View, Text } from 'react-native';
import { useState } from 'react';
import Input from './Input';
import Button from './Button';

import { GlobalStyles } from '../../constant/styles';
import { getFormattedDate } from '../../util/date';

const ExpenseForm = ({onCancel, onSubmit, submitButtonLabel, initialValues }) => {

    const [inputs,setInputs] = useState({
        amount: {
            value: initialValues ? initialValues.amount.toString() : '',
            isValid: true
        },
        date: {
            value: initialValues ? getFormattedDate(initialValues.date) : '',
            isValid: true
        },
        description:{
            value: initialValues ? initialValues.description : '',
            isValid: true
        }
    });

    function inputChangedHandler(inputIdentifier, enteredValue) {
        setInputs((prev) => {
            return {
                ...prev,
                [inputIdentifier]: {value: enteredValue, isValid: true}
            };
        });
    };

    function submitHandler() {
        const expenseData = {
            amount: +inputs.amount.value,
            date: new Date(inputs.date.value),
            description: inputs.description.value
        };
        //VALIDATION
        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
        const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
        const descriptionIsValid = expenseData.description.trim().length > 0;
        
        if( !amountIsValid || !dateIsValid || !descriptionIsValid ) {
            setInputs((prev) => {
                return {
                    amount: { value: prev.amount.value, isValid: amountIsValid},
                    date: { value: prev.date.value, isValid: dateIsValid},
                    description: { value: prev.description.value, isValid: descriptionIsValid}
                }
            })
            return;
        }
        onSubmit(expenseData);
    };
    
    const formIsInvalid = !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid;

    return (
    <View style={styles.form}>
        <Text style={styles.title}>Your Expense</Text>
        <View style={styles.inputRow}>
            <Input style={styles.rowInput} 
                label='Amount' 
                invalid={!inputs.amount.isValid}
                textInputConfig={{
                    keyboardType:'decimal-pad',
                    onChangeText: inputChangedHandler.bind(this, 'amount'),
                    value: inputs.amount.value
                }}/>
            <Input style={styles.rowInput} 
                label='Date' 
                invalid={!inputs.date.isValid}
                textInputConfig={{
                    placeholder: 'YYYY-MM-DD',
                    maxLength: 10,
                    onChangeText: inputChangedHandler.bind(this, 'date'),
                    value: inputs.date.value
                }}/>
        </View>
        <Input label='Description' 
            invalid={!inputs.description.isValid}
            textInputConfig={{
                multiline: true,
                onChangeText: inputChangedHandler.bind(this, 'description'),
                value: inputs.description.value
            }}/>
        {formIsInvalid && <Text style={styles.errorText}>Invalid data</Text>}
        <View style={styles.buttons}>
            <Button style={styles.button} mode='flat' onPress={onCancel}>
                Cancel
            </Button>
            <Button style={styles.button} onPress={submitHandler}>
                {submitButtonLabel}
            </Button>
        </View>
    </View>
    )
}

export default ExpenseForm;

const styles = StyleSheet.create({
    form: {
        marginTop: 40
    },
    title: {
        fontSize: 24,
        fontFamily: 'open-sans-bold',
        color: GlobalStyles.colors.primary50,
        marginVertical: 24,
        textAlign: 'center'
    },
    inputRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    errorText: {
        textAlign: 'center',
        color: GlobalStyles.colors.error100,
        margin: 8
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8
    },
    rowInput: {
        flex: 1
    }
});