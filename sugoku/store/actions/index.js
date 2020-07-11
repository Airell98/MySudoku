let url = "https://sugoku.herokuapp.com/board?difficulty=medium";

let urlSolve = "https://sugoku.herokuapp.com/solve";

export function getBoard(level) {
  return (dispatch) => {
    fetch(`https://sugoku.herokuapp.com/board?difficulty=${level}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.board);
        dispatch({
          type: "GET_BOARD",
          payload: data.board,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function solveBoard(value) {
  return (dispatch) => {
    const encodeBoard = (boards) => boards.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === boards.length - 1 ? '' : '%2C'}`, '')

    const encodeParams = (params) =>
      Object.keys(params)
        .map((key) => key + "=" + `%5B${encodeBoard(params[key])}%5D`)
        .join("&");

    let data = { board: value };
    console.log(encodeParams(data), 'masuk solveee')
    fetch(urlSolve, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encodeParams({ board: value }),
    })
      .then((response) => response.json())
      .then((response) =>
        dispatch({ type: "SOLVE_BOARD", payload: response.solution })
      )
      .catch(console.warn);
  };
}

export function validateBoard(value) {
  return (dispatch) => {
    console.log("validasi actions=====", value);
    const encodeBoard = (boards) => boards.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === boards.length - 1 ? '' : '%2C'}`, '')

    const encodeParams = (params) =>
      Object.keys(params)
        .map((key) => key + "=" + `%5B${encodeBoard(params[key])}%5D`)
        .join("&");

    console.log(encodeParams({ board: value }), "ini encode validasiiiiii");

    fetch("https://sugoku.herokuapp.com/validate", {
      method: "POST",
      body: encodeParams({ board: value }),
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data, "masuk reducer validasi");
        dispatch({ type: "VALIDATE_BOARD", payload: data.status });
      })
      .catch(console.warn);
  };
}

export function userName(value) {
  return {
    type: "USER_NAME",
    payload: value,
  };
}

export function inputSolveBoard(value) {
  return {
    type: "SOLVE_BOARD",
    payload: value,
  };
}

export function emptyStatus() {
  return {
    type: "EMPTY_STATUS",
  };
}
