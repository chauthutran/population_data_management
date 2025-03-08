'use client';

import { store } from "@/store/store";
import Counter from "@/ui/Counter";
import DataSetSelect from "@/ui/DataSetSelect";
import OrgUnitTree from "@/ui/OrgUnitTree";
import PeriodSelect from "@/ui/PeriodSelect";
import Image from "next/image";
import { Provider } from "react-redux";

export default function Home() {
  return (
    <Provider store={store}>
      <DataSetSelect />
      <PeriodSelect periodType="Yearly" />
      <OrgUnitTree />
      <Counter />
    </Provider>
  );
}
