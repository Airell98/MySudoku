const defaultState = {
  MainBoard: [],
  SolveBoard: [],
  Status: "",
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case "GET_BOARD":
      return { ...state, MainBoard: action.payload };
    case "SOLVE_BOARD":
      let arr = action.payload;
      let temp = [];
      for (let i = 0; i < arr.length; i++) {
        temp.push(arr[i]);
      }
      console.log(temp)
      return { ...state, SolveBoard: temp };
    case "VALIDATE_BOARD":
      console.log(action.payload);
      return { ...state, Status: action.payload };
    case "EMPTY_STATUS":
      return { ...state, Status: "" };
    default:
      return state;
  }
};
