import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import Main from './components/Main';
import store from './js/store/index';
import { history } from './js/helper/history';

function App() {
  return (
    // Use Browser Router to route to different pages
    <Provider store={store}>
      <Router history={history}>
        <div>
          {/* App Component Has a Child Component called Main */}
          <Main />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
