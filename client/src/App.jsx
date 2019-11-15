import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Main from './components/Main';
import store from './js/store/index';

function App() {
  return (
    // Use Browser Router to route to different pages
    <Provider store={store}>
      <BrowserRouter>
        <div>
          {/* App Component Has a Child Component called Main */}
          <Main />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
