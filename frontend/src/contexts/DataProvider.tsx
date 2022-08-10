import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Api } from "../api";
import { useAuth } from "../auth/AuthProvider";
import { Milestone, Task } from "../api/types";
export const DataContext = createContext<any | null>(null);

export const DataProvider = (props: any) => {
  const [logged, session] = useAuth();

  const api = new Api("http://127.0.0.1:5000/api", session);

  const values = {
    api,
  };
  return (
    <DataContext.Provider value={values}>{props.children}</DataContext.Provider>
  );
};
