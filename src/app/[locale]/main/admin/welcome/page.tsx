"use client";

import React from 'react';

const WelcomeScreen = () => {
    return (
        <div className="flex items-center justify-center h-full p-8">
            <div className="text-center">
                <h1 className="text-5xl font-extrabold text-gray-800 mb-4 animate-fadeIn">Welcome, Admin!</h1>
                <p className="text-lg text-gray-600 mb-8 animate-fadeIn delay-100">
                    Sử dụng thanh menu bên để quản lý người dùng và theo dõi hoạt động.
                </p>
                <div className="p-6 bg-gray-100 rounded-xl shadow-md animate-fadeIn delay-200">
                    <p className="text-gray-700 text-xl font-semibold">
                        "Your tools are here to help you manage with ease and precision."
                    </p>
                </div>
            </div>
        </div>
    );
};

export default WelcomeScreen;
