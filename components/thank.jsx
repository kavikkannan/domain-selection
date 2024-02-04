'use client';
import React from 'react';
import Lottie from 'lottie-react';

import TTecnical from '@/assests/thank.json';
const ThankYouPage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl font-bold mb-4">Thank You!</h1>
            <p className="text-lg mb-8">Let's make a good team.</p>
            <div className="w-64 h-64">
            <Lottie animationData={TTecnical} className='' />

            </div>
        </div>
    );
};

export default ThankYouPage;