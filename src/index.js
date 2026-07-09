import React from 'react'; //de cajon para React
import ReactDOM from 'react-dom'; //de cajon para React
import App from './App';   // va fijo, es la app que cree
import { Provider } from 'react-redux'; // elemento necesario para Redux
import { createStore, applyMiddleware } from 'redux'; // createStore es un elemento necesario de Redux, applyMiddleware es util solo para visualizar el estado global en la consola
import { createLogger } from 'redux-logger'; // elemento de redux util para ver las variables de estado globales en la consola del navegador, al final hay q quitarla
import { updateEstado } from './reducers'; // elemento necesario para Redux
import reportWebVitals from './reportWebVitals'; // esto es opcional de React para evaluar la app, ver linea 49
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

// Elemento de redux 'registro' para visualizar el cambio de estado en la consola del navegador, se podria quitar al final
const registro = createLogger();
// const almacenaje = createStore(updateEstado) 
// no recuerdo porque lo actualice de esto a lo de abajo... ya lo recuerdo, es solo para agregar un feature de debugging q es opcional y al final habra q borrar

//Elemento de redux, para guardar las variables de estado de la app, en middleware no uso thunk, trngo otro desarrollo q si lo usa
const almacenaje = 
  createStore(
    updateEstado, 
    applyMiddleware(registro)
  
  // No recuerdo porque puse esto
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )

//No usare el Strictmode por simplicidad, pero sirve para detectar errores, tendria q envolver la app en el 
//<React.StrictMode>
//</React.StrictMode>,

//Esto es basico de React para renderizar la app
ReactDOM.render( 
  //Provider es un elemento necesario para usar redux , para llamar las variables de estado
  // 'store' es nombre reservado
  // 'almacenaje' es la variable de estado de redux que cree arriba (linea 18)
  // App es mi desarrollo que se renderiza

  <Provider store={almacenaje}> 
    <App/> 
  </Provider>
  , document.getElementById('root') ); //esto va de cajon siempre

// Esto es opcional de React para evaluar la app, se llama en la linea 8

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
