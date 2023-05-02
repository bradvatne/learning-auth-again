import { cookies } from "next/dist/client/components/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

type JwtResponse = {
  email: string;
  iat: number;
  exp: number;
};
export async function POST(req: NextRequest) {
  const cookie = cookies().get("token");
  if (process && process.env && process.env.JWT_SECRET) {
    console.log('secret ok')
    if (cookie && cookie.value) {
        console.log('cookie check started')
      const valid = <JwtResponse>(
        jwt.verify(cookie?.value, process.env.JWT_SECRET)
      );
      console.log('valid res: ', valid)
      return NextResponse.json({valid});
    }
  }

  console.log(cookie);
  return NextResponse.json(cookie);
}
