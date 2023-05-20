import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { s } from 'react-native-wind'
import Head from './components/head';
import { useState } from 'react';
import { flexDirections } from 'react-native-wind/dist/styles/flex/flex-direction';

const actions = [{name:"Truth", fun:"fetchTruth", value:"truth"},
{name:"dare", fun:"fetchDare", value:"dare"}
]

export default function App() {
  const [truth, setTruth] = useState("")
  
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
    <Text style={styles.message}>{truth}</Text>
      <View style={styles.actionsContainer}>
      {actions.map((action, index) => (
          <TouchableOpacity style={index === 0 ? (styles.truth) : (styles.dare)}  key={index} onPress={()=>setAndCall(action.value)}>
            <Text style={styles.actionText}> {action.name}</Text>
          </TouchableOpacity>
        
      ))
  }
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  actionsContainer:{
    display:"flex",
    flexDirection:"row",
    width:"100%",
    justifyContent:"space-around"
  },
  container:{
    display:"flex",
    justifyContent:"space-around",
    alignItems:"center",
    height:"100%",
    backgroundColor:"#f5fefa"
  },
   truth:{
     display:"flex",
     justifyContent:"center",
     alignItems:"center",
     backgroundColor:"#09a0a5",
     padding:30,
     borderRadius:"5%"
   },
   dare:{
     display:"flex",
     justifyContent:"center",
     alignItems:"center",
     backgroundColor:"#042244",
     padding:30,
     borderRadius:"5%"
   },
   message:{
     width:"90%",
     fontWeight:"bold",
     textAlign:"center",
     fontSize: 22,
     color:"#134E50",
 },
  actionText:{
    color:"white",
    fontSize:20,
    fontWeight:"300"
  }
})