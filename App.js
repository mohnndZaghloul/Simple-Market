import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
//FONT
import { useFonts } from 'expo-font';
import * as splashScreen from 'expo-splash-screen';
//SCREENS
import ManageExpenses from './screens/ManageExpenses';
import AllExpenses from './screens/AllExpenses';
import RecentExpenses from './screens/RecentExpenses';
//NAVIGATION
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//UI COMPONENTS
import { GlobalStyles } from './constant/styles';
import IconButton from './components/Ui/IconButton';
import ExpensesContextProvider from './store/expenses-context';

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function ExpensesOverview () {
  return (
    <BottomTabs.Navigator screenOptions={({ navigation }) => ({
      headerStyle: {backgroundColor: GlobalStyles.colors.primary400},
      headerTintColor: GlobalStyles.colors.light,
      headerTitleStyle:{fontFamily:'open-sans'},
      tabBarStyle: {backgroundColor: GlobalStyles.colors.primary400},
      tabBarActiveTintColor: GlobalStyles.colors.secondry200,
      tabBarInactiveTintColor: GlobalStyles.colors.light,
      headerRight: ({tintColor}) => (
      <IconButton icon='add' size={24} color={tintColor} 
        onPress={() => {
          navigation.navigate('ManageExpense');
        }} />
    )})}>
      <BottomTabs.Screen 
        name='RecentExpenses' 
        component={RecentExpenses} 
        options={{
          title:'Recent Expenses',
          tabBarLabel: 'Recent',
          tabBarIcon: ({size, color}) => <Ionicons name='hourglass' size={size} color={color} />
        }}
      />
      <BottomTabs.Screen 
        name='AllExpenses' 
        component={AllExpenses} 
        options={{
          title:'All Expenses',
          tabBarLabel: 'All Expenses',
          tabBarIcon: ({size, color}) => <Ionicons name='calendar' size={size} color={color} />
        }}
      />
    </BottomTabs.Navigator>
  )
}

export default function App() {

  const [fontsLoaded] = useFonts({
    'open-sans': require('./assets/Fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/Fonts/OpenSans-Bold.ttf'),
  });

  useEffect(() => {
    async function prepare() {
      await splashScreen.preventAutoHideAsync();
    }
    prepare();
  },[])

  if (!fontsLoaded){
    return undefined;
  }else{
    splashScreen.hideAsync();
  }

  return (
    <>
      <StatusBar />
      <ExpensesContextProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{
            headerStyle: {backgroundColor: GlobalStyles.colors.primary400},
            headerTintColor: GlobalStyles.colors.light,
            headerTitleStyle:{fontFamily:'open-sans'}
          }}>
            <Stack.Screen 
              name='ExpensesOverview' 
              component={ExpensesOverview} 
              options={{headerShown: false}}  
            />
            <Stack.Screen 
              name='ManageExpense' 
              component={ManageExpenses} 
              options={{
                presentation: 'modal',
              }}/>
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
    </>
  );
}