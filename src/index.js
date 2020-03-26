import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
const express = require('express');
const app = express();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
const port = process.env.PORT || 3000;
app.listen(port); 
