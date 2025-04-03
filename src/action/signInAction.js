"use server";
import { signIn } from "@/auth";

// sign in via credentials - email and password
export const signInAction = async (formData) => {
  await signIn("credentials", {
    email: formData.get("email"),
    password: formData.get("password"),
    redirectTo: "/workspace",
  });
};