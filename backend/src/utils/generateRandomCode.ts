import crypto from "crypto";

export default function generateRandomCode(length: number): string {
  let result = "";
  const characters = "0123456789";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export const secretKey = crypto.randomBytes(7).toString("hex");
