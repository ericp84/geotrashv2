import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux';
import {Button} from 'react-native-elements';

const homescreen = (props) => {
  const [firstname, setFirstname] = useState('')

  useEffect(()=> {
    setFirstname(props.name)
    console.log("fn/", firstname)
  })
    return (
        <View style={styles.container}>
            <Text style={styles.text1}>Salut {firstname.toUpperCase()} !</Text>
            <Text style={styles.text2}>quoi de prévu aujourd'hui ?</Text>
            <Text style={styles.text3}> envie de visiter un des plus beau spot de ta ville ?</Text>
            <Text style={styles.text4}> alors jette un oeil la dessus !</Text>
            <Button buttonStyle={styles.button} title="fais moi voir !" onPress={()=>props.navigation.navigate('BottomNavigator', {screen:'parcour'})}/>
        </View> 
    );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#6a9fca',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text1:{
      fontSize: 32,
      color: 'white',
     
    },
    text2:{
      fontSize: 24,
      color: 'white',
      marginBottom: 125,
      textAlign: 'center',
    },
    text3:{
      color: 'white',
      textAlign: 'center',
    },
    text4:{
      color: '#0a536a',
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 50
    },
    button:{
      marginTop: 35,
      marginBottom: 35,
      backgroundColor: '#b0f2b6',
      borderRadius: 15,
    },
  });

  function mapStateToProps(state) {
    return {name: state.name}
  }

export default connect(
  mapStateToProps,
  null
)(homescreen);