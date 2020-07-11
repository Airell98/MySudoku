import React, { useState, useEffect } from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";


export default({navigation:{navigate}})=>{
    const userName = useSelector((state) => state.UserReducer.user);
const back = ()=>{
    navigate("Home")
}

    
    return(
        <View style={styles.container}>

    <Text style={styles.word}>Congratulations { userName.toUpperCase()}</Text>
    <Text style={styles.word}>You Have Solved The Game</Text>
    <Button title="Home" onPress={back}></Button>
            </View>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#241b1b",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 20,
    },
    word:{
    color: "#f0e9e9"
    }
    
  });