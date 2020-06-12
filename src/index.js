import React from "react";
import ReactDOM from "react-dom";

// Router
import { BrowserRouter } from "react-router-dom";

// Redux
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { Provider } from "react-redux";

// Reducers
import authReducer from "./store/reducers/auth";

// Middleware
import thunk from "redux-thunk";

// Other
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

// In order for React Devtools to work
const composeEnhancers =
    process.env.NODE_ENV === "development" ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

// Combine two reducers into one
const rootReducer = combineReducers({
    auth: authReducer,
});

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
