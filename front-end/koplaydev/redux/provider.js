"use client";
import { store, persistor } from "./reduxStore";
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from "react-redux";
import Loading from "@/app/loading";

export default function ReduxProvider({ children }) {
  return <Provider store={store}>
  <PersistGate loading={Loading} persistor={persistor}>
    {children}
  </PersistGate>
</Provider>;
}