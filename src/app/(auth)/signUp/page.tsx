// src/app/(auth)/signUp/page.tsx

'use client';

import { useState } from 'react';
import { signUpApi } from '../../../api/authAPI';

interface SignUpProps {
    onToggleForm: () => void;
    onSignUpSuccess: (email: string, username: string) => void;
}

const SignUpComponent = ({ onToggleForm, onSignUpSuccess }: SignUpProps) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isLoading, setIsLoading] = useState(false);

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};
        const emailRegex = /\S+@\S+\.\S+/;

        if (!username) {
            newErrors.username = 'Username cannot be empty.';
        }

        if (!email) {
            newErrors.email = 'Email cannot be empty.';
        } else if (!emailRegex.test(email)) {
            newErrors.email = 'Please enter a valid email address.';
        }

        if (!password) {
            newErrors.password = 'Password cannot be empty.';
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters long.';
        }

        if (!confirmPassword) {
            newErrors.confirmPassword = 'Confirm password cannot be empty.';
        } else if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match.';
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
            // Gọi hàm API từ file mới
            const data = await signUpApi({ username, email, password });
            onSignUpSuccess(email, username);
        } catch (error: any) {
            console.error('Sign up error:', error);
            setErrors({ general: error.message || 'Network error. Please try again.' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md md:max-w-lg rounded-xl bg-white p-8 shadow-2xl transition-transform duration-300 transform scale-105">
            <h2 className="mb-8 text-center text-4xl font-extrabold text-gray-800">Sign Up</h2>
            <form onSubmit={handleSignUp} className="space-y-6">
                <div>
                    <label className="block text-base font-bold text-gray-700 mb-2">Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-md focus:border-indigo-500 focus:ring-indigo-500 p-4 text-lg text-gray-900 placeholder-gray-400 focus:outline-none"
                        placeholder="Enter your username"
                    />
                    {errors.username && <p className="mt-2 text-sm text-red-500">{errors.username}</p>}
                </div>
                <div>
                    <label className="block text-base font-bold text-gray-700 mb-2">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-md focus:border-indigo-500 focus:ring-indigo-500 p-4 text-lg text-gray-900 placeholder-gray-400 focus:outline-none"
                        placeholder="Enter your email"
                    />
                    {errors.email && <p className="mt-2 text-sm text-red-500">{errors.email}</p>}
                </div>
                <div>
                    <label className="block text-base font-bold text-gray-700 mb-2">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-md focus:border-indigo-500 focus:ring-indigo-500 p-4 text-lg text-gray-900 placeholder-gray-400 focus:outline-none"
                        placeholder="Enter your password"
                    />
                    {errors.password && <p className="mt-2 text-sm text-red-500">{errors.password}</p>}
                </div>
                <div>
                    <label className="block text-base font-bold text-gray-700 mb-2">Confirm Password</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-md focus:border-indigo-500 focus:ring-indigo-500 p-4 text-lg text-gray-900 placeholder-gray-400 focus:outline-none"
                        placeholder="Confirm your password"
                    />
                    {errors.confirmPassword && <p className="mt-2 text-sm text-red-500">{errors.confirmPassword}</p>}
                </div>
                <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full rounded-lg bg-green-600 py-4 text-white font-bold text-lg shadow-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-300
                        ${isLoading ? 'bg-gray-600 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 focus:ring-green-500'}`}
                >
                    {isLoading ? 'Signing Up...' : 'Sign Up'}
                </button>
                {errors.general && <p className="mt-2 text-center text-sm text-red-500">{errors.general}</p>}
            </form>
            <p className="mt-6 text-center text-base text-gray-600">
                Already have an account?{' '}
                <span onClick={onToggleForm} className="font-extrabold text-indigo-600 hover:text-indigo-500 cursor-pointer transition-colors duration-300">
                    Sign in
                </span>
            </p>
        </div>
    );
};

export default SignUpComponent;