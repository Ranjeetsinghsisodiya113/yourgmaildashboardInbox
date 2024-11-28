import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import RouteNavigation from './src/navigator/RouteNavigation';
import { LoaderProvider } from "./src/components/LoaderContext";
const App = () => {
  return (
  <LoaderProvider>
   <NavigationContainer>
    <RouteNavigation />
   </NavigationContainer>
  </LoaderProvider>
  )
}

export default App

const styles = StyleSheet.create({})


// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, Button, StyleSheet, Alert, ImageBackground, TouchableOpacity } from 'react-native';

// import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';

// import auth from '@react-native-firebase/auth';

// import PanRespondardView from './src/PanRespondardView';
// import AwesomeButton from './src/AwesomeButton';
// import axios from 'axios';


// function App() {
//   const [username, setUserName] = useState(null)
//   const [user, setUser] = useState(null)
//   useEffect(() => {

//     GoogleSignin.configure({
//       webClientId: '815261605769-5tehkqe8rh0dvlrv5bg96pvjtajss60o.apps.googleusercontent.com',
//       scopes: ['https://www.googleapis.com/auth/gmail.modify',],
//     });
//   }, [])

//   const getMessageDetails = async (messageId, accessToken) => {
//     const url = `https://gmail.googleapis.com/gmail/v1/users/me/messages/${messageId}`;
  
//     try {
//       const response = await axios.get(url, {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });
  
//       // Extract subject from headers
//       const headers = response.data.payload.headers;
//       const subject = headers.find((header) => header.name === 'Subject')?.value || 'No Subject';
  
//       return { id: messageId, subject, threadId: response.data.threadId };
//     } catch (error) {
//       console.error(`Error fetching message ${messageId}:`, error);
//       throw error;
//     }
//   };
  
//   const fetchAllSubjects = async (messages, accessToken) => {
//     try {
//       const detailedMessages = await Promise.all(
//         messages.map((message) => getMessageDetails(message.id, accessToken))
//       );
  
//       console.log('Detailed Messages:', detailedMessages);
//       return detailedMessages;
//     } catch (error) {
//       console.error('Error fetching message subjects:', error);
//       throw error;
//     }
//   };
  

//   const fetchEmails = async () => {
//     try {
//       const tokens = await GoogleSignin.getTokens();
//       const response = await axios.get(
//         'https://gmail.googleapis.com/gmail/v1/users/me/messages',
//         {
//           headers: {
//             Authorization: `Bearer ${tokens.accessToken}`,
//           },
//         }
//       );
     
//       fetchAllSubjects(response.data.messages,tokens.accessToken)
//     } catch (error) {
//       if (error.response && error.response.status === 403) {
//         console.error('403 Forbidden: Check your API permissions or scopes.');
//       } else {
//         console.error('Error:', error.message);
//       }
//     }
//   };
//   // async function onGoogleButtonPress() {
//   //     // Check if your device supports Google Play
//   //     await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
//   //     // Get the users ID token
//   //     const { idToken } = await GoogleSignin.signIn();

//   //     // Create a Google credential with the token
//   //     const googleCredential = auth.GoogleAuthProvider.credential(idToken);

//   //     // Sign-in the user with the credential
//   //     return auth().signInWithCredential(googleCredential);
//   //   }


//   async function onGoogleButtonPress() {
//     try {
//       // Ensure the user is signed out from Google before signing in
//       await GoogleSignin.signOut();

//       // Check if your device supports Google Play
//       await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

//       // Get the user's ID token
//       const { idToken } = await GoogleSignin.signIn();
//       const tokens = await GoogleSignin.getTokens();
// console.log(tokens)
     
// fetchEmails(tokens)
//       // Create a Google credential with the token
//       const googleCredential = auth.GoogleAuthProvider.credential(idToken);

//       // Sign-in the user with the credential
//       return auth().signInWithCredential(googleCredential);
//     } catch (error) {
//       console.log('Error during Google Sign-In', error);
//       return
//     }
//   }

//   const signOut = async () => {
//     try {
//       await auth().signOut();
//       setUser(null)

//       console.log('User signed out!');
//     } catch (error) {
//       console.log('Sign out error', error);
//       return
//     }
//   };


//   return (<ImageBackground

//     source={require("./src/icons/Dashboard.png")}
//     style={{ flex: 1, justifyContent: 'center' }}>
//     {user == null ?
//       <>
//         <AwesomeButton title={"Login with Google!"} onPress={() => onGoogleButtonPress().then((res) => {
//           console.log('Signed in with Google!', res)
//           setUser(res)

//         })} />

//       </>
//       :
//       <>
//         <View style={{
//           alignSelf: 'center', borderTopRightRadius: 10, borderBottomLeftRadius: 10, borderTopLeftRadius: 10, justifyContent: 'center',
//           width: "90%", height: "15%", backgroundColor: 'transparent'
//         }}>
//           <Text style={{
//             fontSize: 24,
//             color: 'black',
//             fontWeight: 'bold'
//           }}>{"Welcome!"}

//           </Text>
//           <Text style={{
//             fontSize: 18,
//             color: 'black',
//             fontWeight: '600'
//           }}>{"Dear " + user?.additionalUserInfo?.profile?.name}

//           </Text>
//         </View>
//         <PanRespondardView />
//         <AwesomeButton title={"Google Sign-out"} onPress={() => signOut()
//         } />

//       </>


//     }

//   </ImageBackground>
//   )
// }

// const styles = StyleSheet.create({
//   button: {
//     backgroundColor: '#4285F4',
//     padding: 15,
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

// export default App