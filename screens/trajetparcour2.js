import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View , Image, TouchableOpacity } from 'react-native';
import { Overlay, Button} from 'react-native-elements';
import MapView, { Marker, Polygon, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import { FontAwesome } from '@expo/vector-icons';
import CountDown from 'react-native-countdown-component';
import {useIsFocused} from '@react-navigation/native';


const trajetparcour2 = (props) => {
    const [missions, setMissions] = useState("");
    const [olmission, setOlmission] = useState(false);
    const isFocused = useIsFocused();

    const coordDefi=[
        {lat : 43.255215,long:5.374991},
    ];



    useEffect(()=> {
        async function askPermissions() {
          let {status} = await Location.requestForegroundPermissionsAsync();
          if(status === 'granted') {
            Location.watchPositionAsync({distanceInterval: 2})
          }
        }
        askPermissions()
      }, [])
  if(isFocused) {    
    const toggleMission = () => {
    setOlmission(!olmission);
    };

    let mission = ["cours le plus vite possible vers les bac de tri les plus proche ! p.s: fais attention aux voitures",
    "ramasse le plus vite possible 10 déchets autour de toi ! depeche toi le chrono va démarrer !",
    "demande à tes parents de t'aider à organiser une sortie avec tes amis pour ramasser des déchets dans la nature !"];
    let newmission = [...mission];
    function missionAleatoire() {
    let random = Math.floor(Math.random()*newmission.length);
    setMissions(newmission[random])
    console.log("nm", newmission.length)
    console.log("nmrandom", newmission[random])
    }

    let handleoverlayclick = () => {
        missionAleatoire();
        toggleMission()
    }

    var markerTrajDefis = coordDefi.map((defi, i) => {
        return (
        <Marker key={i} 
        pinColor="blue" 
        image={require('../assets/missionbis.png')}
        coordinate={{ latitude: defi.lat, longitude: defi.long }}
        onPress={()=>handleoverlayclick()}
        >
        <Overlay overlayStyle={styles.overmission} isVisible={olmission} onBackdropPress={toggleMission}>
            <Text style={styles.textover}>{missions}</Text>
            <CountDown
          until={60*10}
          onFinish={() => alert('temps écoulé ! bravo !')}
          onPress={() => alert('a toi de jouer !')}
          timeToShow={['M', 'S']}
          timeLabels={{m: '', s: ''}}
          size={20}
          digitStyle={{backgroundColor:'#6a9fca', borderWidth:1}}
        />        
         </Overlay>
        </Marker>
        )
  });
  let mapStyle = [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#f0ffff"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#746855"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#242f3e"
        }
      ]
    },
    {
      "featureType": "administrative",
      "elementType": "labels.text",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "administrative.locality",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#d59563"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#d59563"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#98fb98"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#6b9a76"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#eee8aa"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#606060"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9ca5b3"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#ffffff"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#606060"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#f3d19c"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#ffffff"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "labels.text",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#d59563"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#79c2e6"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#515c6d"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#17263c"
        }
      ]
    }
]
   
    return (
        <View style={{flex:1,flexDirection:'column', backgroundColor:'white', opacity: 1}}>
            <MapView
                style={styles.map}
                customMapStyle={mapStyle}
                showsUserLocation={true}
                showsMyLocationButton={true}
                initialRegion={{
                latitude: 43.261752,
                longitude: 5.379197,
                latitudeDelta: 0.0192,
                longitudeDelta: 0.0192,
                }}>
                <Polyline
                    coordinates={[
                        {latitude : 43.261752,longitude :5.379197},
                        {latitude : 43.261114,longitude :5.379134},
                        {latitude : 43.260690,longitude :5.379391},
                        {latitude : 43.260325,longitude :5.379635},
                        {latitude : 43.259419,longitude :5.380203},
                        {latitude : 43.258847,longitude :5.380582},
                        {latitude : 43.258404,longitude :5.380866},
                        {latitude : 43.257950,longitude :5.381164},
                        {latitude : 43.257078,longitude :5.381443},
                        {latitude : 43.256285,longitude :5.381698},
                        {latitude : 43.255690,longitude :5.381585},
                        {latitude : 43.255081,longitude :5.381016},
                        {latitude : 43.254839,longitude :5.380437},
                        {latitude : 43.254587,longitude :5.379781},
                        {latitude : 43.254478,longitude :5.379241},
                        {latitude : 43.254538,longitude :5.377938},
                        {latitude : 43.254611,longitude :5.376609},
                        {latitude : 43.254810,longitude :5.375273},
                        {latitude : 43.255524,longitude :5.375173},
                        {latitude : 43.256582,longitude :5.375763},
                        {latitude : 43.257096,longitude :5.375779},
                    ]}
                    strokeColor="#6a9fca"
                    strokeWidth={5}
                    lineDashPattern={[3]}
                    
              />
    
                {markerTrajDefis}
                <Marker 
                    pinColor="#FF0"
                    title="start"
                    image={require('../assets/go.png')}
                    description="Ma position"
                    coordinate={{ latitude: 43.2617000, longitude: 5.379050}}
                    />
                <Marker 
                    pinColor="#FF00ff"
                    title="Arrival"
                    image={require('../assets/flag150.png')}
                    description="Ma position"
                    coordinate={{ latitude: 43.257096, longitude: 5.375779}}
                />
            </MapView>
            <Button title="back" onPress={()=>props.navigation.navigate('BottomNavigator', {screen: 'home'})}/>
        </View>
        )
  } else {
    return <View style={{flex:1}}/>
  }
};
const styles = StyleSheet.create({
  overmission:{
    backgroundColor: '#6a9fca'
  },
  map:{
      marginTop: 25,
      flex:1,
      flexDirection:'column', 
      backgroundColor:'white', 
      opacity: 1
    },
  btnover:{
      backgroundColor: '#2c6e49',
      borderRadius: 15,
      marginTop: 15
  },

  overlay:{
      flexDirection:'column',
      alignItems:'center',
      backgroundColor: '#fff'
  },

  textover:{
      textAlign: 'center',
      fontSize:20,
      color:'white'
  },

  btn:{
      flex:1,
      flexDirection: 'row',
      alignItems:'center',
      justifyContent:'center',
      backgroundColor:'transparent'
  },

  container:{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff'
  },

  text:{
      fontWeight:'bold',
      fontSize:20,
      margin:30,
      alignItems :'center'
  },

  bloc:{
      display:'flex',
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center'
  },

  image:{
      resizeMode:'contain',
      flex:1,
      width :100
  },

  overl:{
      display:'flex',
      flex :1,
      width : 300,
      margin:10,
      alignItems:'center',
      justifyContent:'center'
  },

  button:{
      marginBottom : 10,
      borderRadius: 15,
      width:'50%',
      color:'#2c6e49'
  }  
})

export default trajetparcour2;