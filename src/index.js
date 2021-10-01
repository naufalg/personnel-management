import { AppProvider } from 'context/AppContext';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { persistor, store } from 'redux/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
