'use client';

import React, { useState } from 'react';
import Lottie from 'lottie-react';
import Link from 'next/link';
import MManagement from '@/assests/management.json';
import TTecnical from '@/assests/technical_anime.json';
import DDesign from '@/assests/desing_anime.json';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';


const Selection = () => {
    const [management, setManagement] = useState(false);
    const [technical, setTechnical] = useState(false);
    const [design, setDesign] = useState(false);
    const [nextClicked, setNextClicked] = useState(false);
    const [selectionDisabled, setSelectionDisabled] = useState(false); // State to track selection disabled status

    const trigger = (category) => {
        if (!selectionDisabled) {
        if (category === 'M') {
            if (management) {
                setManagement(false);
            } else if (!technical || !design) {
                setManagement(true);
            } else {
                alert('At most 2 categories can be selected.');
            }
        } else if (category === 'T') {
            if (technical) {
                setTechnical(false);
            } else if (!management || !design) {
                setTechnical(true);
            } else {
                alert('At most 2 categories can be selected.');
            }
        } else if (category === 'D') {
            if (design) {
                setDesign(false);
            } else if (!management || !technical) {
                setDesign(true);
            } else {
                alert('At most 2 categories can be selected.');
            }
        }}
    };
    const handleNext = () => {
        setNextClicked(true);
        setSelectionDisabled(true);
        // Handle next button click, navigate or perform any other action
    };
    
    return (
        <div className="w-full bg-white text-white h-[200vh] ">
            <section id='sec1' className='flex flex-col gap-5 h-full'>
                <div className='text-blue-400 h-[10%]'>
                <TypeAnimation className="flex  justify-center font-mono font-medium text-2xl"
                        sequence={[
                            'Welcome to our community,',
                            1000,
                            'Welcome to our community,\nwe are happy to introduce our domains!!',
                            1000,
                        ]}
                        wrapper="string"
                        speed={75}
                        style={{ fontSize: '2em', display: 'flex',whiteSpace:'pre-line',textAlign:'center' }}
                        repeat={null}
                        cursor={false}
                        />
                        
                    
                </div>
                <div className='w-full flex justify-center items-center '>
                    
                    <button onClick={handleNext}   disabled={selectionDisabled} // Disable the button when selection is disabled
                        className="   bg-green-400 text-white px-5 py-5 rounded-md ">
                        Next
                    </button>
                </div>
                
                <div className="flex  justify-center   h-[90%]">
                    <div className="relative    flex flex-col justify-evenly items-center w-[70%] gap-8 ">
                    <motion.button animate={{x:0}} initial={{x:-800}}
                        onClick={() => trigger('M')}
                        className={
                            nextClicked
                                ? (management ? 'bg-gray-300 font-bold text-black text-xl h-[50%] w-full z-0 transform rotate-y-3 transition-all duration-500 rounded-xl' : 'z-[-200000] transition-all delay-100 absolute hidden')
                                : (management ? 'bg-green-300 font-bold text-black text-xl h-[25%] w-1/2 z-10 shadow-stone-950 shadow-2xl transform rotate-y-6 transition-all duration-500 rounded-3xl' : 'bg-gray-300 font-bold text-black text-xl h-[25%] w-1/2 z-0 transform rotate-y-3 transition-all duration-500 rounded-xl')
                        }
                    >
                         <h1 className={nextClicked?'':''}>management</h1>
                           <Lottie animationData={MManagement}className={nextClicked?'h-[30%] ':''} />
                           {nextClicked? <div className=' h-1/2 overflow-x-hidden 
                             relative  flex justify-center items-center  ' >
                            <ul className='flex flex-col  items-center gap-4 '>
                                <lb className=' bg-gray-400  rounded-full pl-12 pr-12 pt-4 pb-4 '>finacial</lb>
                                <lb className=' bg-gray-400  rounded-full pl-12 pr-12 pt-4 pb-4 '>app dev</lb>
                                <lb className=' bg-gray-400  rounded-full pl-12 pr-12 pt-4 pb-4 '>ml/ai</lb>
                                <lb className=' bg-gray-400  rounded-full pl-12 pr-12 pt-4 pb-4 '>iot</lb>
                            </ul>
                            </div>: null}
                    </motion.button>

                    <motion.button animate={{y:0}} initial={{y:1200}}
                        onClick={() => trigger('T')}
                        className={
                            nextClicked
                                ? (technical ? '  bg-gray-300 font-bold text-black text-xl h-[50%] w-full z-0 transform rotate-y-3 transition-all duration-500 rounded-xl' : ' z-[-200000] transition-all delay-100 absolute hidden')
                                : (technical ? 'bg-green-300 font-bold text-black text-xl h-[25%] w-1/2 z-10 shadow-stone-950 shadow-2xl transform rotate-y-6 transition-all duration-500 rounded-3xl' : 'bg-gray-300 font-bold text-black text-xl h-[25%] w-1/2 z-0 transform rotate-y-3 transition-all duration-500 rounded-xl')
                        }
                    >                            <h1 className={nextClicked?'':''}>technical</h1>
                           <Lottie animationData={TTecnical}className={nextClicked?'h-[30%] ':''} />
                           {nextClicked? 
                           <div className=' h-1/2 overflow-x-hidden
                             relative  flex justify-center items-center ' >
                            <ul className='flex flex-col  items-center gap-4 '>
                                <lb className=' bg-gray-400  rounded-full pl-12 pr-12 pt-4 pb-4 '>web dev</lb>
                                <lb className=' bg-gray-400  rounded-full pl-12 pr-12 pt-4 pb-4 '>app dev</lb>
                                <lb className=' bg-gray-400  rounded-full pl-12 pr-12 pt-4 pb-4 '>ml/ai</lb>
                                <lb className=' bg-gray-400  rounded-full pl-12 pr-12 pt-4 pb-4 '>iot</lb>
                            </ul>
                            </div>: null}
                        </motion.button>
                        <motion.button animate={{x:0}} initial={{x:800}}
                        onClick={() => trigger('D')}
                        className={
                            nextClicked
                                ? (design ? 'bg-gray-300 font-bold text-black text-xl h-[50%] w-full z-0 transform rotate-y-3 transition-all duration-500 rounded-xl' : ' z-[-200000] transition-all delay-100 absolute hidden')
                                : (design ? 'bg-green-300 font-bold text-black text-xl h-[25%] w-1/2 z-10 shadow-stone-950 shadow-2xl transform rotate-y-6 transition-all duration-500 rounded-3xl' : 'bg-gray-300 font-bold text-black text-xl h-[25%] w-1/2 z-0 transform rotate-y-3 transition-all duration-500 rounded-xl')
                        }
                    >                            <h1>design</h1>
                           <Lottie animationData={DDesign} className={nextClicked?'h-[30%]':''}/>
                           {nextClicked? <div className=' h-1/2 overflow-x-hidden
                             relative  flex justify-center items-center ' >
                            <ul className='flex flex-col  items-center gap-4 '>
                                <lb className=' bg-gray-400  rounded-full pl-12 pr-12 pt-4 pb-4 '>ui / ux</lb>
                                <lb className=' bg-gray-400  rounded-full pl-12 pr-12 pt-4 pb-4 '>blender</lb>
                                <lb className=' bg-gray-400  rounded-full pl-12 pr-12 pt-4 pb-4 '>photoshop</lb>
                                <lb className=' bg-gray-400  rounded-full pl-12 pr-12 pt-4 pb-4 '>figma</lb>
                            </ul>
                            </div>: null}
                        </motion.button>
                    </div>
                    
                </div>
                
            </section>

        </div>
    );
};

export default Selection; 