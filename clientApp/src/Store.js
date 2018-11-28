import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import UserReducer from "./components/redux/UserReducer";
import { createLogger } from "redux-logger";

const Store = createStore(
  combineReducers({ UserReducer }),
  compose(applyMiddleware(createLogger(), thunk, promise()))
);

export default Store;
