"use server";

import { signUpService } from "@/services/auth/signUpService";
export const signUpAction = async (user) => {
  const signUp = await signUpService(user);
  console.log(signUp);
  return signUp;
};
