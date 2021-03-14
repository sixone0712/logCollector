import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
// import '@fontsource/roboto'; // Defaults to weight 400.
// import '@fontsource/roboto/100.css'; // Weight 100.
// import '@fontsource/roboto/700.css'; // Weight 700.

//TODO: 폰트 로딩 때문에 폰트가 나중에 바뀜, cdn을 로컬로 가져와서 @fontface로 불러와야 할듯....
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
