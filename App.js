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

  const renderActions = () => {
    return actions.map((action, index) => (
      <View style={s` bg-red-100 justify-center items-center w-full`}>
        <TouchableOpacity style={s`py-5`} key={index} onPress={()=>setAndCall(action.value)}>
          <Text>{action.name}</Text>
        </TouchableOpacity>
      </View>
    ));
  };

  return (
    <View style={s`flex justify-center items-center h-full`}>    
    {renderActions()}
    <Text>{truth}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

