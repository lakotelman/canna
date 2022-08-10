import { createContext } from "react";

export const DataContext = createContext<any | null>(null);

export const DataProvider = (props: any) => {
  const values = {};
  return (
    <DataContext.Provider value={values}>{props.children}</DataContext.Provider>
  );
};
