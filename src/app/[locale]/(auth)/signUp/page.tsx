"use client";

import { useState } from "react";
import { signUpApi } from "@/api/authAPI";
import { motion } from "framer-motion";
import AnimatedInput from "@/components/AnimatedInput";

interface SignUpProps {
  onToggleForm: () => void;
  animateOut: boolean;
  onSignUpSuccess: (email: string, username: string) => void;
}

const SignUpComponent = ({
  onToggleForm,
  onSignUpSuccess,
  animateOut,
}: SignUpProps) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    const emailRegex = /\S+@\S+\.\S+/;

    if (!username) {
      newErrors.username = "Username cannot be empty.";
    }

    if (!email) {
      newErrors.email = "Email cannot be empty.";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!password) {
      newErrors.password = "Password cannot be empty.";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirm password cannot be empty.";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async (e: any) => {
    e.preventDefault();
    setErrors({});

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      await signUpApi({ username, email, password });
      onSignUpSuccess(email, username);
    } catch (error: any) {
      console.error("Sign up error:", error);
      setErrors({
        general: error.message || "Network error. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="">
      <motion.h2
        initial={{ opacity: 0, x: -200 }}
        animate={animateOut ? { opacity: 0, x: -200 } : { opacity: 100, x: 0 }}
        transition={{ delay: animateOut ? 0 : 0.5, duration: 0.25 }}
        className="mb-8 text-center text-4xl font-extrabold text-white"
      >
        Sign Up
      </motion.h2>
      <form onSubmit={handleSignUp} className="">
        <motion.div
          initial={{ opacity: 0, x: -200 }}
          animate={animateOut ? { opacity: 0, x: -200 } : { opacity: 100, x: 0 }}
          transition={{ delay: animateOut ? 0.125 : 0.625, duration: 0.25 }}
        >
          <AnimatedInput
            label="Username"
            id="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setErrors((prev) => ({ ...prev, username: "" }));
            }}
            errors={errors.username}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -200 }}
          animate={animateOut ? { opacity: 0, x: -200 } : { opacity: 100, x: 0 }}
          transition={{ delay: animateOut ? 0.125 : 0.625, duration: 0.25 }}
          className="my-8"
        >
          <AnimatedInput
            label="Email"
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors((prev) => ({ ...prev, email: "" }));
            }}
            errors={errors.email}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -200 }}
          animate={animateOut ? { opacity: 0, x: -200 } : { opacity: 100, x: 0 }}
          transition={{ delay: animateOut ? 0.25 : 0.75, duration: 0.25 }}
        >
          <AnimatedInput
            label="Password"
            id="password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors((prev) => ({ ...prev, password: "" }));
            }}
            errors={errors.password}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -200 }}
          animate={animateOut ? { opacity: 0, x: -200 } : { opacity: 100, x: 0 }}
          transition={{ delay: animateOut ? 0.25 : 0.75, duration: 0.25 }}
          className="my-8"
        >
          <AnimatedInput
            label="Confirm Password"
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setErrors((prev) => ({ ...prev, confirmPassword: "" }));
            }}
            errors={errors.confirmPassword}
          />
        </motion.div>

        <motion.button
          type="submit"
          disabled={isLoading}
          initial={{ opacity: 0, x: -200 }}
          animate={animateOut ? { opacity: 0, x: -200 } : { opacity: 100, x: 0 }}
          transition={{ delay: animateOut ? 0.375 : 0.875, duration: 0.25 }}
          className={`w-full rounded-lg py-4 text-white font-bold text-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-300
                      ${
                        isLoading
                          ? "bg-gray-600 cursor-not-allowed"
                          : "bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500"
                      }`}
        >
          {isLoading ? "Signing Up..." : "Sign Up"}
        </motion.button>
        {errors.general && (
          <p className="mt-2 text-center text-sm text-red-500">
            {errors.general}
          </p>
        )}
      </form>
      <motion.p
        initial={{ opacity: 0, x: -200 }}
        animate={animateOut ? { opacity: 0, x: -200 } : { opacity: 100, x: 0 }}
        transition={{ delay: animateOut ? 0.375 : 0.875, duration: 0.25 }}
        className="mt-6 text-center text-base text-gray-400"
      >
        Already have an account?{" "}
        <span
          onClick={onToggleForm}
          className="font-extrabold text-indigo-600 hover:text-indigo-500 cursor-pointer transition-colors duration-300"
        >
          Sign in
        </span>
      </motion.p>
    </div>
  );
};

export default SignUpComponent;