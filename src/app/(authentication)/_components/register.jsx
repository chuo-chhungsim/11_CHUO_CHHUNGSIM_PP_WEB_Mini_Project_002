/* eslint-disable @next/next/no-img-element */
"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { KeyRound, Mail, UserRound } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { signUpService } from "@/services/auth/signUpService";
import { useRouter } from "next/navigation";
import { signUpAction } from "@/action/signUpAction";

export default function RegisterComponent() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      signUpAction(formData);
      router.push("/login");
    } catch (err) {
      setError(err?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white w-[400px]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {/* Username */}
      <Label
        htmlFor="username"
        className="text-light-steel-blue flex gap-2 items-start mb-2 text-base"
      >
        <UserRound size={20} /> Username
      </Label>
      <Input
        type="text"
        id="username"
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="Please type your username"
        className="bg-ghost-white py-4 px-4 rounded-lg w-full text-light-steel-blue/90"
        required
      />

      {/* Email */}
      <Label
        htmlFor="email"
        className="text-light-steel-blue flex gap-2 items-start mb-2 text-base"
      >
        <Mail size={20} /> Email
      </Label>
      <Input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Please type your email"
        className="bg-ghost-white py-4 px-4 rounded-lg w-full text-light-steel-blue/90"
        required
      />

      {/* Password */}
      <Label
        htmlFor="password"
        className="text-light-steel-blue flex gap-2 items-start mb-2 text-base"
      >
        <KeyRound size={20} /> Password
      </Label>
      <Input
        type="password"
        id="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Please type your password"
        className="bg-ghost-white py-4 px-4 rounded-lg w-full text-light-steel-blue/90"
        required
      />

      {/* Sign Up Button */}
      <Button
        type="submit"
        className="bg-gray-900 hover:bg-gray-800 text-base cursor-pointer text-white py-4 rounded-lg w-full font-bold"
        disabled={loading}
      >
        {loading ? "Signing Up..." : "Sign Up"}
      </Button>

      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Sign in Link */}
      <div className="text-right mt-2 font-normal">
        Already have an account?{" "}
        <Link
          href="/login"
          className="hover:text-persian-green hover:underline text-gray-900"
        >
          Sign in!
        </Link>
      </div>

      {/* Google Sign-up */}
      <Button className="flex bg-gray-100 gap-2 items-center justify-center w-full drop-shadow-sm hover:bg-gray-200/50 cursor-pointer">
        <img
          width={24}
          height={24}
          src="https://cdn4.iconfinder.com/data/icons/logos-brands-7/512/google_logo-google_icongoogle-1024.png"
          alt="Google Icon"
        />
        Sign up with Google
      </Button>
    </motion.form>
  );
}
