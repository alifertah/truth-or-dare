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
    backgroundColor:"red",
    display:"flex",
    flexDirection:"row",
  },
  container:{
    display:"flex",
    justifyContent:"space-around",
    alignItems:"center",
    height:"100%"
  },
   truth:{
     display:"flex",
     justifyContent:"center",
     alignItems:"center",
     backgroundColor:"#E57C23",
     padding:30,
   },
   dare:{
     display:"flex",
     justifyContent:"center",
     alignItems:"center",
     backgroundColor:"#E8AA42",
     padding:30,
   },
   message:{
     width:"90%",
     fontWeight:"bold",
     textAlign:"center",
     fontSize: 22,
     color:"linear-gradient(90deg, rgba(229,124,35,1) 0%, rgba(232,170,66,1) 100%)",
 },
  actionText:{
    color:"white",
    fontSize:20,
    fontWeight:"300"
  }
})

