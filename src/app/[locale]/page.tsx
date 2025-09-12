"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/authContext";
import Image from "next/image";
import SignInComponent from "./(auth)/signIn/page";
import SignUpComponent from "./(auth)/signUp/page";
import OTPVerificationComponent from "../../components/OTPVerification";
import { motion } from "motion/react";

type AuthModalState = "signin" | "signup" | "otp";

const WelcomeContent = () => {
  const router = useRouter();
  const { isAuthenticated, user, signIn } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalState, setAuthModalState] =
    useState<AuthModalState>("signin");
  const [userEmail, setUserEmail] = useState("");
  const [username, setUsername] = useState("");
  const [ isLoading, setIsLoading ] = useState(false);
  useEffect(() => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
    } else {
      setShowAuthModal(false);
    }
  }, [isAuthenticated]);

  const handleImageClick = (topic: "gi" | "hsr") => {
    if (isAuthenticated) {
      router.push(`/main/home?topic=${topic}`);
      router.refresh();
    }
  };

  const handleToggleForm = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setAuthModalState(authModalState === "signin" ? "signup" : "signin");
    }, 1000);
  };

  const handleSignUpSuccess = (email: string, username: string) => {
    setUserEmail(email);
    setUsername(username);
    setAuthModalState("otp");
  };

  const handleOTPVerifySuccess = () => {
    // Sau khi xác minh OTP, tự động đăng nhập người dùng
    signIn({ name: username, email: userEmail });
    // Đóng modal và trạng thái isAuthenticated sẽ tự cập nhật nhờ useEffect
    setShowAuthModal(false);
  };

  const handleResendOtp = () => {
    console.log("Gửi lại OTP cho email:", userEmail);
  };

  const handleBackToSignUp = () => {
    setAuthModalState("signup");
  };

  const renderAuthModalContent = () => {
    switch (authModalState) {
      case "signin":
        return <SignInComponent onToggleForm={handleToggleForm} animateOut={isLoading}/>;
      case "signup":
        return (
          <SignUpComponent
            onToggleForm={handleToggleForm}
            animateOut={isLoading}
            onSignUpSuccess={handleSignUpSuccess}
          />
        );
      case "otp":
        return (
          <OTPVerificationComponent
            email={userEmail}
            onVerifySuccess={handleOTPVerifySuccess}
            onResendOtp={handleResendOtp}
            onBack={handleBackToSignUp}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 to-blue-900 p-6">
        <h1 className="relative z-10 mb-8 text-center text-5xl font-extrabold text-white sm:text-7xl md:text-8xl">
          {isAuthenticated ? `Hello, ${user?.name}` : ""}
        </h1>
        <div className="relative z-10 flex flex-col items-center space-y-8 sm:flex-row sm:space-x-42 sm:space-y-0">
          <div
            onClick={() => handleImageClick("gi")}
            className="group relative cursor-pointer rounded-3xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-400"
          >
            <Image
              src="/paimon_emoji.png"
              alt="Genshin Impact"
              width={400}
              height={400}
              className="w-64 h-64 rounded-3xl transition-transform duration-300 group-hover:rotate-6"
            />
            <div className="absolute inset-0 rounded-3xl ring-4 ring-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <div
            onClick={() => handleImageClick("hsr")}
            className="group relative cursor-pointer rounded-3xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-400"
          >
            <Image
              src="/m7_emoji.png"
              alt="Honkai: Star Rail"
              width={400}
              height={400}
              className="w-64 h-64 rounded-3xl transition-transform duration-300 group-hover:-rotate-6"
            />
            <div className="absolute inset-0 rounded-3xl ring-4 ring-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </div>
      </div>
      {/* animate={{rotate: 360}} transition={{type: "spring"}}  */}
      {showAuthModal && (
        <div className={`fixed inset-0 z-50 px-12 flex items-center justify-${authModalState == "signin" ? "end": "start"} bg-gradient-to-r from-[#2C385C] to-[#591C73]`}>
          <div className={`overflow-visible w-screen h-screen translate-y-[125vh] absolute ${authModalState == "signin" ? "translate-x-[45vw]" : "translate-x-[-145vw]"}`}>
          <motion.div
            animate={isLoading ? { rotate: 0 } : { rotate: authModalState == "signin" ? -80 : 80 }}
            initial={{ rotate: 0 }}
            transition={{ type: "keyframes", duration: 0.5, delay: isLoading ? 0.25 : 0 }}
            style={{
              originX: authModalState == "signin" ? 0 : 1,
              originY: 0,
            }}
            className="bg-black/30 backdrop-blur-sm w-[200%] h-[150%]"
          ></motion.div>
          </div>
          <div className={`z-50 w-2/5`}>{renderAuthModalContent()}</div>
        </div>
      )}
    </>
  );
};

export default function HomePage() {
  return <WelcomeContent />;
}
