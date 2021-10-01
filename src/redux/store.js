import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const persistConfig = {
  key: 'root',
  storage,
};

const presistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(
  presistedReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
const persistor = persistStore(store);
export { persistor, store };
