import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import ParentComponent from './components/parentComponent/ParentComponent';
import 'normalize.css';
import './App.scss';

const store = configureStore();
function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <ParentComponent />
      </Provider>
    </div>
  );
}

export default App;
