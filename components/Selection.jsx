'use client';

import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import Link from 'next/link';
import MManagement from '@/assests/management.json';
import TTecnical from '@/assests/technical_anime.json';
import DDesign from '@/assests/desing_anime.json';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { ref, set,get,remove } from 'firebase/database';
import { db } from '@/firebaseConfig';
import { useRouter } from 'next/navigation';
import userData from '@/assests/rereg_std_fata.json';
import Loading from './Loading';
const Selection = () => {
    const router=useRouter();
    const [management, setManagement] = useState(false);
    const [technical, setTechnical] = useState(false);
    const [W, setW] = useState(true);
    const [design, setDesign] = useState(false);
    const [nextClicked, setNextClicked] = useState(false);
    const [selectionDisabled, setSelectionDisabled] = useState(false);
    const [regno, setRegno] = useState("");
    const [stdname, setStdName] = useState("");
    const [email, setEmail1] = useState("");
    const [email1, setEmail2] = useState("");
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const e = sessionStorage.getItem("email");
                setEmail2(e);
                if (!sessionStorage.getItem("emailstatus")){
                    router.push("/");
                }
                if (userData && userData.users) {
                    const userDataWithEmail = userData.users.find(user => user.EmailId === e);
                    if (userDataWithEmail) {
                        const registerNumber = userDataWithEmail.RegisterNumber;
                        const studentName = userDataWithEmail.StudentName;
                        setStdName(studentName);
    
                        const ff = studentName + "9999" + registerNumber;
                        setEmail1(ff); 
                    } else {
                        console.log("Register number not found for the provided email.");
                    }
                } else {
                    console.log("userData is undefined or does not contain the expected structure.");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
    
        fetchData();
    }, []);
    
    const [domain1, setDomain1] = useState("");
    const [domain2, setDomain2] = useState("");
    const [subDomain1, setSubDomain1] = useState("");
    const [subDomain2, setSubDomain2] = useState("");
    
 


    const submit = async () => {
        setLoading(true);
        const userSnapshot = await get(ref(db, `UserNew/${email}`));
    
        if (userSnapshot) {
            await remove(ref(db, `UserNew/${email}`));
        }
    
        const domainRef1 = ref(db, `UserNew/${email}/${domain1}`);
        await set(domainRef1, {
            Subdomain1: subDomain1,
        });
            const domainRef2 = ref(db, `UserNew/${email}/${domain2}`);
        await set(domainRef2, {
            Subdomain2: subDomain2,
        });
        
        router.push('/thank');
    };

  const trigger = (category) => {
    if (!selectionDisabled) {
        let selectedSubDomain;
        if (category === 'M') {
            selectedSubDomain = subDomain1;
            if (management) {
                setManagement(false);
                setDomain1('');
            } else if (!technical || !design) {
                setManagement(true);
                if (!domain1) {
                    setDomain1('management');
                } else {
                    setDomain2('management');
                }
            } else {
                alert('At most 2 categories can be selected.');
                return;
            }
        } else if (category === 'T') {
            selectedSubDomain = subDomain2;
            if (technical) {
                setTechnical(false);
                setDomain1('');
            } else if (!management || !design) {
                setTechnical(true);
                if (!domain1) {
                    setDomain1('technical');
                } else {
                    setDomain2('technical');
                }
            } else {
                alert('At most 2 categories can be selected.');
                return;
            }
        } else if (category === 'D') {
            selectedSubDomain = subDomain2;
            if (design) {
                setDesign(false);
                setDomain1('');
            } else if (!management || !technical) {
                setDesign(true);
                if (!domain1) {
                    setDomain1('design');
                } else {
                    setDomain2('design');
                }
            } else {
                alert('At most 2 categories can be selected.');
                return;
            }
        }
        selectedSubDomain = selectedSubDomain ? selectedSubDomain + ', ' + category : category;
        if (category === 'M') {
            setSubDomain1(selectedSubDomain);
        } else {
            setSubDomain2(selectedSubDomain);
        }
    }
};

    const handleNext = () => {
        setNextClicked(true);
        setSelectionDisabled(true);
       
    };

    const Reset = () => {
        setSubDomain1("");
        setSubDomain2("");
        setCon1(false);
        setCon2(false);
    };
    const back = () => {
        setSubDomain1("");
        setSubDomain2("");
        setCon1(false);
        setCon2(false);
        setDomain1("");
        setDomain2("");
        setManagement(false);
        setTechnical(false);
        setDesign(false);
        setNextClicked(!nextClicked);
        setSelectionDisabled(false);
    };
    const [subCon1, setCon1] = useState(false);
    const [subCon2, setCon2] = useState(false);
    const handleOptionClick = (domain, option) => {
        if (domain == domain1) {
            setCon1(true);
            setSubDomain1(prevSubDomain => prevSubDomain ? prevSubDomain + ' ' + option : option);
        } else if (domain == domain2) {
            setCon2(true);
            setSubDomain2(prevSubDomain => prevSubDomain ? prevSubDomain + ' ' + option : option);
        }
    };
    
    return (
        <>
            {loading ? (
                <Loading /> 
            ) : (
    <div className="w-full bg-black text-white h-fit sm:h-[100vh] ">
    <section id='sec1' className='flex flex-col gap-5 h-[100%]'>
                <div className='flex justify-center '><h1 className=' items-end'>HI {stdname}</h1></div>
        <div className='text-blue-400  h-fit w-full flex justify-center '>
            
            <TypeAnimation className="flex  justify-center font-mono font-medium text-1xl sm:text-2xl"
                sequence={[
                    'Welcome  to our community,',
                    1000,
                    `Welcome to our community,\nwe are happy to introduce our domains!!`,
                    1000,
                ]}
                speed={75}
                style={{  display: 'flex', whiteSpace: 'pre-line', textAlign: 'center' }}
                repeat={null}
                cursor={false}
            />
            
        </div>
        <div className="flex  justify-center  h-fit sm:items-center sm:h-[70%]">
            <div className="relative flex flex-col  items-center w-[80%] h-fit gap-10 sm:flex-row sm:items-start sm:h-full sm:justify-evenly ">
                
                <motion.button animate={{ x: 0 }} initial={{ x: -800 }}
                    onClick={() => trigger('M')}
                    className={
                        nextClicked
                            ? (management ? 'bg-gray-300 font-bold text-black text-xl h-fit w-full z-0 transform rotate-y-3 transition-all duration-500 rounded-xl sm:h-full' : 'z-[-200000] transition-all delay-100 absolute hidden')
                            : (management ? 'bg-green-300 font-bold text-black text-xl h-fit w-1/2 z-10 shadow-green-400 shadow-md transform rotate-y-6 transition-all duration-500 rounded-3xl  sm:h-[75%]' : 'bg-gray-300 font-bold text-black text-xl h-fit w-1/2 z-0 transform rotate-y-3 transition-all duration-500 rounded-xl sm:w-1/4 sm:h-[75%]')
                    }
                >
                    <h1 className={nextClicked ? '' : ''}>management</h1>
                    <Lottie animationData={MManagement} className={nextClicked ? 'h-[50%] ' : 'h-[70%]'} />
                    {nextClicked ? <div className=' h-1/2 overflow-x-hidden
                         relative  flex justify-center items-center ' >
                        <ul className='flex flex-col items-center gap-4 '>
                        <button 
                            onClick={() => handleOptionClick("management", 'management and finance')} 
                            className={`px-4 py-2 rounded-md shadow-md ${subDomain1.includes('management and finance') || subDomain2.includes('management and finance') ? 'bg-green-400 text-white shadow-lg' : 'bg-blue-400 text-white'}`}
                        >
                            management and finance
                        </button>

                        <button 
                            onClick={() => handleOptionClick("management", 'editorial and publicity')} 
                            className={`px-4 py-2 rounded-md shadow-md ${subDomain1.includes('editorial and publicity') || subDomain2.includes('editorial and publicity') ? 'bg-green-400 text-white shadow-lg' : 'bg-blue-400 text-white'}`}
                        >
                            editorial and publicity
                        </button>

                        </ul>
                    </div> : null}
                </motion.button>

                <motion.button 
                    animate={{ y: 0 }} 
                    initial={{ y: 1200 }}
                    onClick={() => trigger('T')}
                    className={
                        nextClicked
                            ? (technical ? 'bg-gray-300 font-bold text-black text-xl h-[75%] w-full z-0 transform rotate-y-3 transition-all duration-500 rounded-xl sm:h-full' : 'z-[-200000] transition-all delay-100 absolute hidden')
                            : (technical ? 'bg-green-300 font-bold text-black text-xl h-fit w-1/2 z-10 shadow-green-400 shadow-md transform rotate-y-6 transition-all duration-500 rounded-3xl  sm:h-[75%]' : 'bg-gray-300 font-bold text-black text-xl h-fit w-1/2 z-0 transform rotate-y-3 transition-all duration-500 rounded-xl sm:w-1/4 sm:h-[75%]')
                    }
                >
                    <h1 className={nextClicked ? '' : ''}>technical</h1>
                    <Lottie animationData={TTecnical} className={nextClicked ? 'h-[50%] ' : 'h-[70%]'} />
                    {nextClicked &&
                        <div className='h-1/2 overflow-x-hidden relative flex justify-center items-center'>
                            <ul className='flex flex-col items-center gap-4'>
                            <button 
                                onClick={() => handleOptionClick("technical", 'Web Dev')} 
                                className={`px-4 py-2 rounded-md shadow-md ${subDomain1.includes('Web Dev') || subDomain2.includes('Web Dev') ? 'bg-green-400 text-white shadow-lg' : 'bg-blue-400 text-white'}`}
                            >
                                Web Dev
                            </button>

                            <button 
                                onClick={() => handleOptionClick("technical", 'App Dev')} 
                                className={`px-4 py-2 rounded-md shadow-md ${subDomain1.includes('App Dev') || subDomain2.includes('App Dev') ? 'bg-green-400 text-white shadow-lg' : 'bg-blue-400 text-white'}`}
                            >
                                App Dev
                            </button>

                            <button 
                                onClick={() => handleOptionClick("technical", 'ai/ml')} 
                                className={`px-4 py-2 rounded-md shadow-md ${subDomain1.includes('ai/ml') || subDomain2.includes('ai/ml') ? 'bg-green-400 text-white shadow-lg' : 'bg-blue-400 text-white'}`}
                            >
                                ai/ml
                            </button>

                            <button 
                                onClick={() => handleOptionClick("technical", 'iot')} 
                                className={`px-4 py-2 rounded-md shadow-md ${subDomain1.includes('iot') || subDomain2.includes('iot') ? 'bg-green-400 text-white shadow-lg' : 'bg-blue-400 text-white'}`}
                            >
                                iot
                            </button>

                            <button 
                                onClick={() => handleOptionClick("technical", 'System Design')} 
                                className={`px-4 py-2 rounded-md shadow-md ${subDomain1.includes('System Design') || subDomain2.includes('System Design') ? 'bg-green-400 text-white shadow-lg' : 'bg-blue-400 text-white'}`}
                            >
                                System Design
                            </button>
                            </ul>
                        </div>
                    }
                </motion.button>

                <motion.button 
                    animate={{ x: 0 }} 
                    initial={{ x: 800 }}
                    onClick={() => trigger('D')}
                    className={
                        nextClicked
                            ? (design ? 'bg-gray-300 font-bold text-black text-xl h-[75%] w-full z-0 transform rotate-y-3 transition-all duration-500 rounded-xl sm:h-full' : 'z-[-200000] transition-all delay-100 absolute hidden')
                            : (design ? 'bg-green-300 font-bold text-black text-xl h-fit w-1/2 z-10 shadow-green-400 shadow-md transform rotate-y-6 transition-all duration-500 rounded-3xl sm:h-[75%]' : 'bg-gray-300 font-bold text-black text-xl h-fit w-1/2 z-0 transform rotate-y-3 transition-all duration-500 rounded-xl sm:w-1/4 sm:h-[75%]')
                    }
                >
                    <h1>design</h1>
                    <Lottie animationData={DDesign} className={nextClicked ? 'h-[50%]' : 'h-[70%]'} />
                    {nextClicked && 
                        <div className='h-1/2 overflow-x-hidden relative flex justify-center items-center'>
                            <ul className='flex flex-col items-center gap-4'>
                            <button 
                                onClick={() => handleOptionClick("design", 'Graphic')} 
                                className={`px-4 py-2 rounded-md shadow-md ${subDomain1.includes('Graphic') || subDomain2.includes('Graphic') ? 'bg-green-400 text-white shadow-lg' : 'bg-blue-400 text-white'}`}
                            >
                                Graphic Design
                            </button>

                            <button 
                                onClick={() => handleOptionClick("design", 'Video')} 
                                className={`px-4 py-2 rounded-md shadow-md ${subDomain1.includes('Video') || subDomain2.includes('Video') ? 'bg-green-400 text-white shadow-lg' : 'bg-blue-400 text-white'}`}
                            >
                                Video Editing
                            </button>

                            <button 
                                onClick={() => handleOptionClick("design", 'cad')} 
                                className={`px-4 py-2 rounded-md shadow-md ${subDomain1.includes('solid works') || subDomain2.includes('solid works') ? 'bg-green-400 text-white shadow-lg' : 'bg-blue-400 text-white'}`}
                            >
                                Technical Design-CAD
                            </button></ul>
                        </div>
                    }
                </motion.button>
                
            </div>
            
        </div>
        <div className='w-full h-[10%] flex flex-row justify-center items-center gap-5 pb-5 '>
                {!nextClicked && (
                    <button 
                        onClick={handleNext} 
                        disabled={!((management && (technical || design)) || (technical && (management || design)) || (design && (management || technical))) || selectionDisabled}
                        className={`px-6 py-3 rounded-md font-semibold ${((management && (technical || design)) || (technical && (management || design)) || (design && (management || technical))) && !selectionDisabled ? 'bg-green-400 text-white hover:bg-green-500' : 'bg-gray-300 text-gray-600 cursor-not-allowed'}`}
                    >
                        Next
                    </button>
                )}
                {nextClicked && subCon1 && subCon2 && (
                    <button onClick={submit}  
                        className="   bg-green-400 text-white px-6 py-3 rounded-md font-semibold ">
                        submit
                    </button>)
                }
                {nextClicked && (
                <button onClick={Reset}  
                    className="   bg-green-400 text-white px-6 py-3 rounded-md font-semibold ">
                    reset
                </button>)}
                {nextClicked && (
                <button onClick={back}   
                    className="   bg-green-400 text-white px-6 py-3 rounded-md font-semibold ">
                    go back
                </button>)}
            </div>
    </section>
</div>
    
    )}
    </>
        
    );
    
};

export default Selection; 