import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import AddTrip from '../screens/AddTrip';
import WelcomeScreen from '../screens/Welcome';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import {useDispatch, useSelector} from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';
import { setUser } from '../redux/features/userSlice';
import TripExpense from '../screens/TripExpense';
import AddExpense from '../screens/AddExpense';

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  const user = useSelector(state=> state?.userSlice?.user); 
  const dispatch = useDispatch()

  onAuthStateChanged(auth, u=>{
    console.log("got user:", u)
    dispatch(setUser(u))
  })

  console.log("loooo",user)

  
  if (!user) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="WelcomeScreen">
          <Stack.Screen
            options={{headerShown: false}}
            name="WelcomeScreen"
            component={WelcomeScreen}
          />
          <Stack.Screen
            options={{headerShown: false, presentation: 'modal'}}
            name="SignIn"
            component={SignIn}
          />
          <Stack.Screen
            options={{headerShown: false, presentation: 'modal'}}
            name="SignUp"
            component={SignUp}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="HomeScreen">
          <Stack.Screen
            options={{headerShown: false}}
            name="HomeScreen"
            component={HomeScreen}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="AddTrip"
            component={AddTrip}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="AddExpense"
            component={AddExpense}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="TripExpense"
            component={TripExpense}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
