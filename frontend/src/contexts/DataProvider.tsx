import { createContext, useContext, useState } from "react";

const DataContext = createContext<any |null >(null);

export const DataProvider = (props: any) => {
  const [message, setMessage] = useState("it's working");

  const values = {
    message
  };
  return (
    <DataContext.Provider value={values}>{props.children}</DataContext.Provider>
  );
};
