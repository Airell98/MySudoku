const defaultState = {
  user: "",
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case "USER_NAME":
      return { ...state, user: action.payload };

    default:
    return state
  }
};
