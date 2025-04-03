"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { KeyRound, Mail } from "lucide-react";
import Link from "next/link";
import { signInAction } from "@/action/signInAction";

export default function LoginComponent() {
  return (
    <motion.form
      action={signInAction}
      className="space-y-6 bg-white w-[400px]"
      initial={{ opacity: 0, y: 20 }} // Starts hidden and slightly down
      animate={{ opacity: 1, y: 0 }} // Moves up and fades in
      transition={{ duration: 0.5, ease: "easeInOut" }} // Smooth transition with easing
    >
      {/* Email */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.5, ease: "easeInOut" }} // Smooth with delay and easing
      >
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
          placeholder="Please type your email"
          className="bg-ghost-white py-4 px-4 rounded-lg w-full text-light-steel-blue/90"
          required
        />
      </motion.div>

      {/* Password */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.5, ease: "easeInOut" }} // Smooth with delay and easing
      >
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
          placeholder="Please type your password"
          className="bg-ghost-white py-4 px-4 rounded-lg w-full text-light-steel-blue/90"
          required
        />
      </motion.div>

      {/* Sign In Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.5, ease: "easeInOut" }} // Smooth with delay and easing
      >
        <Button
          type="submit"
          className="bg-gray-900 hover:bg-gray-800 text-base cursor-pointer text-white py-4 rounded-lg w-full font-bold"
        >
          Login
        </Button>
      </motion.div>

      {/* Underline */}
      <div className="gap-1.5 flex flex-col">
        <div className="capitalize text-right mt-2 font-normal">
          Create new account?{" "}
          <Link
            href="/register"
            className="hover:text-persian-green hover:underline text-gray-900"
          >
            Sign up!
          </Link>
        </div>
        <div className="border-b border-b-light-steel-blue"></div>
        <div className="text-center">Login with</div>
      </div>

      {/* Sign in with Google */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5, ease: "easeInOut" }} // Smooth with delay and easing
      >
        <Button className="flex bg-gray-100 gap-2 items-start justify-center w-full drop-shadow-sm hover:bg-gray-200/50 cursor-pointer">
          <img
            width={24}
            height={24}
            src="https://cdn4.iconfinder.com/data/icons/logos-brands-7/512/google_logo-google_icongoogle-1024.png"
            alt="Google Icon"
          />
          Login with Google
        </Button>
      </motion.div>
    </motion.form>
  );
}
