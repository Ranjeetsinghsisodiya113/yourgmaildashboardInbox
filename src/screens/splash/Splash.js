import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { localStorage } from '../../components/localstorageProvider';
import { Colors, Font, mobileW } from '../../components/Colorsfont';
const Splash = ({ navigation }) => {
    useEffect(() => {

        async function fetchUser() {
            const users = await getUser(); // Wait for data
            console.log("user", users)
            if (users == null) {
                navigation.navigate('SignIn')
            } else {
                navigation.navigate('DashBoard')
            }
        }


        fetchUser();


    }, [])

    async function getUser() {
        let data = await localStorage.getItemObject('user')

        return data

    }

    async function getTokens() {
        let data = await localStorage.getItemString('accessToken')

        return data

    }

    return (
        <ImageBackground

            source={require("./../../icons/Dashboard.png")}
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{
                fontSize: mobileW * 5.5 / 100,
                color: Colors.black_color,
                fontFamily: Font.FontBold
            }}>{"Welcome to Gmail Box!"}</Text>
        </ImageBackground>
    )
}

export default Splash

const styles = StyleSheet.create({})