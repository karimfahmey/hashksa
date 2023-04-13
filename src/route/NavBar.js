import React from "react";
import { BrowserRouter } from "react-router-dom";
import { store } from '../reducers';
import AuthRoute from "./AuthRoute";
import MainRoute from "./MainRoute";

const NavBar = () => {

  const userDate = store.getState().authStoreState.isAuthenticated;
  
  return (
    <BrowserRouter>
        {userDate
          ? <AuthRoute />
          : <MainRoute />
        }
    </BrowserRouter>
  );
};

export default NavBar;
