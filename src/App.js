import React from 'react';
import './global.scss';
import Routes from './routes';
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const alertOption ={
  timeout: 3000,
  position: positions.BOTTOM_CENTER
}

function App() {
  return (
    <Provider template={AlertTemplate} {...alertOption}>
      <Routes />
    </Provider>
  );
}

export default App;
