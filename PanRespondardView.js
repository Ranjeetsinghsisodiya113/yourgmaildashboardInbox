



import React, { useRef, useState, useEffect } from 'react';
import { Animated, View, StyleSheet, PanResponder, Text } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

const PanRespondardView = () => {
    const [currentIndex, setCurrentIndex] = useState(0); // For React rendering
    const currentIndexRef = useRef(0); // Mutable reference for gesture tracking
    const pan = useRef(new Animated.ValueXY()).current; // Tracks the x and y movement

    const boxes = [
        { id: "1", title: "Slide 1", color: "#f0f8ff" },
        { id: "2", title: "Slide 2", color: "#faebd7" },
        { id: "3", title: "Slide 3", color: "#00ffff" },
        { id: "4", title: "Slide 4", color: "#7fffd4" },
        { id: "5", title: "Slide 5", color: "#f0ffff" },
        { id: "6", title: "Slide 6", color: "#f5f5dc" },
        { id: "7", title: "Slide 7", color: "#ffe4c4" },
        { id: "8", title: "Slide 8", color: "#000000" },
        { id: "9", title: "Slide 9", color: "#ffebcd" },
        { id: "10", title: "Slide 10", color: "#0000ff" },
        { id: "11", title: "Slide 11", color: "#8a2be2" },
        { id: "12", title: "Slide 12", color: "#a52a2a" },
        { id: "13", title: "Slide 13", color: "#deb887" },
        { id: "14", title: "Slide 14", color: "#5f9ea0" },
        { id: "15", title: "Slide 15", color: "#7fff00" },
        { id: "16", title: "Slide 16", color: "#d2691e" },
        { id: "17", title: "Slide 17", color: "#ff7f50" },
        { id: "18", title: "Slide 18", color: "#6495ed" },
        { id: "19", title: "Slide 19", color: "#fff8dc" },
        { id: "20", title: "Slide 20", color: "#dc143c" },
        { id: "21", title: "Slide 21", color: "#00ffff" },
        { id: "22", title: "Slide 22", color: "#00008b" },
        { id: "23", title: "Slide 23", color: "#008b8b" },
        { id: "24", title: "Slide 24", color: "#b8860b" },
        { id: "25", title: "Slide 25", color: "#a9a9a9" },
        { id: "26", title: "Slide 26", color: "#006400" },
        { id: "27", title: "Slide 27", color: "#bdb76b" },
        { id: "28", title: "Slide 28", color: "#8b008b" },
        { id: "29", title: "Slide 29", color: "#556b2f" },
        { id: "30", title: "Slide 30", color: "#ff8c00" },
        { id: "31", title: "Slide 31", color: "#9932cc" },
        { id: "32", title: "Slide 32", color: "#8b0000" },
        { id: "33", title: "Slide 33", color: "#e9967a" },
        { id: "34", title: "Slide 34", color: "#8fbc8f" },
        { id: "35", title: "Slide 35", color: "#483d8b" },
        { id: "36", title: "Slide 36", color: "#2f4f4f" },
        { id: "37", title: "Slide 37", color: "#00ced1" },
        { id: "38", title: "Slide 38", color: "#9400d3" },
        { id: "39", title: "Slide 39", color: "#ff1493" },
        { id: "40", title: "Slide 40", color: "#00bfff" }
    ]; // Array for boxes

    useEffect(() => {
        // Reset pan position when currentIndex changes
        pan.setValue({ x: 0, y: 0 });
    }, [currentIndex]);

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onPanResponderMove: Animated.event(
                [null, { dx: pan.x }],
                { useNativeDriver: false },
            ),
            onPanResponderRelease: (_, gestureState) => {
                if (gestureState.dx > 50) {
                    // Swiped right
                    if (currentIndexRef.current === 0) {
                        currentIndexRef.current = boxes.length - 1; // Loop to last item
                    } else {
                        currentIndexRef.current -= 1;
                    }
                } else if (gestureState.dx < -50) {
                    // Swiped left
                    if (currentIndexRef.current === boxes.length - 1) {
                        currentIndexRef.current = 0; // Loop to first item
                    } else {
                        currentIndexRef.current += 1;
                    }
                }
                setCurrentIndex(currentIndexRef.current); // Update state
                Animated.spring(pan, {
                    toValue: { x: 0, y: 0 },
                    useNativeDriver: false,
                }).start();
            },
        }),
    ).current;


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
        outputRange: ['120deg', '0deg', '-120deg'], // Rotate left and right
        extrapolate: 'clamp',
    });

    const rotateY_1 = pan.x.interpolate({
        inputRange: [-300, 0, 300],
        outputRange: ['60deg', '60deg', '-60deg'], // Rotate left and right
        extrapolate: 'clamp',
    });
    const rotateY_2 = pan.x.interpolate({
        inputRange: [-300, 0, 300],
        outputRange: ['30deg', '-60deg', '-90deg'], // Rotate left and right
        extrapolate: 'clamp',
    });

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>

                <View style={styles.boxContainer}>
                    {boxes.map((_, index) => {
                        // Determine the positions in a circular manner
                        const PrepreviousIndex = (currentIndex === 0) ? boxes.length - 2 :currentIndex === 1? boxes.length - 1 : currentIndex - 2;
                        const previousIndex = (currentIndex === 0) ? boxes.length - 1 : currentIndex - 1;
                        const nextIndex = (currentIndex === boxes.length - 1) ? 0 : currentIndex + 1;
                        const PrenextIndex = (currentIndex === boxes.length - 1) ? 1:(currentIndex === boxes.length - 2) ?0:currentIndex + 2;
                        if (index === currentIndex) {
                            // Current item
                            return (
                                <>
                                    <View style={{
                                        borderTopRightRadius: 20, borderTopLeftRadius: 20, alignItems: 'center', justifyContent: 'center', position: "absolute",
                                        top: 120, width: "90%", height: "5%", backgroundColor: 'black'
                                    }}>
                                        <Text style={{ color: _.color }}>{_.title}</Text>

                                    </View>
                                    <Animated.View

                                        key={index}
                                        style={[
                                            styles.box,
                                            { backgroundColor: _.color },
                                            {
                                                opacity,
                                                zIndex: 999,
                                                transform: [
                                                    { translateX: pan.x },
                                                    { scale },
                                                    { rotateY },
                                                ],
                                            },
                                        ]}
                                        {...panResponder.panHandlers}
                                    />
                                    <View style={{
                                        borderBottomRightRadius: 20, borderBottomLeftRadius: 20,
                                        alignItems: 'center', justifyContent: 'center', position: "absolute",
                                        bottom: 120, width: "90%", height: "5%", backgroundColor: 'black'
                                    }}>
                                        <Text style={{ color: _.color }}>{_.title}</Text>

                                    </View>
                                </>
                            );
                        } else if (index === previousIndex) {
                            // Previous item
                            return (
                                <Animated.View

                                    key={index}
                                    style={[
                                        styles.box,
                                        { backgroundColor: _.color },
                                        {
                                            opacity: 0.8,
                                            zIndex: 0.8,
                                            transform: [
                                                { translateX: -80 },
                                                { scale: 0.9 },
                                                { rotateY: rotateY_1 },
                                            ],
                                        },
                                    ]}
                                />
                            );
                        } else if (index === nextIndex) {
                            // Next item
                            return (
                                <Animated.View

                                    key={index}
                                    style={[
                                        styles.box,
                                        { backgroundColor: _.color },
                                        {
                                            opacity: 0.8,
                                            zIndex: 0.8,
                                            transform: [
                                                { translateX: 80 },
                                                { scale: 0.9 },
                                                { rotateY: rotateY_2 },
                                            ],
                                        },
                                    ]}
                                />
                            );
                        } else if (index === PrenextIndex) {
                            // Next item
                            return (
                                <Animated.View

                                    key={index}
                                    style={[
                                        styles.box,
                                        { backgroundColor: _.color },
                                        {
                                            opacity: 0.8,
                                            zIndex: 0.4,
                                            transform: [
                                                { translateX: 100 },
                                                { scale: 0.9 },
                                                { rotateY: rotateY_2 },
                                            ],
                                        },
                                    ]}
                                />
                            );
                        }
                        else if (index === PrepreviousIndex) {
                            // Next item
                            return (
                                <Animated.View

                                    key={index}
                                    style={[
                                        styles.box,
                                        { backgroundColor: _.color },
                                        {
                                            opacity: 0.8,
                                            zIndex: 0.4,
                                            transform: [
                                                { translateX: -100 },
                                                { scale: 0.9 },
                                                { rotateY: rotateY_1 },
                                            ],
                                        },
                                    ]}
                                />
                            );
                        }
                        else {
                            // Other items (invisible)
                            return (
                                <Animated.View

                                    key={index}
                                    style={[
                                        styles.box,
                                        { backgroundColor: _.color },
                                        {
                                            opacity: 0,
                                            zIndex: 0,
                                            transform: [
                                                { scale: 0.9 },
                                            ],
                                        },
                                    ]}
                                />
                            );
                        }



                    })}

                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',

    },
    titleText: {
        fontSize: 16,
        marginBottom: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    boxContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    box: {
        backgroundColor: "red",
        position: 'absolute', // Allow items to overlap
        height: 150,
        width: 250,
        backgroundColor: 'blue',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },

    boxText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default PanRespondardView;




