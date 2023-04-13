import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useTranslation } from "react-i18next";
import NavBar from "./route/NavBar";
import { store } from "./reducers";
import { Provider } from "react-redux";
// import store from './redux/store';

function App() {
  const { i18n } = useTranslation();
  document.body.dir = i18n.dir();

  return (
    <Provider store={store}>
      <GoogleOAuthProvider clientId="841717470500-1n28e7cnn827dhrn72t2vthjp46qq2q2.apps.googleusercontent.com">
        <React.Fragment>
          <NavBar />
        </React.Fragment>
      </GoogleOAuthProvider>
    </Provider>
  );
}

export default App;
