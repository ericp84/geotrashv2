import React, {useState} from 'react';
import {StyleSheet,Text,TextInput, View, Image,ScrollView, SafeAreaView} from 'react-native';
import {Input,Button} from 'react-native-elements';
import { connect } from 'react-redux';


const login = (props) => {
    const [emailin, setEmailIn] = useState('');
    const [passwordin, setPasswordIn] = useState('');
    const [userexist, setUserExist] = useState(false);
    const [errorsignin, setErrorSignin] = useState([])
    // https://mysterious-plateau-19771.herokuapp.com/login
    let handleSignin = async () => {
        const user = await fetch('http:/192.168.137.1:3000/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: `email=${emailin}&password=${passwordin}`
        })
        const userin = await user.json()
        console.log("user in ////",userin)
        console.log("userexist",userexist)

        if(userin.result === false){
            setErrorSignin(userin.error)
            return (props.navigation.navigate('login')) ////////////////////remettre return (props.navigation.navigate('login')) /////////////
        } else {
            props.sendfirstname(userin) 
            console.log("userinfn///",props.sendfirstname)
            setUserExist(true);
            return (props.navigation.navigate('BottomNavigator', {screen: 'home'}));
        }   
    }   
    let errorsin = errorsignin.map((error, i) => {
         return <Text key={i}>{error}</Text>
    })
    
    return (
                <View style={styles.container}>
                    <Image style={styles.image} source={require('../assets/logo.png')}/>
                    <TextInput onChangeText={(value) => setEmailIn(value)} style={styles.input}  name='email' placeholder="Email"/>
                    <TextInput onChangeText={(value) => setPasswordIn(value)} style={styles.input} name='password' placeholder="Password" secureTextEntry={true}/>
                    {errorsin}
                    <Button  containerStyle={{width: "80%", marginTop:10, marginBottom: 100}} buttonStyle={styles.button}  onPress={() => handleSignin() } title='Connexion'/>  
                    <Text>Vous n'avez pas de compte,  <Text style={styles.text}onPress={() =>props.navigation.navigate('signup')}>Créer un compte</Text></Text>
                </View>
    );     
};

const styles = StyleSheet.create({
    text:{
        color:'#b0f2b6',
        fontWeight: 'bold',
        marginBottom: 25,
    },
    button:{
        borderRadius: 15,
        backgroundColor:'#b0f2b6',
        marginTop: '5%'
    },
    image:{
        flex: 1,
        width: '95%',
        resizeMode: 'contain',
        marginTop: '20%',
        marginBottom: '20%',
    },
    input:{
        textAlign: 'center',
        backgroundColor:'#b0f2b6',
        margin: '5%',
        width:'80%',
        height: '5%',
        borderRadius: 15,
        color: "white"
    },
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#6a9fca",
    }


})
function mapDispatchToProps(dispatch) {
    return {
        sendfirstname: function(firstname) {
            dispatch({type:'sendfirstname', name : firstname})
        }
    }
}
export default connect(
    null,
    mapDispatchToProps
) (login);