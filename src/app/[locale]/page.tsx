'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/authContext';
import Image from 'next/image';
import SignInComponent from './(auth)/signIn/page';
import SignUpComponent from './(auth)/signUp/page';
import OTPVerificationComponent from '../../components/OTPVerification';

type AuthModalState = 'signin' | 'signup' | 'otp';

const WelcomeContent = () => {
  const router = useRouter();
  const { isAuthenticated, user, signIn } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalState, setAuthModalState] = useState<AuthModalState>('signin');
  const [userEmail, setUserEmail] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
    } else {
      setShowAuthModal(false);
    }
  }, [isAuthenticated]);

  const handleImageClick = (topic: 'gi' | 'hsr') => {
    if (isAuthenticated) {
      router.push(`/main/home?topic=${topic}`);
      router.refresh();
    }
  };

  const handleToggleForm = () => {
    setAuthModalState(authModalState === 'signin' ? 'signup' : 'signin');
  };

  const handleSignUpSuccess = (email: string, username: string) => {
    setUserEmail(email);
    setUsername(username);
    setAuthModalState('otp');
  };

  const handleOTPVerifySuccess = () => {
    // Sau khi xác minh OTP, tự động đăng nhập người dùng
    signIn({ name: username, email: userEmail });
    // Đóng modal và trạng thái isAuthenticated sẽ tự cập nhật nhờ useEffect
    setShowAuthModal(false);
  };

  const handleResendOtp = () => {
    console.log('Gửi lại OTP cho email:', userEmail);
  };

  const handleBackToSignUp = () => {
    setAuthModalState('signup');
  };

  const renderAuthModalContent = () => {
    switch (authModalState) {
      case 'signin':
        return <SignInComponent onToggleForm={handleToggleForm} />;
      case 'signup':
        return <SignUpComponent onToggleForm={handleToggleForm} onSignUpSuccess={handleSignUpSuccess} />;
      case 'otp':
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
          {isAuthenticated ? `Hello, ${user?.name}` : ''}
        </h1>
        <div className="relative z-10 flex flex-col items-center space-y-8 sm:flex-row sm:space-x-42 sm:space-y-0">
          <div
            onClick={() => handleImageClick('gi')}
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
            onClick={() => handleImageClick('hsr')}
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
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm transition-opacity duration-300">
          <div className="animate-fade-in-up w-full max-w-lg md:max-w-xl">
            {renderAuthModalContent()}
          </div>
        </div>
      )}
    </>
  );
};

export default function HomePage() {
  return <WelcomeContent />;
}
