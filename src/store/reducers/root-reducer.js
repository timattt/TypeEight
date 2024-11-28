import {combineReducers} from "redux";
import {authReducer} from "./auth-reducer";
import testReducer from "./../slices/test-slice";
import testRunReducer from "./../slices/test-run-slice";
import testTryReducer from "./../slices/test-try-slice";

export const rootReducer = combineReducers({
    authReducer,
    testReducer,
    testRunReducer,
    testTryReducer
})