import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  Button,
  StatusBar,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  getBoard,
  solveBoard,
  validateBoard,
  inputSolveBoard,
  emptyStatus,
} from "../store/actions";
const screenWidth = Math.round(Dimensions.get("window").width);
const screenHeight = Math.round(Dimensions.get("window").height);

export default function Home({ navigation: { navigate }, route }) {
  const { level } = route.params;
  const userName = useSelector((state) => state.UserReducer.user);
  const dispatch = useDispatch();

  const MainBoard = useSelector((state) => state.BoardReducer.MainBoard);
  const [validate, setValidate] = useState([]);

  const board = useSelector((state) => state.BoardReducer.SolveBoard);

  const [ready, setReady] = useState(false);
  const [set, setSet] = useState(false);
  const [go, setGo] = useState(false);
  const [kondisi, setKondisi] = useState(false);
  const Status = useSelector((state) => state.BoardReducer.Status);

  const onChangeText = (value, row, col) => {
    validate[row][col] = +value;
    setValidate(validate);
    dispatch(inputSolveBoard(validate));
  };
  const validasi = () => {
    dispatch(validateBoard(board));
  };

  const solve = () => {
    dispatch(solveBoard(MainBoard));
  };

  /////////////////////////
  useEffect(() => {
    dispatch(getBoard(level));
    setReady(true);

    setTimeout(() => {
      setReady(false);
      setSet(true);
    }, 2000);

    setTimeout(() => {
      setSet(false);
      setGo(true);
    }, 4000);

    setTimeout(() => {
      setGo(false);
      setKondisi(true);
    }, 6000);
  }, []);

  useEffect(() => {
    let temp = [];
    for (let i = 0; i < MainBoard.length; i++) {
      let temp2 = [];
      for (let j = 0; j < MainBoard[i].length; j++) {
        temp2.push(MainBoard[i][j]);
      }
      temp.push(temp2);
    }

    setValidate(temp);
    dispatch(inputSolveBoard(temp));
  }, [MainBoard]);

  useEffect(() => {
    if (Status == "solved") {
      navigate("Finish");
    }
    setTimeout(() => {
      dispatch(emptyStatus());
    }, 5000);
  }, [Status]);
  return (
    // const board = use
    <View style={styles.container}>
      <Text>{userName}</Text>
      <Text>{level}</Text>
      <View style={styles.header}>
        <Text style={styles.headerText}>SUGOKU</Text>
      </View>
      <StatusBar hidden={true} />
      <Text style={styles.status}>{Status}</Text>
      {ready && <Text style={styles.letter}>Ready</Text>}
      {set && <Text style={styles.letter}>Set</Text>}
      {go && <Text style={styles.letter}>Go!!!!!</Text>}
      {kondisi && (
        <View>
          {board.map((row, i) => {
            return (
              <View style={styles.row} key={i}>
                {row.map((col, j) => {
                  return (
                    <View style={styles.col}>
                      {board[i][j] > 0 ? (
                        <Text
                          key={j}
                          style={{ color: MainBoard[i][j] > 0 && "red" }}
                        >
                          {col}
                        </Text>
                      ) : (
                        <TextInput
                          style={{ width: 9 }}
                          defaultValue={""}
                          key={j}
                          keyboardType="number-pad"
                          maxLength={1}
                          onChangeText={(text) => onChangeText(text, i, j)}
                        />
                      )}
                    </View>
                  );
                })}
              </View>
            );
          })}
          <Button
            title="Validate"
            onPress={() => {
              validasi();
            }}
          ></Button>
          <Button
            title="Solve"
            onPress={() => {
              solve();
            }}
          ></Button>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightblue",
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "white",
    borderWidth: 1,
  },

  col: {
    borderWidth: 1,
    borderColor: "black",
    height: (screenWidth - 100) / 9,
    width: (screenWidth - 100) / 9,
    alignItems: "center",
    justifyContent: "center",
  },
  letter: {
    fontSize: 60,
    width: 200,
    margin: "auto",
  },
  status: {
    fontSize: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    backgroundColor: "black",
  },
  headerText: {
    fontFamily: "monospace",
    color: "white",
    fontSize: 30,
  },
});
