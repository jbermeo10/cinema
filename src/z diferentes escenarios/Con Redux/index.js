import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { updateEstado } from './reducers';
import reportWebVitals from './reportWebVitals';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

const registro = createLogger();
// const almacenaje = createStore(updateEstado)
const almacenaje = 
  createStore(
    updateEstado, 
    applyMiddleware(registro)
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )

//<React.StrictMode>
//</React.StrictMode>,

ReactDOM.render( 
  // 'store' es nombre reservado
  <Provider store={almacenaje}>
    <App/>
  </Provider>
  , document.getElementById('root') );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
