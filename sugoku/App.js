import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions, TextInput } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./screens/home";
import Board from "./screens/board";
import Finish from "./screens/finish";
import { Provider } from "react-redux";
import store from "./store";
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
        <Provider store={store}>
      <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Board" component={Board} options={{headerShown :false}}/>
          <Stack.Screen name="Finish" component={Finish} options={{headerShown :false}}/>
      </Stack.Navigator>
        </Provider>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
  },
  col: {
    borderWidth: 1,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});
