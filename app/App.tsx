"use client";

import { Provider } from "react-redux";
import NavBar from "./sections/navbar";
import SideNav from "./sections/sidenav";
import { store } from "./store";

export default function App({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <body className={"font-cabinet_grotesk text-grey/700 flex w-full h-full"}>
        <SideNav />
        <div className="flex flex-col w-full bg-primary/50">
          <NavBar />
          <div>{children}</div>
        </div>
      </body>
    </Provider>
  );
}
