'use client';

import { store } from "@/store/store";
import HomePage from "@/ui/HomePage";
import DataSetSelect from "@/ui/selection/DataSetSelect";
import OrgUnitTree from "@/ui/selection/OrgUnitTree";
import PeriodSelect from "@/ui/selection/PeriodSelect";
import Image from "next/image";
import { Provider } from "react-redux";


export default function Home() {
  return (
    <Provider store={store}>
      <HomePage />
    </Provider>
  );
}
