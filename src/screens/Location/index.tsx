import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Region,Marker}from 'react-native-maps'
import { StyleSheet } from 'react-native';
import { styles } from './styles';


export  function LocationScreen() {
  const [location, setLocation] = useState <Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState <string | null>(null);
  const [region,setRegion] = useState< Region>()
  const [marker,setMarker] = useState<Region[]>()
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.001,
        longitudeDelta:0.001
      })
      setMarker([
        {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.001,
        longitudeDelta:0.001
        }
      ])
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
   
  } else  if (location) {
    text = JSON.stringify(location);
   
    return(
      <View style={styles.map}>
        {region?(
          <MapView region={region} style={styles.map}>
            {marker && marker.map((i)=>(
              <Marker key={i.latitude} coordinate={i}/>
            ))}

          </MapView>
        ):(
          <Text style={styles.paragraph}>{text}</Text>
        )}
      </View>
    )
  }
}