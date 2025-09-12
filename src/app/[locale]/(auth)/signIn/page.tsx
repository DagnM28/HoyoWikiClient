"use client";

import { useState } from "react";
import { useAuth } from "@/context/authContext";
import { signInApi } from "@/api/authAPI";
import { useRouter } from "next/navigation"; // Import useRouter
import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import AnimatedInput from "@/components/AnimatedInput";

interface SignInProps {
  onToggleForm: () => void;
  animateOut: boolean;
}

const SignInComponent = ({ onToggleForm, animateOut }: SignInProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const t = useTranslations("SignIn");
  const { signIn } = useAuth();
  const router = useRouter();

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!username) {
      newErrors.username = " cannot be empty.";
    }
    if (!password) {
      newErrors.password = " cannot be empty.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignIn = async (e: any) => {
    e.preventDefault();
    setErrors({});

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const data = await signInApi({ username, password });
      console.log("Dữ liệu người dùng nhận được từ server:", data);
      signIn({ name: data.username, email: data.email });

      if (data.role === "Admin") {
        router.push("/main/admin/dashboard");
      } else {
        router.push("/");
      }
    } catch (error: any) {
      console.error("Login error:", error);
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
        initial={{ opacity: 0, x: 200 }}
        animate={animateOut ? { opacity: 0, x: 200 } : { opacity: 100, x: 0 }}
        transition={{ delay: animateOut ? 0 : 0.5, duration: 0.25 }}
        className="mb-8 text-center text-4xl font-extrabold text-white"
      >
        {t("signin")}
      </motion.h2>
      <form onSubmit={handleSignIn} className="">
        <motion.div
          initial={{ opacity: 0, x: 200 }}
          animate={animateOut ? { opacity: 0, x: 200 } : { opacity: 100, x: 0 }}
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
          initial={{ opacity: 0, x: 200 }}
          animate={animateOut ? { opacity: 0, x: 200 } : { opacity: 100, x: 0 }}
          transition={{ delay: animateOut ? 0.25 : 0.75, duration: 0.25 }}
          className="my-8"
        >
          <AnimatedInput
            label="Password"
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors((prev) => ({ ...prev, password: "" }));
            }}
            errors={errors.password}
          />
        </motion.div>

        <motion.button
          type="submit"
          disabled={isLoading}
          initial={{ opacity: 0, x: 200 }}
          animate={animateOut ? { opacity: 0, x: 200 } : { opacity: 100, x: 0 }}
          transition={{ delay: animateOut ? 0.375 : 0.875, duration: 0.25 }}
          className={`w-full rounded-lg bg-indigo-600 py-4 text-white font-bold text-lg shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-300
                        ${
                          isLoading
                            ? "bg-gray-600 cursor-not-allowed"
                            : "bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500"
                        }`}
        >
          {isLoading ? "Signing In..." : "Sign In"}
        </motion.button>
        {errors.general && (
          <p className="mt-2 text-center text-sm text-red-500">
            {errors.general}
          </p>
        )}
      </form>
      <motion.p
        initial={{ opacity: 0, x: 200 }}
        animate={animateOut ? { opacity: 0, x: 200 } : { opacity: 100, x: 0 }}
        transition={{ delay: animateOut ? 0.5 : 1, duration: 0.25 }}
        className="mt-6 text-center text-base text-gray-400"
      >
        Don't have an account?{" "}
        <span
          onClick={onToggleForm}
          className="font-extrabold text-indigo-600 hover:text-indigo-500 cursor-pointer transition-colors duration-300"
        >
          Sign up
        </span>
      </motion.p>
    </div>
  );
};

export default SignInComponent;
