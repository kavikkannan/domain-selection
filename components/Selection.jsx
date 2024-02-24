'use client';

import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import Link from 'next/link';
import MManagement from '@/assests/management.json';
import TTecnical from '@/assests/technical_anime.json';
import DDesign from '@/assests/desing_anime.json';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { ref, set } from 'firebase/database';
import { db } from '@/firebaseConfig';
import { useRouter } from 'next/navigation';
import userData from '@/assests/rereg_std_fata.json';

const Selection = () => {
    const router=useRouter();
    const [management, setManagement] = useState(false);
    const [technical, setTechnical] = useState(false);
    const [W, setW] = useState(true);
    const [design, setDesign] = useState(false);
    const [nextClicked, setNextClicked] = useState(false);
    const [selectionDisabled, setSelectionDisabled] = useState(false); // State to track selection disabled status
    const [regno, setRegno] = useState("");
    const [stdname, setStdName] = useState("");
    const [email, setEmail1] = useState("");
    const [email1, setEmail2] = useState("");
    useEffect(() => {
    const e = sessionStorage.getItem("email");
   
    setEmail2(e);
    
    // Check if userData is available before accessing it
    if (userData && userData.users) {
        const userDataWithEmail = userData.users.find(user => user.EmailId === e);
        if (userDataWithEmail) {
            const registerNumber = userDataWithEmail.RegisterNumber;
            const studentName = userDataWithEmail.StudentName;
            
            
            const ff = studentName+"9999"+registerNumber;
            setEmail1(ff); // Store register number in state
            
        } else {
            console.log("Register number not found for the provided email.");
        }
    } else {
        console.log("userData is undefined or does not contain the expected structure.");
    }
}, []);

/* if(email1){ const userDataWithEmail = userData.users.find(user => user.EmailId === email1);
const studentName = userDataWithEmail.StudentName; setStdName(studentName); return stdname
} else{console.log("sdsaf");} */
    
    const [domain1, setDomain1] = useState("");
    const [domain2, setDomain2] = useState("");
    const [subDomain1, setSubDomain1] = useState("");
    const [subDomain2, setSubDomain2] = useState("");
    
 


  const submit = () => {
    
    const userRef = ref(db, 'UserNew/' + email+'/'+domain1);
    

    const domainRef = ref(db, `UserNew/${email}/${domain1}`);
    set(domainRef, {
      Subdomain1: subDomain1,
    }).then(() => {

    }).catch((error) => {
      console.error("Error saving data:", error);
    });
  
      const domainRef2 = ref(db, `UserNew/${email}/${domain2}`);
      set(domainRef2, {
        Subdomain2: subDomain2,
      }).then(() => {
  
      }).catch((error) => {
        console.error("Error saving data:", error);
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

        // Concatenate the selected domain options into a string
        selectedSubDomain = selectedSubDomain ? selectedSubDomain + ', ' + category : category;

        // Update the state of subDomain1 or subDomain2 based on category
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
        // Handle next button click, navigate or perform any other action
       
    };
    const handleNameSubmit = () => {
        setW(true);

    };
    const Reset = () => {
        setSubDomain1("");
        setSubDomain2("");
        setCon1(false);
        setCon2(false);
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
    
    
  /*   return (
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
                                ? (management ? 'bg-gray-300 font-bold text-black text-xl h-[50%] w-full z-0 transform rotate-y-3 transition-all duration-500 rounded-xl' : 'z-[-200000] transition-all delay-100 absolute hidden')
                                : (management ? 'bg-green-300 font-bold text-black text-xl h-[25%] w-1/2 z-10 shadow-stone-950 shadow-2xl transform rotate-y-6 transition-all duration-500 rounded-3xl' : 'bg-gray-300 font-bold text-black text-xl h-[25%] w-1/2 z-0 transform rotate-y-3 transition-all duration-500 rounded-xl')
                        }
                    >
                         <h1 className={nextClicked?'':''}>management</h1>
                           <Lottie animationData={MManagement}className={nextClicked?'h-[30%] ':''} />
                           {nextClicked? <div className=' h-1/2 overflow-x-hidden 
                             relative  flex justify-center items-center  ' >
                            <ul className='flex flex-col items-center gap-4 '>
                                <b className="bg-green-400 text-white px-4 py-2 rounded-md shadow-md">management and finance</b>                       
                                <b className="bg-green-400 text-white px-4 py-2 rounded-md shadow-md">editorial and publicity</b>                       

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
                            <ul className='flex flex-col items-center gap-4 '>
                                <b  className="bg-green-400 text-white px-4 py-2 rounded-md shadow-md">Web Dev</b>
                                <b  className="bg-green-400 text-white px-4 py-2 rounded-md shadow-md">App Dev</b>
                                <b  className="bg-green-400 text-white px-4 py-2 rounded-md shadow-md">ai/ml</b>
                                <b  className="bg-green-400 text-white px-4 py-2 rounded-md shadow-md">iot</b>                        
                                <b  className="bg-green-400 text-white px-4 py-2 rounded-md shadow-md">System Design</b>                        

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
                            <ul className='flex flex-col items-center gap-4 '>
                                <b  className="bg-green-400 text-white px-4 py-2 rounded-md shadow-md">Graphic</b>
                                <b  className="bg-green-400 text-white px-4 py-2 rounded-md shadow-md">Video</b>
                                <b  className="bg-green-400 text-white px-4 py-2 rounded-md shadow-md">solid works</b>
                            </ul>
                            </div>: null}
                        </motion.button>
                    </div>
                    <div className='w-full flex justify-center items-center '>
                    {!nextClicked &&(
                        <button onClick={handleNext}   disabled={selectionDisabled} // Disable the button when selection is disabled
                        className="   bg-green-400 text-white px-5 py-5 rounded-md ">
                        Next
                        </button>)
                    }
                   {!nextClicked &&(
                        <button onClick={submit}   // Disable the button when selection is disabled
                        className="   bg-green-400 text-white px-5 py-5 rounded-md ">
                        submit
                        </button>)
                    }
                    <button onClick={Check}   // Disable the button when selection is disabled
                        className="   bg-green-400 text-white px-5 py-5 rounded-md ">
                        check
                        </button>
                </div>
                </div>
                
            </section>

        </div>
    ); */
    return (<>{W? (
    <div className="w-full bg-white text-white h-[100vh] sm:h-[100vh] ">
    <section id='sec1' className='flex flex-col gap-5 h-[100%]'>
        <div className='text-blue-400  h-[10%]'>
            <TypeAnimation className="flex justify-center font-mono font-medium text-2xl"
                sequence={[
                    `hi ${stdname},`,
                    1000,
                ]}
                speed={75}
                style={{ fontSize: '2em', display: 'flex', whiteSpace: 'pre-line', textAlign: 'center' }}
                repeat={null}
                cursor={false}
            />

            <TypeAnimation className="flex  justify-center font-mono font-medium text-2xl"
                sequence={[
                    'Welcome  to our community,',
                    1000,
                    `Welcome to our community,\nwe are happy to introduce our domains!!`,
                    1000,
                ]}
                speed={75}
                style={{ fontSize: '2em', display: 'flex', whiteSpace: 'pre-line', textAlign: 'center' }}
                repeat={null}
                cursor={false}
            />
        </div>
        <div className="flex  justify-center bg-red-300 h-fit sm:items-center sm:h-[70%]">
            <div className="relative flex flex-col bg-green-100 items-center w-[80%] h-fit gap-10 sm:flex-row sm:items-start sm:h-full sm:justify-evenly ">
                
                <motion.button animate={{ x: 0 }} initial={{ x: -800 }}
                    onClick={() => trigger('M')}
                    className={
                        nextClicked
                            ? (management ? 'bg-gray-300 font-bold text-black text-xl h-fit w-full z-0 transform rotate-y-3 transition-all duration-500 rounded-xl sm:h-full' : 'z-[-200000] transition-all delay-100 absolute hidden')
                            : (management ? 'bg-green-300 font-bold text-black text-xl h-fit w-1/2 z-10 shadow-stone-950 shadow-2xl transform rotate-y-6 transition-all duration-500 rounded-3xl  sm:h-[75%]' : 'bg-gray-300 font-bold text-black text-xl h-fit w-1/2 z-0 transform rotate-y-3 transition-all duration-500 rounded-xl sm:w-1/4 sm:h-[75%]')
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
                            : (technical ? 'bg-green-300 font-bold text-black text-xl h-fit w-1/2 z-10 shadow-stone-950 shadow-2xl transform rotate-y-6 transition-all duration-500 rounded-3xl  sm:h-[75%]' : 'bg-gray-300 font-bold text-black text-xl h-fit w-1/2 z-0 transform rotate-y-3 transition-all duration-500 rounded-xl sm:w-1/4 sm:h-[75%]')
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
                            : (design ? 'bg-green-300 font-bold text-black text-xl h-fit w-1/2 z-10 shadow-stone-950 shadow-2xl transform rotate-y-6 transition-all duration-500 rounded-3xl sm:h-[75%]' : 'bg-gray-300 font-bold text-black text-xl h-fit w-1/2 z-0 transform rotate-y-3 transition-all duration-500 rounded-xl sm:w-1/4 sm:h-[75%]')
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
                                Graphic
                            </button>

                            <button 
                                onClick={() => handleOptionClick("design", 'Video')} 
                                className={`px-4 py-2 rounded-md shadow-md ${subDomain1.includes('Video') || subDomain2.includes('Video') ? 'bg-green-400 text-white shadow-lg' : 'bg-blue-400 text-white'}`}
                            >
                                Video
                            </button>

                            <button 
                                onClick={() => handleOptionClick("design", 'solid works')} 
                                className={`px-4 py-2 rounded-md shadow-md ${subDomain1.includes('solid works') || subDomain2.includes('solid works') ? 'bg-green-400 text-white shadow-lg' : 'bg-blue-400 text-white'}`}
                            >
                                Solid Works
                            </button></ul>
                        </div>
                    }
                </motion.button>
                
            </div>
            
        </div>
        <div className='w-full h-[10%] flex flex-row justify-center items-center gap-5 pb-5 '>
                {!nextClicked && (
                    <button onClick={handleNext} disabled={selectionDisabled} // Disable the button when selection is disabled
                        className="   bg-green-400 text-white px-5 py-5 rounded-md ">
                        Next
                    </button>)
                }
                {nextClicked && subCon1 && subCon2 && (
                    <button onClick={submit}   // Disable the button when selection is disabled
                        className="   bg-green-400 text-white px-5 py-5 rounded-md ">
                        submit
                    </button>)
                }
                {nextClicked && (
                <button onClick={Reset}   // Disable the button when selection is disabled
                    className="   bg-green-400 text-white px-5 py-5 rounded-md ">
                    reset
                </button>)}
            </div>
    </section>
</div>):(<div className="flex bg-white flex-col items-center justify-center h-screen text-black">
    <h1 className="text-3xl  font-bold mb-4">Welcome! Please enter your name:</h1>
    <input
        type="text"
        value={email}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Your Name"
        className="border border-gray-400 rounded-md px-3 py-2 mb-4"
    />
    {subCon1 && subCon2 (<button
        onClick={handleNameSubmit}
        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
    >
        Submit
    </button>)}
</div>)

    }

    </>
        
    );
    
};

export default Selection; 