import React, { useState } from 'react';
import Lottie from 'lottie-react';
import robo_animation from '@/assests/robo_animation.json';
import { useRouter } from 'next/navigation';
import { auth, provider } from '@/firebaseConfig';
import { signInWithPopup } from 'firebase/auth';
import userData from '@/assests/rereg_std_fata.json';
import Loading from './Loading';

const LandingPage = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false); 
    const [errorMessage, setErrorMessage] = useState("");

    const handleSignIn = () => {
        setLoading(true); 
        signInWithPopup(auth, provider)
            .then((data) => {
                const signedInEmail = data.user.email;
                sessionStorage.setItem("email", signedInEmail);
                sessionStorage.setItem("emailstatus", true);
                const userDataWithEmail = userData.users.find(user => user.EmailId === signedInEmail);
                if (userDataWithEmail) {
                  
                    router.push('/Domain_Selection');
                } else {
                  sessionStorage.setItem("email", null);
                  sessionStorage.setItem("emailstatus", false);
                    setLoading(false);
                    setErrorMessage("The logged-in email is not found in this chapter.");
                }
            })
            .catch(error => {
                setLoading(false);
                console.error("Error signing in:", error.message);
            });
    };

    return (
        <>
            {loading ? (
                <Loading /> 
            ) : (
              
                <div className="w-full bg-gray-800 text-white min-h-screen flex flex-col sm:flex-row  items-center justify-evenly">

                    <div className="w-full max-w-2xl mb-8">
                        <Lottie animationData={robo_animation} />
                    </div>
                    <div className="max-w-md bg-gray-900 p-8 shadow-md rounded-md">
                        <h1 className="text-3xl font-bold mb-4 text-center text-blue-500">Welcome to ISA International Chapter</h1>

                        <p className="text-lg text-gray-400 mb-8 text-center">
                            Unlock the Power of Automation Worldwide
                        </p>

                        <div className="mb-8">
                            <h2 className="text-xl font-bold mb-4 text-blue-500">About Us</h2>
                            <p className="text-gray-400 text-center">
                                ISA is a renowned global organization dedicated to promoting and advancing the field of automation and control systems. With a rich history spanning decades, our International Chapter serves as a vibrant hub for professionals seeking to stay at the forefront of technological advancements.
                            </p>
                        </div>

                        <div className="mb-8">
                            <h2 className="text-xl font-bold mb-4 text-blue-500">What Sets Us Apart</h2>
                            <ul className="list-disc pl-6  text-gray-400">
                                <li>
                                    <strong className=' font-extrabold text-blue-200 font'>Global Network:</strong> Join a diverse and dynamic community of professionals, researchers, and industry leaders from every corner of the world. Benefit from cross-cultural collaboration, knowledge exchange, and networking opportunities.
                                </li>
                                <li>
                                    <strong className=' font-extrabold text-blue-200 font'>Cutting-Edge Technology:</strong> Stay ahead of the curve with access to the latest developments in automation, instrumentation, and control systems. Our International Chapter is committed to being a source of knowledge and expertise for all members.
                                </li>
                                <li>
                                    <strong className=' font-extrabold text-blue-200 font'>Professional Development:</strong> Elevate your career with exclusive resources, training programs, and events tailored to enhance your skills and expertise in the field of automation. ISA is your partner in professional growth.
                                </li>
                            </ul>
                        </div>
                        <div className="text-center">
                            <button onClick={handleSignIn} className="bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600 transition duration-300">
                                Sign in with VIT student
                            </button>
                            {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default LandingPage;
