import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './js/store/index';
import Main from './components/Main';

function App() {
  return (
    //Use Browser Router to route to different pages
    // <Provider store={store}>
    // <Provider>
      <BrowserRouter>
        <div>
          {/* App Component Has a Child Component called Main*/}
          <Main />
        </div>
      </BrowserRouter>
    // </Provider>
  );
}

export default App;