'use client';
/* import React, { useState } from 'react';
import '@/public/css/LandingPage.css';
import Lottie from 'lottie-react';
import Link from 'next/link';

const Selection = () => {
    const [management, setManagement] = useState(false);
    const [technical, setTechnical] = useState(false);
    const [design, setDesign] = useState(false);

    const trigger = (category) => {
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
        }
    };
    
    return (
        <div className="w-full bg-black text-white h-fit">
            <section id='sec1' className=' h-screen'>
                <div>
                    <h1 className="flex items-center justify-center">Welcome to our community,</h1>
                    <p className="flex items-center justify-center">we are happy to introduce our domains</p>
                </div>
                <div className="flex justify-center pt-10 pb-10">
                    <div className="bg-green-200 h-[100px] w-1/2 text-black flex justify-center gap-32 rounded-full">
                        <button onClick={() => trigger('M')} className={management ? 'text-pink-500 font-bold' : 'hover:text-pink-500 hover:font-bold'}>
                            management
                        </button>
                        <button onClick={() => trigger('T')} className={technical ? 'text-pink-500 font-bold' : 'hover:text-pink-500 hover:font-bold'}>
                            technical
                        </button>
                        <button onClick={() => trigger('D')} className={design ? 'text-pink-500 font-bold' : 'hover:text-pink-500 hover:font-bold'}>
                            design
                        </button>
                    </div>
                </div>
                <div className="flex justify-center">
                    <div className="relative flex justify-center w-1/2 gap-2 h-[50vh]">
                        <div className={management ? 'bg-blue-300 h-[100%] w-1/3 z-10 shadow-stone-950 shadow-2xl transform rotate-y-6 transition-all duration-500 rounded-3xl' : 'bg-blue-300 h-[50%] w-1/3 z-0 transform rotate-y-3 transition-all duration-500 rounded-xl'}>
                            sec 1
                        </div>
                        <div className={technical ? 'bg-blue-300 h-[100%] w-1/3 z-10 shadow-stone-950 shadow-2xl transform rotate-y-6 transition-all duration-500 rounded-3xl' : 'bg-blue-300 h-[50%] w-1/3 z-0 transform rotate-y-3 transition-all duration-500 rounded-xl'}>
                            sec 2
                        </div>
                        <div className={design ? 'bg-blue-300 h-[100%] w-1/3 z-10 shadow-stone-950 shadow-2xl transform rotate-y-6 transition-all duration-500 rounded-3xl' : 'bg-blue-300 h-[50%] w-1/3 z-0 transform rotate-y-3 transition-all duration-500 rounded-xl'}>
                            sec 3
                        </div>
                    </div>
                </div>
            </section>
            <section id='sec2' className='h-screen bg-green-300'>
                <div className=' h-[90%] '>
                    <div className='flex h-screen flex-row'>
                        <div className=' h-screen bg-white relative w-1/2 flex justify-center items-center ' >
                            <ul className='flex flex-col  items-center '>
                                <lb className=' bg-gray-400  rounded-full pl-12 pr-12 pt-4 pb-4 '>sad</lb>
                                <lb className=' bg-gray-400  rounded-full pl-12 pr-12 pt-4 pb-4 '>sad</lb>
                                <lb className=' bg-gray-400  rounded-full pl-12 pr-12 pt-4 pb-4 '>sad</lb>
                                <lb className=' bg-gray-400  rounded-full pl-12 pr-12 pt-4 pb-4 '>sad</lb>
                            </ul>
                        </div>
                    <div className=' h-screen w-1/2  flex justify-center items-center ' >
                    <ul className='flex '>
                    <lb className=' bg-gray-400  rounded-full pl-12 pr-12 pt-4 pb-4 '>sad</lb>
                    <lb className=' bg-gray-400  rounded-full pl-12 pr-12 pt-4 pb-4 '>sad</lb>
                    <lb className=' bg-gray-400  rounded-full pl-12 pr-12 pt-4 pb-4 '>sad</lb>
                    <lb className=' bg-gray-400  rounded-full pl-12 pr-12 pt-4 pb-4 '>sad</lb>
                    </ul>
                    </div>
                    </div>
                    
                </div>
                <div className='flex justify-end  bg-red-200 h-[10%]  '>
                    <button className='-translate-x-[100%]' >enroll now</button>
                </div>
            </section>
        </div>
    );
};

export default Selection;


import React, { useState, useEffect } from 'react';
import '@/public/css/LandingPage.css';
import Lottie from 'lottie-react';
import Link from 'next/link';
import MManagement from '@/assests/management.json';
import TTecnical from '@/assests/technical_anime.json';
import DDesign from '@/assests/desing_anime.json';

const Selection = () => {
    const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [nextClicked, setNextClicked] = useState(false);
    const [categories, setCategories] = useState([
        { id: 'M', label: 'management', animationData: MManagement, selected: false },
        { id: 'T', label: 'technical', animationData: TTecnical, selected: false },
        { id: 'D', label: 'design', animationData: DDesign, selected: false }
    ]);

    const toggleCategory = (categoryId) => {
        const updatedCategories = categories.map(category =>
            category.id === categoryId ? { ...category, selected: !category.selected } : category
        );
        setSelectedCategoryIds(selectedCategoryIds.includes(categoryId) ?
            selectedCategoryIds.filter(id => id !== categoryId) :
            [...selectedCategoryIds, categoryId]
        );
        setCategories(updatedCategories);
    };

    useEffect(() => {
        if (!nextClicked) return;
        const timer = setTimeout(() => {
            const updatedCategories = categories.map(category => ({ ...category, selected: false }));
            setCategories(updatedCategories);
        }, 5000); // 5 seconds
        return () => clearTimeout(timer);
    }, [nextClicked]);

    const handleNext = () => {
        const selected = categories.filter((category) => selectedCategoryIds.includes(category.id));
        setSelectedCategories(selected);
        setNextClicked(true);
        // Handle next button click, navigate or perform any other action
    };

    return (
        <div className="w-full bg-white text-white h-fit relative">
            <section id='sec1' className='h-screen'>
                <div className='text-green-400 h-[10%]'>
                    <h1 className="flex items-center justify-center">Welcome to our community,</h1>
                    <p className="flex items-center justify-center">we are happy to introduce our domains</p>
                </div>

                <div className="flex justify-center">
                    <div className={'relative flex w-[70%] gap-8 h-screen'}>
                        {nextClicked ? categories.map((category) => (
                            <button key={category.id} className={category.selected ? 'bg-gray-300 h-[50%] w-1/3 z-0 transform rotate-y-3 transition-all duration-500 rounded-xl' : 'hidden'}>
                                <h1>{category.label}</h1>
                                <Lottie animationData={category.animationData} />
                            </button>
                        ))
                            :
                            categories.map((category) => (
                                <button key={category.id} onClick={() => toggleCategory(category.id)} className={selectedCategoryIds.includes(category.id) ? 'bg-green-300 font-bold text-black text-xl h-[50%] w-1/3 z-10 shadow-stone-950 shadow-2xl transform rotate-y-6 transition-all duration-500 rounded-3xl' : 'bg-gray-300 h-[50%] w-1/3 z-0 transform rotate-y-3 transition-all duration-500 rounded-xl'}>
                                    <h1>{category.label}</h1>
                                    <Lottie animationData={category.animationData} />
                                </button>
                            ))}
                    </div>
                </div>

                {!nextClicked && (
                    <button onClick={handleNext} className="absolute bottom-4 right-4 bg-green-400 text-white px-4 py-2 rounded-md">
                        Next
                    </button>
                )}
            </section>

        </div>
    );
};

export default Selection;*/

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

    const trigger = (category) => {
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
        }
    };
    const handleNext = () => {
        setNextClicked(true);
        // Handle next button click, navigate or perform any other action
    };
    
    return (
        <div className="w-full bg-white text-white h-screen">
            <section id='sec1' className='flex flex-col gap-5 h-full'>
                <div className='text-blue-400 h-[10%]'>
                <TypeAnimation className="flex items-center justify-center font-mono font-medium text-4xl"
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
                
                <div className="flex  justify-center   h-[90%]">
                    <div className="relative    flex flex-col justify-evenly items-center w-[70%] gap-8 ">
                    <motion.button animate={{x:0}} initial={{x:-800}}
                        onClick={() => trigger('M')}
                        className={
                            nextClicked
                                ? (management ? 'bg-gray-300 font-bold text-black text-xl h-fit w-full z-0 transform rotate-y-3 transition-all duration-500 rounded-xl' : 'z-[-200000] transition-all delay-100 absolute hidden')
                                : (management ? 'bg-green-300 font-bold text-black text-xl h-[50%] w-1/3 z-10 shadow-stone-950 shadow-2xl transform rotate-y-6 transition-all duration-500 rounded-3xl' : 'bg-gray-300 font-bold text-black text-xl h-[50%] w-1/3 z-0 transform rotate-y-3 transition-all duration-500 rounded-xl')
                        }
                    >
                         <h1 className={nextClicked?'':''}>management</h1>
                           <Lottie animationData={MManagement}className={nextClicked?'h-[30%] translate-x-10':''} />
                           {nextClicked? <div className=' h-fit overflow-x-hidden 
                             relative  flex justify-center items-center ' >
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
                                ? (technical ? '  bg-gray-300 font-bold text-black text-xl h-[90%] w-full z-0 transform rotate-y-3 transition-all duration-500 rounded-xl' : ' z-[-200000] transition-all delay-100 absolute hidden')
                                : (technical ? 'bg-green-300 font-bold text-black text-xl h-[50%] w-1/3 z-10 shadow-stone-950 shadow-2xl transform rotate-y-6 transition-all duration-500 rounded-3xl' : 'bg-gray-300 font-bold text-black text-xl h-[50%] w-1/3 z-0 transform rotate-y-3 transition-all duration-500 rounded-xl')
                        }
                    >                            <h1 className={nextClicked?'':''}>technical</h1>
                           <Lottie animationData={TTecnical}className={nextClicked?'h-[30%] translate-x-10':''} />
                           {nextClicked? <div className=' h-fit overflow-x-hidden
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
                                ? (design ? 'bg-gray-300 font-bold text-black text-xl h-[90%] w-full z-0 transform rotate-y-3 transition-all duration-500 rounded-xl' : ' z-[-200000] transition-all delay-100 absolute hidden')
                                : (design ? 'bg-green-300 font-bold text-black text-xl h-[50%] w-1/3 z-10 shadow-stone-950 shadow-2xl transform rotate-y-6 transition-all duration-500 rounded-3xl' : 'bg-gray-300 font-bold text-black text-xl h-[50%] w-1/3 z-0 transform rotate-y-3 transition-all duration-500 rounded-xl')
                        }
                    >                            <h1>design</h1>
                           <Lottie animationData={DDesign} className={nextClicked?'h-[30%]':''}/>
                           {nextClicked? <div className=' h-fit overflow-x-hidden
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
                    {!nextClicked && (
                    <button onClick={handleNext} className=" absolute bottom-[10%] bg-green-400 text-white px-5 py-5 rounded-md ">
                        Next
                    </button>
                )}
                </div>
                
            </section>

        </div>
    );
};

export default Selection; 