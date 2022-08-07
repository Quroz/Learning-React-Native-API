import { StatusBar } from 'expo-status-bar';
import { useCallback, useState } from 'react';
import { StyleSheet, Text, TextInput, View, ActivityIndicator } from 'react-native';
import axios from "axios"
import api from './Api';

export default function App() {

  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])


  
  const handleReturn = useCallback(()=>{
     setLoading(true)
     setInput("")
     axios({
       method: "GET",
       url: `https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=${api.key}`
     })

     .then(res=>{
       console.log(res.data)
       setData(res.data)
     }).catch(e=>console.dir(e))
      .finally(() => setLoading(false))
     

  }, [input])


  return (
    <View style={styles.container}>
     <View>
      <TextInput
      onChangeText={text=> setInput(text)}
      placeholder='Enter a city name and press return...'
      placeholderTextColor={"black"}
      value = {input}
      onSubmitEditing={handleReturn}
      
      style = {styles.inputText}
      />
      </View>
      {loading ? <ActivityIndicator size = {"large"}/>: 
        
         <View style={styles.cityContainer}>
            <Text style={styles.cityText}>{data?.name} {data?.sys?.country}</Text>
        </View>
      }
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
    
  },
  inputText: {
    borderBottomWidth: 3,
    padding: 5,
    paddingVertical: 20,
    marginVertical: 100,
    marginHorizontal: 10,
    backgroundColor: "white",
    fontSize: 19,
    borderRadius: 16,
    borderBottomColor: "#df8e00"
  },

  cityText: {
    fontSize: 24,
    fontWeight: "bold"
  },

  cityContainer: {
    alignItems: "center"
  }
});
