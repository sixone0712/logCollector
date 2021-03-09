import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
// import '@fontsource/roboto'; // Defaults to weight 400.
// import '@fontsource/roboto/100.css'; // Weight 100.
// import '@fontsource/roboto/700.css'; // Weight 700.
import '@fontsource/saira'; // Defaults to weight 400.
import '@fontsource/saira/100.css'; // Weight 100.
import '@fontsource/saira/700.css'; // Weight 700.
// import 'normalize.css';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
