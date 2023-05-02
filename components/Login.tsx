"use client";
import { fetchConfig } from "@/util/fetch_config";
import Cookies from "js-cookie";
import React, { useState, useEffect, FormEvent, useContext } from "react";
import { AuthContext, AuthContextProps } from "./AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const { state, dispatch } = useContext(AuthContext);
  const handleSubmmit = async (e: FormEvent) => {
    e.preventDefault();
    const url = "/api/auth";
    const res = await fetch(url, {
      ...fetchConfig,
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (data && data.token) {
      Cookies.set("token", data.token);
      setLoggedIn(true);
    }
  };

  useEffect(() => {
    if (loggedIn) {
      console.log("firing dispatch with: ", state, dispatch, email);
      dispatch({ type: "login", email: email });
    }
    console.log(state)
  }, [loggedIn]);
  if (state.email) {
    return <div onClick={() => console.log(state)}>Logged In</div>;
  }
  return (
    <form className="flex flex-col">
      <label htmlFor="email">Email</label>
      <input
        type="text"
        name="email"
        id="email"
        value={email}
        autoComplete="off"
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor="password">Password</label>
      <input
        type="text"
        value={password}
        name="password"
        id="password"
        autoComplete="off"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        type="submit"
        onClick={(e) => handleSubmmit(e)}
      >
        Submit
      </button>
    </form>
  );
};

export default Login;
