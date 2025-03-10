'use client';

import { store } from "@/store/store";
import AppWrapper from "@/ui/AppWrapper";
import HomePage from "@/ui/HomePage";
import { Provider } from "react-redux";


export default function Home() {
  return (
    <Provider store={store}>
      <AppWrapper />
      {/* <HomePage /> */}
      
      {/* <AppWrapper />  */}
    </Provider>
  );
}
