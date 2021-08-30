import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Swiper from 'react-native-swiper';
import {Card, Button} from 'react-native-elements';
import { useIsFocused } from '@react-navigation/native';

const parcourchoix = (props) => {
  const isFocused = useIsFocused();
  if(isFocused) {
  return (
    <Swiper style={styles.wrapper} showsButtons={true} dotColor='#6a9fca' activeDotColor='#b0f2b6' >
    <View style={styles.slide}>
      <Text style={styles.bigtitle}>Parcours Débutant</Text>
      <Card containerStyle={{height:"60%",justifyContent: 'center', padding: 30,margin:10,borderRadius:15,shadowColor:"#000",shadowOpacity:0.8,shadowRadius:10, shadowOffset :{width:1,height:1}}}>
          <Card.Title style={styles.title}>ATTAQUE AU CENTRE VILLE</Card.Title>
          <Card.Image source={require('../assets/parcours-marseille.png')}></Card.Image>
          <Text style={styles.text}>Temps du parcours : 1h30</Text>
          <Text style={styles.text}>Distance à parcourir : 1,5km</Text>
          <Button  
          containerStyle={{width: "100%", marginTop:10, marginBottom: 100}} 
          buttonStyle={styles.button} 
          onPress={() =>props.navigation.navigate('trajet')}
          title='Démarrer'
          /> 
      </Card>
    </View>
    <View style={styles.slide}>
      <Text style={styles.bigtitle}>Parcours Intermédiaire</Text>
      <Card containerStyle={styles.card} >
          <Card.Title style={styles.title}>LES FONDS MARINS</Card.Title>
          <Card.Image source={require('../assets/parcours-marseille.png')}></Card.Image>
          <Text style={styles.text}>Temps du parcours : 2h15</Text>
          <Text style={styles.text}>Distance à parcourir : 2,7km</Text>
          <Button  
          containerStyle={{width: "100%", marginTop:10, marginBottom: 100}} 
          buttonStyle={styles.button} 
          onPress={() =>props.navigation.navigate('trajet2')}
          title='Démarrer'
          /> 
      </Card>
    </View>
    <View style={styles.slide}>
      <Text style={styles.bigtitle}>Parcours Avancé</Text>
      <Card containerStyle={styles.card}>
          <Card.Title style={styles.title}>LA FORET ENCHANTEE</Card.Title>
          <Card.Image source={require('../assets/parcours-marseille.png')}></Card.Image>
          <Text style={styles.text}>Temps du parcours : 3h30</Text>
          <Text style={styles.text}>Distance à parcourir : 3,1km</Text>
          <Button  
          containerStyle={{width: "100%", marginTop:10, marginBottom: 100}} 
          buttonStyle={styles.button} 
          onPress={() =>props.navigation.navigate('trajet3')}
          title='Démarrer'
          /> 
      </Card>
    </View>
  </Swiper>
);
} else {
  return <View style={{flex:1}}/>
}
};
const styles = StyleSheet.create({
  buttonnext:{
    color: 'white',
    marginRight: 10
  },
  buttonprev:{
    color: 'white',
    marginRight: 10
  },
  card: {
    height:"60%",
    justifyContent: 'center',
    padding: 30,
    margin:10,
    borderRadius:15,
    shadowColor:"#000",
    shadowOpacity:0.8,
    shadowRadius:10, 
    shadowOffset :{width:1,height:1}
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6a9fca'
  },
  
  bigtitle: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },
  button:{
      marginTop:15,
      marginBottom:5,
      borderRadius: 15,
      backgroundColor:'#b0f2b6',
      width:"100%"
  },
  title:{
      marginTop:80
  },
  text:{
      marginTop:10
  },
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
export default parcourchoix;