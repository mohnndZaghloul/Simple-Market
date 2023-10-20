import { createContext, useReducer } from "react";

//1-CONTEXT API WITH INTIAL STATE AND FUNCTIONS
export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({description, amount, date}) => {},
    setExpenses: (expenses) => {},
    deleteExpense: (id) => {},
    updateExpense: (id, { description, amount, date }) => {}
});

//4-REDUCER FUNCTION
function ExpensesReducer(state, action) {
    switch(action.type) {
        case 'ADD':
            //CREATE NEW ID AND RETURN OLD STATE WITH A NEW EXPENSE
            return [ action.payload , ...state];
        case 'SET' :
            //SET DATA TO THE BACKEND
            const inverted = action.payload.reverse();
            return inverted;
        case 'UPDATE':
            //GET INDEX OF EXPENSE WHICN NEED TO BE UPDATED AND PUT IT IN VAR
            const updatableExpenseIndex = state.findIndex((expense) => expense.id === action.payload.id);
            const updatableExpense = state[updatableExpenseIndex];
            //STORE EXPENSE'S CHANGES IN VAR 
            const updatedItem = {...updatableExpense, ...action.payload.data };
            //STORE ALL EXPENSES IN VAR 
            const updatedExpenses = [...state];
            //UPDATE THE CHANGED EXPENSE AND STORE RETURN IT
            updatedExpenses[updatableExpenseIndex] = updatedItem;
            return updatedExpenses;
        case 'DELETE':
            return state.filter((expense) => expense.id !== action.payload);
        default:
            return state;
    }
}
//2-PROVIDER FUNCTION
function ExpensesContextProvider({ children }) {
    //3-REDUCER
    const [expensesState, dispatch] = useReducer(ExpensesReducer, []);

    //5-FUNCTIONS WHICH PASS TYPE AND PAYLOAD FOR REDUCER BY DISPATCH
    function addExpense(expenseDate) {
        dispatch({ type: 'ADD', payload: expenseDate});
    }
    function setExpenses(expenses) {
        dispatch({ type: 'SET', payload: expenses});
    }
    function deleteExpense(id) {
        dispatch({ type: 'DELETE', payload: id});
    }
    function updateExpense(id, expenseDate) {
        dispatch({ type: 'UPDATE', payload: {id: id, data: expenseDate}})
    }
    //6-PASS VALUE BY CONTEXT PROVIDER
    const value = {
        expenses: expensesState,
        addExpense: addExpense,
        setExpenses: setExpenses,
        deleteExpense: deleteExpense,
        updateExpense: updateExpense
    }

    return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
};

export default ExpensesContextProvider ;