"use client"
import { motion } from "framer-motion";
import { useState } from "react";
import React from 'react';
import { cn } from "@/lib/utils"

interface AnimatedInputProps {
  label: string;
  id: string;
  errors?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  labelClassNames?: string;
  inputClassNames?: string;
}

const AnimatedInput: React.FC<AnimatedInputProps> = ({
  label,
  id,
  errors,
  value,
  onChange,
  type = "text",
  labelClassNames,
  inputClassNames
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const hasValue = value && value.length > 0;

  const defaultLabelClasses = "w-full text-left select-none absolute top-3/4 left-4 -translate-y-1/2 text-lg font-bold pointer-events-none transition-all duration-300 ease-in-out";
  const defaultInputClasses = "block w-full border-b border-white px-4 py-3 text-lg text-white placeholder-transparent focus:border-indigo-500 focus:outline-none";

  return (
    <div className="relative my-6">
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={cn(defaultInputClasses, inputClassNames)}
        placeholder={label}
      />
      <motion.label
        htmlFor={id}
        initial={false}
        animate={{
          y: (isFocused || hasValue) ? "-150%" : "-50%",
          x: (isFocused || hasValue) ? "-2.5%" : "0%",
          scale: (isFocused || hasValue) ? 0.8 : 1,
          color: (isFocused || hasValue) ? "#9CA3AF" : "#FFFFFF",
          opacity: (isFocused || hasValue) ? "80%" : "100%"
        }}
        transition={{
          duration: 0.3,
          ease: "easeOut"
        }}
        className={cn(defaultLabelClasses, labelClassNames, "transform origin-left")}
      >
        {label}
        {errors && <span className="ml-1 text-sm text-red-500">{errors}</span>}
      </motion.label>
    </div>
  );
};

export default AnimatedInput;
