import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import SignIn from '../screens/auth/SignIn';
import DashBoard from '../screens/dashboard/DashBoard';
import Splash from '../screens/splash/Splash';


const Stack = createStackNavigator();



export default function RouteNavigation() {
  return (
    
      <Stack.Navigator initialRoute="Splash">
        <Stack.Screen name="Splash" component={Splash} options={{headerShown:false}}/>
        <Stack.Screen name="SignIn" component={SignIn}  options={{headerShown:false}} />
        <Stack.Screen name="DashBoard" component={DashBoard} options={{headerShown:false}}/>
     
      </Stack.Navigator>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
