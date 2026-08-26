import './app.css';
import App from './App.jsx'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { authSlice } from './state';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { persistStore, persistReducer, FLUSH, PERSIST, REHYDRATE, PAUSE, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import { PersistGate } from 'redux-persist/integration/react';
const persistConfig = { key: 'root', storage, version: 1 };
// const rootReducer = combineReducers({
//   auth: authSlice.reducer
// });
const persistedReducer = persistReducer(persistConfig, authSlice.reducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, PERSIST, REHYDRATE, PAUSE, PURGE, REGISTER]
      }
    })

})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>,
)
