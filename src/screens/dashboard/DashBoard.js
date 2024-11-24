



// import React, { useRef, useState, useEffect, useContext, useMemo } from 'react';
// import { Animated, View, StyleSheet, PanResponder, Text, ImageBackground } from 'react-native';
// import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
// import { localStorage } from '../../components/localstorageProvider';
// import axios from 'axios';
// import AwesomeButton from '../../components/AwesomeButton';
// import auth from '@react-native-firebase/auth';
// import { LoaderContext } from '../../components/LoaderContext';
// import Loader from '../../components/Loader';
// import { Colors, Font, mobileH, mobileW } from '../../components/Colorsfont';
// const DashBoard = ({ navigation }) => {
//     const [currentIndex, setCurrentIndex] = useState(0); // For React rendering
//     const currentIndexRef = useRef(0); // Mutable reference for gesture tracking
//     const pan = useRef(new Animated.ValueXY()).current; // Tracks the x and y movement
//     const [user, setUser] = useState(null)
//     const [accessToken, setAccessToken] = useState(null)
//     // const emailsRef = useRef([])
//     const [emails,setEmails] = useState([])
//     const { showLoader, hideLoader } = useContext(LoaderContext);


//     useEffect(() => {

//         async function fetchUser() {
//             const users = await getUser(); // Wait for data
//             setUser(users); // Update the state with the fetched data
//         }

//         async function fetchToken() {
//             const _accessToken = await getTokens(); // Wait for data
//             setAccessToken(accessToken); // Update the state with the fetched data
//             fetchEmails(_accessToken)
//         }
//         fetchUser();
//         fetchToken();

//     }, [])

//     async function getUser() {
//         let data = await localStorage.getItemObject('user')
//         return data

//     }

//     async function getTokens() {
//         let data = await localStorage.getItemString('accessToken')
//         return data

//     }

//     const getMessageDetails = async (messageId, accessToken) => {
//         const url = `https://gmail.googleapis.com/gmail/v1/users/me/messages/${messageId}`;

//         try {
//             const response = await axios.get(url, {
//                 headers: {
//                     Authorization: `Bearer ${accessToken}`,
//                 },
//             });

//             // Extract subject from headers
//             const headers = response.data.payload.headers;
//             const subject = headers.find((header) => header.name === 'Subject')?.value || 'No Subject';

//             return { id: messageId, subject, threadId: response.data.threadId };
//         } catch (error) {
//             console.error(`Error fetching message ${messageId}:`, error);
//             throw error;
//         }
//     };

//     const fetchAllSubjects = async (messages, accessToken) => {
//         showLoader()
//         try {
//             const detailedMessages = await Promise.all(
//                 messages.map((message) => getMessageDetails(message.id, accessToken))
//             );


//             hideLoader()
//             console.log(detailedMessages)
//             // emailsRef.current = detailedMessages;
//             setEmails(detailedMessages)

//         } catch (error) {
//             hideLoader()
//             console.error('Error fetching message subjects:', error);
//             throw error;
//         }
//     };


//     const fetchEmails = async (accessToken) => {
//         try {

//             const response = await axios.get(
//                 'https://gmail.googleapis.com/gmail/v1/users/me/messages',
//                 {
//                     headers: {
//                         Authorization: `Bearer ${accessToken}`,
//                     },
//                 }
//             );

//             fetchAllSubjects(response.data.messages, accessToken)
//         } catch (error) {
//             if (error.response && error.response.status === 403) {
//                 console.error('403 Forbidden: Check your API permissions or scopes.');
//             } else {
//                 console.error('Error:', error.message);
//             }
//         }
//     };

//     useEffect(() => {
//         // Reset pan position when currentIndex changes
//         pan.setValue({ x: 0, y: 0 });
//     }, [currentIndex]);

//     const panResponder = useRef(
//         PanResponder.create({
//             onMoveShouldSetPanResponder: () => true,
//             onPanResponderMove: Animated.event(
//                 [null, { dx: pan.x }],
//                 { useNativeDriver: false },
//             ),
//             onPanResponderRelease: (_, gestureState) => {
//                 if (gestureState.dx > mobileW * 20 / 100) {
//                     // Swiped right
//                     if (currentIndexRef.current === 0) {

//                         currentIndexRef.current = emails?.length - 1; // Loop to last item
//                     } else {
//                         currentIndexRef.current -= 1;
//                     }
//                 } else if (gestureState.dx < - mobileW * 20 / 100) {
//                     // Swiped left
//                     if (currentIndexRef.current === emails.current?.length - 1) {
//                         currentIndexRef.current = 0; // Loop to first item
//                     } else {
//                         currentIndexRef.current += 1;
//                     }
//                 }
//                 setCurrentIndex(currentIndexRef.current); // Update state
//                 Animated.spring(pan, {
//                     toValue: { x: 0, y: 0 },
//                     useNativeDriver: false,
//                 }).start();
//             },
//         }),
//     ).current;


//     const opacity = pan.x.interpolate({
//         inputRange: [-300, 0, 300],
//         outputRange: [0.5, 1, 0.5],
//         extrapolate: 'clamp',
//     });

//     const scale = pan.x.interpolate({
//         inputRange: [-300, 0, 300],
//         outputRange: [0.9, 1, 0.9],
//         extrapolate: 'clamp',
//     });
//     const rotateY = pan.x.interpolate({
//         inputRange: [-300, 0, 300],
//         outputRange: ['120deg', '0deg', '-120deg'], // Rotate left and right
//         extrapolate: 'clamp',
//     });

//     const rotateY_1 = pan.x.interpolate({
//         inputRange: [-300, 0, 300],
//         outputRange: ['120deg', '60deg', '-30deg'], // Rotate left and right
//         extrapolate: 'clamp',
//     });
//     const rotateY_2 = pan.x.interpolate({
//         inputRange: [-300, 0, 300],
//         outputRange: ['30deg', '-60deg', '-120deg'], // Rotate left and right
//         extrapolate: 'clamp',
//     });

//     const signOut = async () => {
//         try {
//             await auth().signOut();
//             localStorage.clear()

//             navigation.navigate("SignIn")
//         } catch (error) {
//             console.log('Sign out error', error);
//             return
//         }
//     };
//     return (
//         <SafeAreaProvider>
//             <Loader />
//             <ImageBackground

//                 source={require("./../../icons/Dashboard.png")} style={styles.container}>
//                 {user != null &&
//                     <View style={{
//                         alignSelf: 'center', justifyContent: 'center',
//                         width: mobileW * 90 / 100, marginTop: mobileH * 2 / 100,
//                     }}>
//                         <Text style={{
//                             fontSize: mobileW * 5.5 / 100,
//                             color: Colors.black_color,
//                             fontFamily: Font.FontBold
//                         }}>{"Welcome to Dashboard!"}

//                         </Text>
//                         <Text style={{
//                             fontSize: mobileW * 4 / 100,
//                             color: Colors.black_color,
//                             fontFamily: Font.FontMedium
//                         }}>{user?.additionalUserInfo?.profile?.name}

//                         </Text>
//                     </View>
//                 }

//                 {emails.length>0 &&
//                     <View style={styles.boxContainer}>
//                         {emails.map((_, index) => {
//                             console.log( emails?.length)
//                             // Determine the positions in a circular manner
//                             const previousIndex = (currentIndex === 0) ? emails?.length - 1 : currentIndex - 1;
//                             const nextIndex = (currentIndex === emails?.length - 1) ? 0 : currentIndex + 1;

//                             if (index === currentIndex) {
//                                 // Current item
//                                 return (
//                                     <>
                                        // <View style={{
                                        //     borderTopRightRadius: mobileW * 5 / 100, borderTopLeftRadius: mobileW * 5 / 100, alignItems: 'center', justifyContent: 'center', position: "absolute",
                                        //     top: mobileH * 20 / 100, width: mobileW * 90 / 100, height: mobileH * 5 / 100, backgroundColor: 'white'
                                        // }}>
                                        //     <Text style={{
                                        //         fontSize: mobileW * 4 / 100,
                                        //         color: Colors.black_color,
                                        //         fontFamily: Font.FontMedium
                                        //     }}>{"Mail Inbox"}

                                        //     </Text>
                                        // </View>
//                                         <Animated.View

//                                             key={index}
//                                             style={[
//                                                 styles.box,
//                                                 {
//                                                     opacity,
//                                                     zIndex: 1,
//                                                     transform: [
//                                                         { translateX: pan.x },
//                                                         { scale },
//                                                         { rotateY },
//                                                     ],
//                                                 },
//                                             ]}
//                                             {...panResponder.panHandlers}
//                                         >
//                                             <Text> {_.subject}</Text>
//                                         </Animated.View>
                                        // <View style={{
                                        //     borderBottomRightRadius: mobileW * 5 / 100, borderBottomLeftRadius: mobileW * 5 / 100,
                                        //     alignItems: 'center', justifyContent: 'center', position: "absolute",
                                        //     bottom: mobileH * 20 / 100, width: mobileW * 90 / 100, height: mobileH * 5 / 100, backgroundColor: 'white'
                                        // }}>
                                        //     <Text style={{
                                        //         fontSize: mobileW * 4 / 100,
                                        //         color: Colors.black_color,
                                        //         fontFamily: Font.FontMedium
                                        //     }}>{"Subject ^"}

                                        //     </Text>

                                        // </View>
//                                     </>
//                                 );
//                             } else if (index === previousIndex) {
//                                 // Previous item
//                                 return (
//                                     <Animated.View

//                                         key={index}
//                                         style={[
//                                             styles.box,
//                                             {
//                                                 opacity: 0.8,
//                                                 zIndex: 0,
//                                                 transform: [
//                                                     { translateX: -mobileW * 30 / 100 },
//                                                     { scale: 0.9 },
//                                                     { rotateY: rotateY_1 },
//                                                 ],
//                                             },
//                                         ]}
//                                     >
//                                         <Text> {_.subject}</Text>
//                                     </Animated.View>
//                                 );
//                             } else if (index === nextIndex) {
//                                 // Next item
//                                 return (
//                                     <Animated.View

//                                         key={index}
//                                         style={[
//                                             styles.box,
//                                             {
//                                                 opacity: 0.8,
//                                                 zIndex: 0,
//                                                 transform: [
//                                                     { translateX: mobileW * 30 / 100 },
//                                                     { scale: 0.9 },
//                                                     { rotateY: rotateY_2 },
//                                                 ],
//                                             },
//                                         ]}
//                                     >
//                                         <Text> {_.subject}</Text>
//                                     </Animated.View>
//                                 );
//                             } else {
//                                 // Other items (invisible)
//                                 return (
//                                     <Animated.View

//                                         key={index}
//                                         style={[
//                                             styles.box,
//                                             {
//                                                 opacity: 0,
//                                                 zIndex: 0,
//                                                 transform: [
//                                                     { scale: 0.9 },
//                                                 ],
//                                             },
//                                         ]}
//                                     >

//                                         <Text>
//                                             {_.subject}
//                                         </Text>
//                                     </Animated.View>
//                                 );
//                             }
//                         })}
//                     </View>
//                 }


//                 <View style={{ position: 'absolute', bottom: 0, width: mobileW * 100 / 100 }}>
//                     <AwesomeButton title={"Sign Out"} onPress={() => { signOut() }} />
//                 </View>

//             </ImageBackground>
//         </SafeAreaProvider>
//     );
// };



// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center',

//     },

//     boxContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',

//         width: mobileW * 100 / 100,
//     },
//     box: {
//         padding: mobileW * 5 / 100,
//         borderWidth: mobileW * 0.3 / 100,
//         borderColor: 'lightgrey',
//         position: 'absolute', // Allow items to overlap
//         height: mobileW * 35 / 100,
//         width: mobileW * 55 / 100,
//         backgroundColor: Colors.white_color,
//         borderRadius: mobileW * 2.5 / 100,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },

//     boxText: {
//         textAlign: 'center',
//         color: Colors.white_color,
//         fontSize: mobileW * 4 / 100,
//         fontFamily: Font.FontSemiBold
//     },
// });

// export default DashBoard



import React, { useRef, useState, useEffect, useContext, useMemo, useCallback } from 'react';
import { Animated, View, StyleSheet, PanResponder, Text, ImageBackground, Alert, ToastAndroid } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { localStorage } from '../../components/localstorageProvider';
import axios from 'axios';
import AwesomeButton from '../../components/AwesomeButton';
import auth from '@react-native-firebase/auth';
import { LoaderContext } from '../../components/LoaderContext';
import Loader from '../../components/Loader';
import { Colors, Font, mobileH, mobileW } from '../../components/Colorsfont';

const Dashboard = ({ navigation }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const pan = useRef(new Animated.ValueXY()).current; // Tracks x and y movement
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [emails, setEmails] = useState([]);
    const { showLoader, hideLoader } = useContext(LoaderContext);

    // Fetch user and token on mount
    useEffect(() => {
        const initialize = async () => {
            try {
                const savedUser = await localStorage.getItemObject('user');
                const savedToken = await localStorage.getItemString('accessToken');
console.log(savedUser)
                if (savedUser) setUser(savedUser);
                if (savedToken) {
                    setAccessToken(savedToken);
                    await fetchEmails(savedToken);
                }
            } catch (error) {
                console.error('Error initializing Dashboard:', error);
            }
        };
        initialize();
    }, []);

    // Fetch emails from Gmail API
    const fetchEmails = useCallback(async (token) => {
        showLoader();
        try {
            const response = await axios.get(
                'https://gmail.googleapis.com/gmail/v1/users/me/messages',
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (response.data?.messages?.length > 0) {
                await fetchEmailDetails(response.data.messages, token);
            } else {
                console.warn('No emails found.');
                hideLoader();
            }
        } catch (error) {
            console.error('Error fetching emails:', error.message);
            if (error.response?.status === 403) {
                console.error('403 Forbidden: Check API permissions or scopes.');
            }
            hideLoader();
        }
    }, []);

    // Fetch detailed email information
    const fetchEmailDetails = useCallback(async (messages, token) => {
        try {
            const detailedEmails = await Promise.all(
                messages.map(async (message) => {
                    const url = `https://gmail.googleapis.com/gmail/v1/users/me/messages/${message.id}`;
                    const response = await axios.get(url, {
                        headers: { Authorization: `Bearer ${token}` },
                    });

                    const subject =
                        response.data.payload.headers.find((header) => header.name === 'Subject')?.value || 'No Subject';

                    return { id: message.id, subject, threadId: response.data.threadId };
                })
            );
          
            setEmails(detailedEmails);
            hideLoader();
        } catch (error) {
            console.error('Error fetching email details:', error);
            hideLoader();
            if(error?.code=='401'){
                ToastAndroid.show("Session expired! Signin again",ToastAndroid.LONG)
                navigation.navigate("SignIn")
            }
             
        }
    }, []);

    // Reset pan position when `currentIndex` changes
    useEffect(() => {
        pan.setValue({ x: 0, y: 0 });
    }, [currentIndex]);

    // PanResponder setup for swiping
    const panResponder = useMemo(
        () =>
            PanResponder.create({
                onMoveShouldSetPanResponder: () => true,
                onPanResponderMove: Animated.event([null, { dx: pan.x }], { useNativeDriver: false }),
                onPanResponderRelease: (_, { dx }) => {
                    if (dx > mobileW * 20 / 100) {
                        // Swiped right
                        setCurrentIndex((prev) => (prev === 0 ? emails.length - 1 : prev - 1));
                    } else if (dx < -mobileW * 20 / 100) {
                        // Swiped left
                        setCurrentIndex((prev) => (prev === emails.length - 1 ? 0 : prev + 1));
                    }
                    Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: false }).start();
                },
            }),
        [emails.length]
    );

    // Animation interpolations
    const opacity = pan.x.interpolate({
        inputRange: [-300, 0, 300],
        outputRange: [0.5, 1, 0.5],
        extrapolate: 'clamp',
    });

    const scale = pan.x.interpolate({
        inputRange: [-300, 0, 300],
        outputRange: [0.9, 1, 0.9],
        extrapolate: 'clamp',
    });

    const rotateY = pan.x.interpolate({
        inputRange: [-300, 0, 300],
        outputRange: ['120deg', '0deg', '-120deg'],
        extrapolate: 'clamp',
    });

        const rotateY_1 = pan.x.interpolate({
        inputRange: [-300, 0, 300],
        outputRange: ['120deg', '60deg', '-30deg'], // Rotate left and right
        extrapolate: 'clamp',
    });
    const rotateY_2 = pan.x.interpolate({
        inputRange: [-300, 0, 300],
        outputRange: ['30deg', '-60deg', '-120deg'], // Rotate left and right
        extrapolate: 'clamp',
    });

    const signOut = async () => {
        try {
            await auth().signOut();
            await localStorage.clear();
            ToastAndroid.show("Signout Successfully",ToastAndroid.LONG)
            navigation.navigate('SignIn');
        } catch (error) {
            console.error('Sign out error:', error);
        }
    };

    // Memoized rendering of email cards
    const emailCards = useMemo(() => {
        const previousIndex = currentIndex === 0 ? emails.length - 1 : currentIndex - 1;
        const nextIndex = currentIndex === emails.length - 1 ? 0 : currentIndex + 1;

        return emails.map((email, index) => {
            if (index === currentIndex) {
                return (
                    <Animated.View
                        key={index}
                        style={[
                            styles.box,
                            { opacity, zIndex: 1, transform: [{ translateX: pan.x }, { scale }, { rotateY }] },
                        ]}
                        {...panResponder.panHandlers}
                    >
                         <Text
                          numberOfLines={4}
                         style={{
                            fontSize: mobileW * 4 / 100,
                            color: Colors.black_color,
                            fontFamily: Font.FontMedium
                        }}>{email.subject}

                        </Text>
                    </Animated.View>
                );
            } else if (index === previousIndex) {
                return (
                    <Animated.View
                        key={index}
                        style={[
                            styles.box,
                            { opacity: 0.8, zIndex: 0, transform: [{ translateX: -mobileW * 30 / 100 }, { scale: 0.9 },{rotateY:rotateY_1}] },
                        ]}
                    >
                        <Text 
                         numberOfLines={4}
                        style={{
                            fontSize: mobileW * 4 / 100,
                            color: Colors.black_color,
                            fontFamily: Font.FontMedium
                        }}>{email.subject}

                        </Text>
                    </Animated.View>
                );
            } else if (index === nextIndex) {
                return (
                    <Animated.View
                        key={index}
                        style={[
                            styles.box,
                            { opacity: 0.8, zIndex: 0, transform: [{ translateX: mobileW * 30 / 100 }, { scale: 0.9 },{rotateY:rotateY_2}] },
                        ]}
                    >
                      
                        <Text 
                        numberOfLines={4}
                        style={{
                            fontSize: mobileW * 4 / 100,
                            color: Colors.black_color,
                            fontFamily: Font.FontMedium
                        }}>{email.subject}

                        </Text>
                      
                    </Animated.View>
                );
            } else {
                return null;
            }
        });
    }, [emails, currentIndex, pan.x]);

    return (
        <SafeAreaProvider>
            <Loader />
            <ImageBackground source={require('./../../icons/Dashboard.png')} style={styles.container}>
                {user && (
                    <View style={styles.header}>
                        <Text style={styles.welcomeText}>Welcome to Dashboard!</Text>
                        <Text style={styles.userName}>{user?.additionalUserInfo?.profile?.name}</Text>
                    </View>
                )}
 <View style={{
                                            borderTopRightRadius: mobileW * 5 / 100, borderTopLeftRadius: mobileW * 5 / 100, alignItems: 'center', justifyContent: 'center', position: "absolute",
                                            top: mobileH * 35 / 100, width: mobileW * 90 / 100, height: mobileH * 5 / 100, backgroundColor: 'white'
                                        }}>
                                            <Text style={{
                                                fontSize: mobileW * 4 / 100,
                                                color: Colors.black_color,
                                                fontFamily: Font.FontMedium
                                            }}>{"Mail Inbox"}

                                            </Text>
                                        </View>
                {emails.length > 0 && <View style={styles.boxContainer}>{emailCards}</View>}
                <View style={{
                                            borderBottomRightRadius: mobileW * 5 / 100, borderBottomLeftRadius: mobileW * 5 / 100,
                                            alignItems: 'center', justifyContent: 'center', position: "absolute",
                                            bottom: mobileH * 25 / 100, width: mobileW * 90 / 100, height: mobileH * 5 / 100, backgroundColor: 'white'
                                        }}>
                                            <Text style={{
                                                fontSize: mobileW * 4 / 100,
                                                color: Colors.black_color,
                                                fontFamily: Font.FontMedium
                                            }}>{"Subject ^"}

                                            </Text>

                                        </View>
                <View style={styles.footer}>
                    <AwesomeButton title="Sign Out" onPress={signOut} />
                </View>
            </ImageBackground>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center' },
    header: { alignSelf: 'center', marginTop: mobileH * 2 / 100 },
    welcomeText: { fontSize: mobileW * 5.5 / 100, color: Colors.black_color, fontFamily: Font.FontBold },
    userName: { fontSize: mobileW * 4 / 100, color: Colors.black_color, fontFamily: Font.FontMedium },
    boxContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    box: {
        padding: mobileW * 5 / 100,
        borderWidth: 0.3,
        borderColor: Colors.gray_color,
        position: 'absolute',
        height: mobileW * 35 / 100,
        width: mobileW * 55 / 100,
        backgroundColor: Colors.white_color,
        borderRadius: mobileW * 1 / 100,
    },
    footer: {position:'absolute',bottom:0, marginBottom: mobileH * 4 / 100 },
});

export default Dashboard;
