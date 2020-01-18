import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';

function Main() {
    const [currentRegion, setCurrentRegion] = useState(null);

    useEffect(() => {
        async function loadInitialPosition() {
            const { granted } = await requestPermissionsAsync();

            if (granted) {
                const { coords } = await getCurrentPositionAsync({
                    enableHighAccurancy: true,
                });

                const { latitude, longitude } = coords;

                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.10,  // Calculos navais para obter zoom dentro mapa
                    longitudeDelta: 0.10, // Calculos navais para obter zoom dentro mapa
                })

            }
        }
        loadInitialPosition();
    }, []);

    if (!currentRegion) {
        return null;
    }
    return (
        <MapView initialRegion={currentRegion} style={styles.map}>
            <Marker coordinate={{ latitude: -21.767573, longitude: -48.157265 }}>
                <Image style={styles.avatar} source={{ uri: 'https://avatars2.githubusercontent.com/u/42758900?s=460&v=4' }} />
                <Callout>
                    <View style={styles.Callout}>
                        <Text style={styles.devName}>Diego Vespa</Text>
                        <Text style={styles.devBio}>BIO</Text>
                        <Text style={styles.devTechs}>Javascript, C#</Text>
                    </View>
                </Callout>
            </Marker>
        </MapView>
    );
}
const styles = StyleSheet.create({
    map: {
        flex: 1
    },
    avatar: {
        width: 54,
        height: 54,
        borderRadius: 4,
        borderWidth: 4,
        borderColor: '#FFF'
    },
    Callout: {
        width:260,
    },
    devName: {
        fontWeight:"bold",
        fontSize:16,
    },
    devBio: {
        color: "#666",
        marginTop: 5,
    },
    devTechs: {
        marginTop:5,
    },

})

export default Main; 