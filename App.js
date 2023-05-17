import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { s } from 'react-native-wind'
import Head from './components/head';
import { useState } from 'react';

const actions = [{name:"Truth", fun:"fetchTruth", value:"truth"},
{name:"dare", fun:"fetchDare", value:"dare"}
]

export default function App() {
  const [truth, setTruth] = useState("")
  const [tod, setTod] = useState("")
  
  const setAndCall= (actionName)=>{
    if(actionName === "truth")
      fetchTruth()
    else
      fetchDare()
  }

  const fetchTruth = async() =>{
    try{
      const response = await fetch("https://api.truthordarebot.xyz/v1/truth")
      const data = await response.json()
      setTruth(data.question)  
    }
    catch(error){
      console.log("ERROR")
    }
  }


  const fetchDare = async() =>{
    try{
      const response = await fetch("https://api.truthordarebot.xyz/api/dare")
      const data = await response.json()
      setTruth(data.question)  
      }
    catch(error){
      console.log("ERROR")
    }
  }



  return (
    <View style={styles.container} > 
    {actions.map((action, index) => (
        <TouchableOpacity style={index === 0 ? (styles.truth) : (styles.dare)}  key={index} onPress={()=>setAndCall(action.value)}>
          <Text>{action.name}</Text>
        </TouchableOpacity>
      
    ))
}
    <Text style={styles.message}>{truth}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: "#025464",
    width:"100%",
    height:'100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  truth:{
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"#E57C23",
    width:"100%",
    padding:30,
  },
  dare:{
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"#E8AA42",
    width:"100%",
    padding:30,
  },
  message:{
    backgroundColor:"red"
  }
})

