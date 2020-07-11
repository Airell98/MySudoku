import React, { useState, useEffect } from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";
import {useDispatch} from "react-redux"
import {userName} from "../store/actions"

export default ({ navigation: { navigate } }) => {
  const [name, setName] = useState("");
  const [kondisi, setKondisi] = useState(false);
  const [difficult, setDifficult] = useState('')
  const dispatch = useDispatch()
  const submit = (level) => {
    if (name == "") {
        
      setKondisi(true);
    } else {
      dispatch(userName(name))
     
      navigate("Board",{
        level
      });
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setKondisi(false);
    }, 2000);
  }, [kondisi]);

  return (
    <View style={styles.container}>
      <View style={styles.inputField}>  
        {kondisi && <Text style={{ color: "red"}}>Name required</Text>}
      <TextInput 
        placeholder="Enter Your Name"
        defaultValue={""}
        onChangeText={(text) => setName(text)}
        style={styles.inputStyle}
      />
      </View>
      <View style={styles.button}>
      <Button title="Easy" onPress={() => submit("easy")} />
      <Button title="Medium" onPress={() => submit("medium")} />
      <Button title="Hard" onPress={() => submit("hard")} />
      
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightblue",
    alignItems: "stretch",
    justifyContent: "center",
    }, 
  inputStyle:{
    height: 45,
    width: 200,
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    textAlign: "center",
    
  },
  inputField:{
   flex: 1,
   alignItems: "center",
   justifyContent: "center",
   
  },
  button:{
    flex:1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "flex-start",
   
  }
});
