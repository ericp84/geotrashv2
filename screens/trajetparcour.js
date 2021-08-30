import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View , Image, TouchableOpacity } from 'react-native';
import { Overlay, Button} from 'react-native-elements';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import CountDown from 'react-native-countdown-component';
import { getDistance } from 'geolib';
import { useIsFocused } from '@react-navigation/native';


const trajetparcour = (props) => {
    const [missions, setMissions] = useState("");
    const [olmission, setOlmission] = useState(false);
    const isFocused = useIsFocused();
    console.log("focus?", isFocused)

    const coordDefi=[
        {lat : 43.293720,long:5.376880},
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
    
      console.log("focusout?", isFocused)
      return (
        <View style={{flex:1,flexDirection:'column', backgroundColor:'white', opacity: 1}}>
            <MapView
                style={styles.map}
                customMapStyle={mapStyle}
                showsUserLocation={true}
                showsMyLocationButton={true}
                initialRegion={{
                latitude: 43.294493,
                longitude: 5.375859,
                latitudeDelta: 0.0032,
                longitudeDelta: 0.0032,
                }}>   
                <Polyline
                    coordinates={[
                        {latitude : 43.295088,longitude:5.375998},
                        {latitude : 43.294888,longitude:5.376154},
                        {latitude : 43.294482,longitude:5.376331},
                        {latitude : 43.294336,longitude:5.376412},
                        {latitude : 43.294142,longitude:5.376482},
                        {latitude : 43.293971,longitude:5.376548},
                        {latitude : 43.293778,longitude:5.376623},
                        {latitude : 43.293682,longitude:5.376695},
                        {latitude : 43.293754,longitude:5.377060},
                        {latitude : 43.293792,longitude:5.377226},
                        {latitude : 43.293896,longitude:5.377223},
                        {latitude : 43.294042,longitude:5.377160},
                        {latitude : 43.294211,longitude:5.377048},
                        {latitude : 43.294526,longitude:5.376966},
                        {latitude:43.294689,longitude:5.376613},
                        {latitude:43.294630,longitude:5.376387},
                        {latitude:43.294570,longitude:5.376155},
                        {latitude:43.294493,longitude:5.375859},
                        {latitude:43.294426,longitude:5.375576},
                        {latitude:43.294326,longitude:5.375206},
                        {latitude:43.294228,longitude:5.374823},
                        {latitude:43.294325,longitude:5.374498}
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
                    coordinate={{ latitude: 43.295030, longitude: 5.375887 }}
                />
                <Marker 
                    pinColor="#FF00ff"
                    title="Arrival"
                    image={require('../assets/flag150.png')}
                    description="Ma position"
                    coordinate={{ latitude: 43.294325, longitude: 5.374498 }}
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
export default trajetparcour;