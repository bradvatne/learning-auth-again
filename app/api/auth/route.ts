import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/util/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Cookies from "js-cookie";
import { cookies } from "next/dist/client/components/headers";
import { env } from "process";

export async function POST(req: NextRequest, res: NextResponse) {
  //Destructure email and password from the request
  const { email, password } = await req.json();
  console.log("check email and password: ", email, password);
  //Check for user
  const checkUser = await prisma.user.findFirst({
    where: {
      email,
    },
  });
  console.log("check user result: ", checkUser);
  if (!checkUser) {
    //Encrypt password
    const hashedPass = await bcrypt.hash(password, 8);
    console.log("hashed pass: ", hashedPass);
    //Create new db row in user table with value of email and the encrypted password
    const newUser = await prisma.user.create({
      data: { email, password: hashedPass },
    });
    console.log("new user: ", newUser);
  }
  //Find user and verify
  const checkPass = bcrypt.compare(password, checkUser.password);
  console.log("check password result: ", checkPass);
  //Return error if password check fails
  if (!checkPass) {
    console.log("password check fail");
    return NextResponse.json({ error: "Incorrect Password" });
  }
  const jwtSecret = env.JWT_SECRET!;
  //create JWT if password check succeeds
  const token = jwt.sign({ email }, jwtSecret, { expiresIn: "1h" });
  return NextResponse.json({ token });
}
