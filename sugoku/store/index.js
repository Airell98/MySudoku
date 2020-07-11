import {createStore, combineReducers, applyMiddleware} from "redux"
import thunk from "redux-thunk"
import BoardReducer from "./reducers/BoardReducer"
import UserReducer from "./reducers/User"
const reducers = combineReducers({
    BoardReducer, UserReducer
})


const store = createStore(reducers, applyMiddleware(thunk))


export default store