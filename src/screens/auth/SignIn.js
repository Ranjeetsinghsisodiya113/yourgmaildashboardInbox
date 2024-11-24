import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ImageBackground, TouchableOpacity, ToastAndroid, BackHandler } from 'react-native';

import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';

import auth from '@react-native-firebase/auth';
import AwesomeButton from '../../components/AwesomeButton';
import { localStorage } from '../../components/localstorageProvider';

// import PanRespondardView from './src/PanRespondardView';
// import AwesomeButton from './src/AwesomeButton';
// import axios from 'axios';


function SignIn({ navigation }) {
  const [username, setUserName] = useState(null)
  const [user, setUser] = useState(null)
  useEffect(() => {

    GoogleSignin.configure({
      webClientId: '815261605769-5tehkqe8rh0dvlrv5bg96pvjtajss60o.apps.googleusercontent.com',
      scopes: ['https://www.googleapis.com/auth/gmail.modify',],
    });
  }, [])


  useEffect(() => {
    // Function to handle the back button press
    const handleBackPress = () => {
        Alert.alert(
            "Exit App",
            "Are you sure you want to exit?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "OK", onPress: () => BackHandler.exitApp() },
            ],
            { cancelable: false }
        );
        return true; // Returning `true` prevents the default back button behavior
    };

    // Add back handler listener
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    // Cleanup the listener on unmount
    return () => {
        BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
}, []);

  async function onGoogleButtonPress() {
    try {
      // Ensure the user is signed out from Google before signing in
      await GoogleSignin.signOut();

      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

      // Get the user's ID token
      const { idToken } = await GoogleSignin.signIn();
      const tokens = await GoogleSignin.getTokens();

      localStorage.setItemString("accessToken", tokens.accessToken)
      //fetchEmails(tokens)
      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.log('Error during Google Sign-In', error);
      return
    }
  }



  return (<ImageBackground

    source={require("./../../icons/Dashboard.png")}
    style={{ flex: 1, justifyContent: 'center' }}>

    <AwesomeButton title={"Login with Google!"} onPress={() => onGoogleButtonPress().then((res) => {

      if (res) {

        ToastAndroid.show("You're signin successfully", ToastAndroid.LONG)
        setUser(res)
        localStorage.setItemObject("user", res)
        navigation.navigate("DashBoard")
      } else {
        ToastAndroid.show("You have cancelled signin!", ToastAndroid.LONG)
      }
    })} />


  </ImageBackground>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#4285F4',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SignIn