"use client";
import { fetchConfig } from "@/util/fetch_config";
import Cookies from "js-cookie";
import React, { useState, FormEvent } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmmit = async (e: FormEvent) => {
    e.preventDefault();
    const url = "/api/auth";
    const res = await fetch(url, {
      ...fetchConfig,
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    data && data.token && Cookies.set("token", data.token);
  };

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
