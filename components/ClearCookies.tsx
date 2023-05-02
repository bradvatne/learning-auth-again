"use client";
import Cookies from "js-cookie";
import React from "react";


const ClearCookies = () => {

  return (
    <button
      onClick={() => {
        Cookies.remove("token");
      }}
    >
      Clear Cookies
    </button>
  );
};

export default ClearCookies;
