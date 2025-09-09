'use client';

import { useState } from 'react';
import { useAuth } from '@/context/authContext';
import { signInApi } from '@/api/authAPI'
import { useRouter } from 'next/navigation'; // Import useRouter
import { useTranslations } from 'next-intl';

interface SignInProps {
    onToggleForm: () => void;
}

const SignInComponent = ({ onToggleForm }: SignInProps) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isLoading, setIsLoading] = useState(false);

    const t = useTranslations('SignIn');
    const { signIn } = useAuth();
    const router = useRouter();

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};
        if (!username) {
            newErrors.username = 'Username cannot be empty.';
        }
        if (!password) {
            newErrors.password = 'Password cannot be empty.';
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
            console.log('Dữ liệu người dùng nhận được từ server:', data);
            signIn({ name: data.username, email: data.email });

            if (data.role === 'Admin') {
                router.push('/main/admin/dashboard');
            } else {
                router.push('/');
            }
        } catch (error: any) {
            console.error('Login error:', error);
            setErrors({ general: error.message || 'Network error. Please try again.' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md md:max-w-lg rounded-xl bg-white p-8 shadow-2xl transition-transform duration-300 transform scale-105">
            <h2 className="mb-8 text-center text-4xl font-extrabold text-gray-800">{t('signin')}</h2>
            <form onSubmit={handleSignIn} className="space-y-6">
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
                <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full rounded-lg bg-indigo-600 py-4 text-white font-bold text-lg shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-300
                        ${isLoading ? 'bg-gray-600 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500'}`}
                >
                    {isLoading ? 'Signing In...' : 'Sign In'}
                </button>
                {errors.general && <p className="mt-2 text-center text-sm text-red-500">{errors.general}</p>}
            </form>
            <p className="mt-6 text-center text-base text-gray-600">
                Don't have an account?{' '}
                <span onClick={onToggleForm} className="font-extrabold text-indigo-600 hover:text-indigo-500 cursor-pointer transition-colors duration-300">
                    Sign up
                </span>
            </p>
        </div>
    );
};

export default SignInComponent;