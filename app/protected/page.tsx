import React from "react";
import verifyJWT from "@/util/verify_jwt";
import ClearCookies from "@/components/ClearCookies";

const page = () => {
  const isVerified = verifyJWT();
  console.log(isVerified);
  if (isVerified !== false) {
    return (
      <div>
        Hello {isVerified?.email}
        <br />
        <ClearCookies />
      </div>
    );
  }
  return <div>You are not verified</div>;
};

export default page;
