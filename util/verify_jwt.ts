import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/dist/client/components/headers";
import { env } from "process";

interface  User extends JwtPayload {
  email: string,

}
export default function verifyJWT() {
  const token = cookies().get("token");
  const value = token && token.value;
  const jwtSecret = env.JWT_SECRET!;
  if (value) {
    try {
      jwt.verify(value, jwtSecret);
      const data  = <User>jwt.decode(value);
      return { email: data?.email };
    } catch (err) {
      console.error("Invalid token:", err);
      return false;
    }
  }
}
