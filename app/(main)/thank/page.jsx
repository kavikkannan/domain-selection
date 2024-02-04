'use client';
import React from 'react';
import Selection from '@/components/Selection';
import Commonheader from '@/components/Common_Header';
import Lottie from 'lottie-react';
import under from '@/assests/under.json'
export default function thank() {
    return (
        <div>
             <Commonheader/>
             
              <div className='flex flex-col justify-center items-center h-screen w-full text-2xl sm:flex-row '>
              <h1>website under construction</h1>
        <Lottie animationData={under} className=' h-1/2 w-1/2'/>

        </div>
        </div>
      
    )
}
