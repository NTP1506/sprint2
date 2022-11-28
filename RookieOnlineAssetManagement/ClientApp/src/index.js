import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "react-datepicker/dist/react-datepicker.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import UserRoleProvider from "./context/UserRoleContext";
import { ModalProvider } from "./context/ModalContext";
import { Provider } from "react-redux";
import store from "app/store";

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <ModalProvider>
                <UserRoleProvider>
                    <Provider store={store}>
                        <App />
                    </Provider>
                </UserRoleProvider>
            </ModalProvider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
