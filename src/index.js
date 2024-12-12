import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';
import { BrowserRouter } from 'react-router-dom';  // This should be in index.js
import UserProvider from './context/UserContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  // <Auth0Provider
  //   domain="dev-8u86ohwolehdqnvp.us.auth0.com"
  //   clientId="8dd8ql6C67SroZGEZDOIZ1Ihy0NpsH4y"
  //   authorizationParams={{ redirect_uri: "http://localhost:3000" }}
  // >
  <UserProvider>
    <BrowserRouter> {/* Wrap App with BrowserRouter here */}
      <App />
    </BrowserRouter>
    </UserProvider>
  // </Auth0Provider>
);
