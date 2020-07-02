import React from "react";
import ReactDOM from "react-dom";

// Router
import { BrowserRouter } from "react-router-dom";

// Redux
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { Provider } from "react-redux";

// Reducers
import authReducer from "./store/reducers/auth";
import videosReducer from "./store/reducers/videos";

// Middleware
import thunk from "redux-thunk";

// Other
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

// In order for React Devtools to work
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Combine two reducers into one
const rootReducer = combineReducers({
    auth: authReducer,
    videos: videosReducer
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
serviceWorker.unregister();
