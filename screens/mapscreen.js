import React, {useState, useEffect} from 'react';
import Mapview, {Marker, Polyline} from 'react-native-maps';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import { Overlay, Button} from 'react-native-elements';
import * as Location from 'expo-location';
import {getDistance} from 'geolib';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';


const mapscreen = () => {
  const [currentLatitude, setCurrentLatitude] = useState(0);
  const [currentLongitude, setCurrentLongitude] = useState(0);
///////////////////////////////////////////////////////////////////////////////////ajout poubelle///////////////////////////////////////////////////////////////////////////////////////
  const [loctrash, setLocTrash] = useState('');
  const [trashlist, setTrashList] = useState([]);
/////////////////////////////////////////////////////////////////////////////////overlay ajout poubelle////////////////////////////////////////////////////////////////////////////////
  const [visible, setVisible] = useState(false);
  const [lati, setLati] = useState(0.00);
  const [longi, setLongi] = useState(0.00);
  const [color, setColor] = useState('red');
/////////////////////////////////////////////////////////////////////////////////overlay distance//////////////////////////////////////////////////////////////////////////////////////
  const [distance, setDistance] = useState(false);
////////////////////////////////////////////////////////////////////////////////overlay filtre/////////////////////////////////////////////////////////////////////////////////////////
  const [overfilt, setOverfilt] = useState(false)  
////////////////////////////////////////////////////////////////////////////////affichage markers lancement appli//////////////////////////////////////////////////////////////////////
  const [markers, setMarkers] = useState([]);

  useEffect(()=> {
    async function askPermissions() {
      let {status} = await Location.requestForegroundPermissionsAsync();
      if(status === 'granted') {
        Location.watchPositionAsync({distanceInterval: 2}, 
          (location) => {
            setCurrentLatitude(location.coords.latitude);
            setCurrentLongitude(location.coords.longitude);
          }
        )
      }
    }
    askPermissions()
  }, [])
/////////////////////////////////////////////////////////////////////////caputre coords au clic sur mapview////////////////////////////////////////////////////////////////////////
  let trash = async (onPress) => {
    setLocTrash({latitude: onPress.nativeEvent.coordinate.latitude, longitude: onPress.nativeEvent.coordinate.longitude})
 }
////////////////////////////////////////////////////////////////////////fetch bdd enregistrement ajout poubelles//////////////////////////////////////////////////////////////////
  let trashmap = async(colorMarker, typeMarker) => {
    setTrashList([... trashlist, {latitude: loctrash.latitude, longitude: loctrash.longitude, color: colorMarker, type: typeMarker}])
    //'http:/192.168.137.1:3000/addtrash'
    const trashin = await fetch('https://geotrashv2-backend.herokuapp.com/addtrash', {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: `latitude=${loctrash.latitude}&longitude=${loctrash.longitude}&color=${colorMarker}&type=${typeMarker}`
    })
    const trashes = await trashin.json();
    console.log("trashes",trashes)
  }
////////////////////////////////////////////////////////////////////////.map ajout poubelles/////////////////////////////////////////////////////////////////////////////////////
  // let trashmarker = trashlist.map ((mark, i) => {
  //   return <Marker  key={i} onPress={()=> handleclic(mark.latitude, mark.longitude, mark.color)} pinColor={mark.color} coordinate={{latitude: mark.latitude, longitude: mark.longitude}}/>
  // })
///////////////////////////////////////////////////////////////////////rappel trash BDD au lancement appli///////////////////////////////////////////////////////////////////////
useEffect(()=> {
  async function trash() {
    //'http://192.168.137.1:3000/calltrash'
    const markstart = await fetch ('https://geotrashv2-backend.herokuapp.com/calltrash')
    const mark = await markstart.json();
    setMarkers(mark.recuptrash)
  }
  trash()
}, [trashlist, trashStart])
/////////////////////////////////////////////////////////////////////commandes filtre////////////////////////////////////////////////////////////////////////////////////////////
  const getMarkerFromColor = async (colormark) => {
    //`http://192.168.137.1:3000/trash/type/${colormark}`
  const filter = await fetch(`https://geotrashv2-backend.herokuapp.com/trash/type${colormark}`)
  console.log(colormark)
  const filterJson = await filter.json();
  setMarkers(filterJson.colorfilter)
  // console.log("filtre", markers)
  // console.log("filtre2", filterJson)
}
let handleclic =  (marklat, marklong, marcol) => {
  setDistance(true)
  setLati(marklat)
  setLongi(marklong)
  setColor(marcol)
}
// if(filterJson.colorfilter === 'red') {
//   setIconMark(require('../assets/mission150.png'))
// }
/////////////////////////////////////////////////////////////////////.map affichage trash bdd au lancement appli/////////////////////////////////////////////////////////////////
let trashStart = markers.map((marker, i) => {
  console.log("checkcolor", marker.color)
  console.log("color", color)
  return <Marker flat={false} icon={require('../assets/markouz.png')} title={marker.type} key={i} onPress={() => handleclic(marker.latitude, marker.longitude, marker.color)} pinColor={marker.color} coordinate={{latitude: marker.latitude, longitude: marker.longitude}}/>
})
/////////////////////////////////////////////////////////////////////commandes overlays//////////////////////////////////////////////////////////////////////////////////////////  
  const toggleOverlay = () => {
    setVisible(!visible);
  }
  const toggleDist = () => {
    setDistance(!distance)
  }
  const toggleFilt = () => {
    setOverfilt(!overfilt)
  }
////////////////////////////////////////////////////////////////////////////distance entre 2 points geolib///////////////////////////////////////////////////////////////////////
  let dist = getDistance (
    {latitude: currentLatitude, longitude: currentLongitude},
    {latitude: lati, longitude: longi}
    )
    return (
        <View style={styles.container}>
          <Mapview style={styles.map}
            onPress={(onPress)=> trash(onPress)}
            mapType={'terrain'}
            showsPointsOfInterest={false}
            showsBuildings={false}
            showsUserLocation={true}
            showsMyLocationButton={true}  
            followsUserLocation={true}
            initialRegion={{
              latitude: 44.0132738,
              longitude: 4.8769125,
              latitudeDelta: 1.1922,
              longitudeDelta: 1.1421,
            }}>
            {trashStart}
            {/* {trashmarker} */}
          </Mapview>
{/* ////////////////////////////////////////////////////////////////////////////////////////////////boutons filtres et ajout poubelle////////////////////////////////////////// */}
          <View style={styles.contain}><Button icon={<MaterialCommunityIcons style={styles.widget} name="map-marker-plus" size={35} color="#606060" onPress={toggleOverlay}/>} buttonStyle={styles.btn}  onPress={()=> console.log("ok")}/></View>
          <View style={styles.contain2}><Button icon={<Octicons style={styles.filter} name="settings" size={35} color="#606060" onPress={toggleFilt}/>} buttonStyle={styles.btn2}  /></View>
{/* //////////////////////////////////////////////////////////////////////////////////////////////////overlay type de poubelle à ajouter/////////////////////////////////////// */}
          <Overlay isVisible={visible} overlayStyle={styles.overlay} onBackdropPress={toggleOverlay}>
            <View style={styles.title}><Text style={styles.text}>vous avez découvert un nouveau bac ?</Text></View>
          <View style={styles.icons}>
            <TouchableOpacity onPress={()=>trashmap('yellow', 'papier')}>
              <Image style={styles.points} source={require('../assets/recyclepaper.png')}/>
            </TouchableOpacity>
            <Text style={styles.text}>Papier</Text>
            <TouchableOpacity onPress={()=>trashmap('red', 'dechet')}>
              <Image style={styles.points} source={require('../assets/dechet.png')}/>
            </TouchableOpacity>
            <Text style={styles.text}>Ordures mélangées</Text>
            <TouchableOpacity onPress={()=>trashmap('green', 'verre')}>
              <Image style={styles.points} source={require('../assets/recyclebottle.png')}/>
            </TouchableOpacity>
            <Text style={styles.text}>Verre</Text>
          </View>
          </Overlay>
{/* ///////////////////////////////////////////////////////////////////////////////////////////////////overlay distance//////////////////////////////////////////////////////// */}
          <Overlay overlayStyle={styles.over} isVisible={distance} onBackdropPress={toggleDist}>
            <Text style={styles.text2}> encore un effort ! vous n'êtes {"\n"}plus qu'à {"\n"}{dist} mètres !</Text>
            <Mapview
            style={styles.map}
            showsUserLocation={true}
            initialRegion={{
              latitude: currentLatitude,
              longitude: currentLongitude,
              latitudeDelta: 0.002,
              longitudeDelta: 0.002,
            }}>
              <Polyline
              coordinates= {[
                {latitude: currentLatitude, longitude: currentLongitude},
                {latitude: lati, longitude: longi}
               
              ]}
              strokeColor="#6a9fca"
              strokeWidth={5}
              lineDashPattern={[3]} 
              >
              </Polyline>
              <Marker
              pinColor= {color}
              coordinate={{latitude: lati, longitude: longi}}
              identifier={'mark1'}
              />
            </Mapview>
          </Overlay>
{/* //////////////////////////////////////////////////////////////////////////////////////////////////overlay filtre//////////////////////////////////////////////////////////////////// */}
            <Overlay isVisible={overfilt} overlayStyle={styles.overlay} onBackdropPress={toggleFilt}>
              <View style={styles.title}><Text style={styles.text}>vous avez découvert un nouveau bac ?</Text></View>
              <View style={styles.icons}>
                <TouchableOpacity onPress={()=>getMarkerFromColor('papier')}>
                  <Image style={styles.points} source={require('../assets/recyclepaper.png')}/>
                </TouchableOpacity>
                <Text style={styles.text}>Papier</Text>
                <TouchableOpacity onPress={()=>getMarkerFromColor('dechet')}>
                  <Image style={styles.points} source={require('../assets/dechet.png')}/>
                </TouchableOpacity>
                <Text style={styles.text}>Ordures mélangées</Text>
                <TouchableOpacity onPress={()=>getMarkerFromColor('verre')}>
                  <Image style={styles.points} source={require('../assets/recyclebottle.png')}/>
                </TouchableOpacity>
                <Text style={styles.text}>Verre</Text>
              </View>
            </Overlay>
        </View>
    ); 
};

const styles = StyleSheet.create({
  over:{
    display: 'flex',
    borderRadius: 15,
    flex :1,
    width : 350,
    maxHeight: 500,
    margin:10,
    backgroundColor: '#6a9fca',
    shadowColor: '#000000',
    shadowOffset: {
      width:0,
      height: 2
    },
    shadowColor:'#000000',
    shadowOpacity:0.9,
    elevation: 8,
    borderColor:'#000000',
    borderWidth: 1
  },
  btn:{
    width: 39.5,
    height: 39.5,
    backgroundColor:'rgba(255, 255, 255, 0.7)',
    borderRadius: 3,
    borderColor: 'rgba(0,0,0,0.11)',
    borderWidth: 1,
    shadowColor: '#606060',
    shadowOffset: {
      width: -2,
      heigth: 2
    },
    shadowOpacity: 1,
  },
  btn2:{
    width: 39.5,
    height: 39.5,
    backgroundColor:'rgba(255, 255, 255, 0.7)',
    borderColor: 'rgba(0,0,0,0.11)',
    borderWidth: 1,
    borderRadius: 3,
  },
  contain:{
    width: 50,
    backgroundColor:'transparent',
    position:'absolute',
    marginTop:80, 
    marginLeft: 361,
    borderRadius: 50,
  },
  contain2:{
    width: 50,
    backgroundColor:'transparent',
    position:'absolute',
    marginTop:123, 
    marginLeft: 361,
    borderRadius: 50,
  },
  widget:{
    backgroundColor: 'transparent', 
    position: 'absolute', 
    flex:1, 
    marginTop:100, 
    marginLeft: 365
  },
  filter:{
    backgroundColor: 'transparent', 
    position: 'absolute', 
    flex:1, 
    marginTop:155, 
    marginLeft: 365,
  },
  loc:{
    backgroundColor: 'transparent', 
    position: 'absolute', 
    flex:1, 
    marginTop:175, 
    marginLeft: 365,
  },
  text:{
    fontSize: 18,
    textAlign: 'center',
    color: '#ffffff'
  },
  text2:{
    fontSize: 20,
    textAlign: 'center',
    color: '#ffffff'
  },
  title:{
    flex:1,
    justifyContent: 'flex-start',
    maxHeight: 100,
  },
  icons:{
    flex:1,
    alignItems: 'center',
    justifyContent:'center',
    maxHeight: 200
  },
  points:{
    width: 30,
    maxHeight: 50,
    resizeMode: 'contain',
    backgroundColor: '#6a9fca'
  },
  overlay:{
    flex:1,
    maxHeight: 400,
    width: 300,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: '#6a9fca',
    borderRadius:15,
  },
    container: {
      flex:1,
      flexDirection:'column', 
      backgroundColor:'white', 
      opacity: 1
    },
    map:{
      marginTop: 25,
      flex:1,
      flexDirection:'column', 
      backgroundColor:'white', 
      opacity: 1,
      borderWidth:1,
      borderRadius: 50
    },
  });
export default mapscreen;