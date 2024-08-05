"use client";
import { store, persistor } from "./reduxStore";
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from "react-redux";

export default function ReduxProvider({ children }) {
  return <Provider store={store}>
  <PersistGate loading={null} persistor={persistor}>
    {children}
  </PersistGate>
</Provider>;
}