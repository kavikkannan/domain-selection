'use client';
import React from 'react';
import Lottie from 'lottie-react';
import robo_animation from '@/assests/robo_animation.json'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { auth,provider } from '@/firebaseConfig';
import { signInWithPopup } from 'firebase/auth';
import { useState,useEffect } from 'react';
import userData from '@/assests/rereg_std_fata.json';

const LandingPage = () => {
  const router=useRouter()
  const handle =()=>{
      signInWithPopup(auth,provider).then((data)=>{
       
          sessionStorage.setItem("email",data.user.email)
          router.push('/Domain_Selection');
          const userDataWithEmail = userData.users.find(user => user.EmailId === data.user.email);
        if (userDataWithEmail) {
            const registerNumber = userDataWithEmail.RegisterNumber;
            const studentName = userDataWithEmail.StudentName;
            sessionStorage.setItem("stdname",studentName);
        } else {
            console.log("Register number not found for the provided email.");
        }
      })
  }




  return (
    <div className="absolute top-0 -z-10 w-full bg-gray-800 text-white min-h-screen flex items-center justify-center ">

      <div className="absolute left-0  w-1/2 animate-roaming-container">
        {/* <img className='roaming-symbol w-20 h-20' src="/images/login_bg2.jpg" alt="" />
        <img className='roaming-symbol w-20 h-20' src="/images/login_bg2.jpg" alt="" /> */}
      <Lottie animationData={robo_animation} />
      </div>
    <div className=" absolute right-4 max-w-4xl bg-gray-900 p-8 shadow-md rounded-md  z-10">
        <h1 className="text-4xl font-bold mb-8 text-center text-blue-500">Welcome to ISA International Chapter</h1>

        <p className="text-lg text-gray-400 mb-8 text-center">
          Unlock the Power of Automation Worldwide
        </p>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-blue-500">About Us</h2>
          <p className="text-gray-400 text-center">
            ISA is a renowned global organization dedicated to promoting and advancing the field of automation and control systems. With a rich history spanning decades, our International Chapter serves as a vibrant hub for professionals seeking to stay at the forefront of technological advancements.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-blue-500">What Sets Us Apart</h2>
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
          <button onClick={handle} className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">
            signin with vit student
          </button>
        </div>

      </div>
    </div>
  );
};

export default LandingPage;
