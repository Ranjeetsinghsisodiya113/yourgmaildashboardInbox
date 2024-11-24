import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, Animated, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'; // Install this library: npm install react-native-linear-gradient
import { Font, mobileH, mobileW } from './Colorsfont';

const AwesomeButton = ({ title = "Press Me", onPress }) => {
    const [scale] = useState(new Animated.Value(1));

    // Animation for press feedback
    const handlePressIn = () => {
        Animated.spring(scale, {
            toValue: 0.95,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scale, {
            toValue: 1,
            friction: 3,
            tension: 40,
            useNativeDriver: true,
        }).start();

        if (onPress) {
            onPress();
        }
    };

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            style={styles.container}
        >
            <Animated.View style={[styles.button, { transform: [{ scale }] }]}>
                <LinearGradient
                    colors={['#6a11cb', '#2575fc']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.gradient}
                >
                    <Text style={styles.text}>{title}</Text>
                </LinearGradient>
            </Animated.View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        alignSelf:'center',
        width:mobileW*60/100,
        marginVertical: 40,
    },
    button: {
        overflow: 'hidden',
    },
    gradient: {
        width:mobileW*60/100,
        height:mobileH*6/100,
        borderRadius:mobileW*2/100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: '#fff',
        fontSize: mobileW*4/100,
        fontWeight: Font.FontMedium
    },
});

export default AwesomeButton;
