import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App';
import reportWebVitals from './reportWebVitals';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
// top jihoon bottom james
//  <GoogleOAuthProvider clientId='800905249542-ktfdkugnqmdi1t6vntc3gnc9f54kg8f0.apps.googleusercontent.com'>
    <GoogleOAuthProvider clientId='1002132986621-12pu724gd0vnno7sbt8tnc704bqug97a.apps.googleusercontent.com'>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </GoogleOAuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
