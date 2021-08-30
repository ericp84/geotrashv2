import React, {useState, useEffect} from 'react';
import { StyleSheet,Text, View, TextInput, Image} from 'react-native';
import {Button} from 'react-native-elements';


function signup(props) {
    const[firstname, setFirstname] = useState('');
    const[lastname, setLastname] = useState('');
    const[password, setPassword] = useState('');
    const[email, setEmail] = useState('');
    const[userexistup, setUserExistup] = useState(false);
    const[errorsignup, setErrorSignup] = useState([]);
// https://mysterious-plateau-19771.herokuapp.com/signup
let handleSignup = async () => {
    const userup = await fetch('http:/192.168.137.1:3000/signup', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: `firstname=${firstname}&lastname=${lastname}&email=${email}&password=${password}`
    })
    const userok = await userup.json()
    console.log("userexistUP/////",userexistup)
    if(userok.result === false) {
        console.log("userOK/////",userok.result)
        setErrorSignup(userok.error)
    } else {
        setUserExistup(true)
        return(props.navigation.navigate('login'))
    }  
    
}
    if (userexistup) {
        console.log("USEREX////",userexistup, 'enregistrement bdd réussi')
    } 

    let errorsup = errorsignup.map((error, i) => {
        return <Text key={i}>{error}</Text>
    })
    console.log("erroorsup//",errorsup)
    return (
       <View style={styles.container}>
           <Image style={styles.images} source={require('../assets/smalogo.png')}/>
           <Text style={styles.text}>Pour t'inscrire, on a besoin de quelques informations :</Text>
            <TextInput style={styles.input} onChangeText={(value) => setFirstname(value)} type="text" name='firstnameup' placeholder="Prenom"/>
            <TextInput style={styles.input} onChangeText={(value) => setLastname(value)}type="text" name='emailup' placeholder="Nom"/>
            <TextInput style={styles.input} onChangeText={(value) => setPassword(value)}type="text" name='passwordup' placeholder="Password" secureTextEntry={true}/>
            <TextInput style={styles.input} onChangeText={(value) => setEmail(value)}type="text" name='confirmPasswordup' placeholder="email"/>
            {errorsup}
           <Button   buttonStyle={styles.button} onPress={()=> handleSignup()} color='#b0f2b6' title="inscription"/>
       </View>
    );
};

const styles = StyleSheet.create({
    
    images:{
        flex: 1,
        width: '10%',
        maxHeight: '20%',
        resizeMode: 'contain',
        marginLeft: 355,
        marginBottom: 55,
        backgroundColor: 'transparent'
    },

    button:{
        marginTop: 15,
        marginBottom: 125,
        borderRadius: 15,
        backgroundColor:"#b0f2b6",
        shadowColor: "#000000",
        borderRadius: 15
    },
    image:{
        width: '10%',
        resizeMode: 'contain',
    },
    text:{
        fontSize: 25,
        textAlign:'center',
        marginBottom: 150,
        
    },
    input:{
        textAlign: 'center',
        backgroundColor:'#6a9fca',
        margin: 15,
        width:'80%',
        height: '5%',
        borderRadius: 15,
    },
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffF'
    }


})


export default signup;