// src/components/OTPVerification.tsx

'use client';

import React, { useState } from 'react';
import { verifyOtpApi } from '../api/authAPI';

interface OTPVerificationProps {
    email: string;
    onVerifySuccess: () => void;
    onResendOtp: () => void;
    onBack: () => void;
}

const OTPVerificationComponent = ({
    email,
    onVerifySuccess,
    onResendOtp,
    onBack,
}: OTPVerificationProps) => {
    const [otp, setOtp] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        if (otp.length !== 6) {
            setError('Please enter a valid 6-digit OTP.');
            return;
        }
        try {
            // Gọi hàm API từ file mới
            const data = await verifyOtpApi({ email, otp });
            onVerifySuccess();
            console.log(data);
        } catch (err: any) {
            console.error('OTP verification error:', err);
            setError(err.message || 'Network error. Please try again.');
        }
    };

    const handleResendClick = () => {
        onResendOtp();
    };

    return (
        <div className="w-full max-w-lg md:max-w-xl rounded-xl bg-white p-8 shadow-2xl transition-transform duration-300">
            <h2 className="mb-8 text-center text-4xl font-extrabold text-gray-800">Email Verification</h2>
            <p className="mb-6 text-center text-lg text-gray-600">
                A 6-digit OTP has been sent to your email at <br />
                <span className="font-bold text-indigo-600">{email}</span>
            </p>
            <form onSubmit={handleVerify} className="space-y-6">
                <div>
                    <label className="block text-base font-bold text-gray-700 mb-2">OTP Code</label>
                    <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        maxLength={6}
                        required
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-md focus:border-indigo-500 focus:ring-indigo-500 p-4 text-lg text-gray-900 placeholder-gray-400 focus:outline-none"
                        placeholder="Enter 6-digit OTP"
                    />
                    {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
                </div>
                <button
                    type="submit"
                    className="w-full rounded-lg bg-blue-600 py-4 text-white font-bold text-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300"
                >
                    Verify
                </button>
            </form>
            <div className="mt-6 flex justify-between text-base text-gray-600">
                <span
                    onClick={handleResendClick}
                    className="font-extrabold text-indigo-600 hover:text-indigo-500 cursor-pointer transition-colors duration-300"
                >
                    Resend OTP
                </span>
                <span
                    onClick={onBack}
                    className="font-extrabold text-indigo-600 hover:text-indigo-500 cursor-pointer transition-colors duration-300"
                >
                    Back
                </span>
            </div>
        </div>
    );
};

export default OTPVerificationComponent;