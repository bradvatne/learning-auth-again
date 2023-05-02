"use client";
import { reducer, initialState, StateType } from "@/store";
import { ActionType } from "@/store/actions";
import { fetchConfig } from "@/util/fetch_config";
import {
  useReducer,
  createContext,
  ReactNode,
  PropsWithChildren,
  useEffect,
} from "react";

import React from "react";
export type AuthContextProps = {
  state: {
    email: string | null;
  };
  dispatch: Function;
};

type ProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<PropsWithChildren<AuthContextProps>>(
  {} as AuthContextProps
);

type JwtResponse = {
  email: string;
  iat: number;
  exp: number;
};

const AuthContextProvider = ({ children }: ProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function checkEmail() {
      const res = await fetch("/api/jwt", { ...fetchConfig });
      const data: JwtResponse = await res.json();
      if (data) {
        console.log(data);
        dispatch({ type: "login", email: data.email });
      }
    }
    checkEmail();
  }, []);
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
