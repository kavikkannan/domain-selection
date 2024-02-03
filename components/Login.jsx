/* const Signin = async () => {
  try {

    setLoading(true);

    const log = await fetch(`https://go-jwt-kkk.onrender.com/api/login`, {
      method: "POST",
      mode:"cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
      credentials: 'include',
    })
    if (log.ok){
      const response = await log.json();
      if(response.message=='success'){
          router.push('/ticket_main');       
      }
      else{
        alert(response.message)
      }
    } else {
      
      const errorData = await response.json();
      console.error('Login failed:', errorData.message);
    }

    
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
  
};   
const signup = async () => {
  try {

    setLoading(true);
    
    const response = await fetch(`https://go-jwt-kkk.onrender.com/api/register`, {
      method: "POST",
      mode:"cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      })
    });

    if (response.ok) {
      console.log("success");
      router.push("/signin");
    } else {
      alert('not success');
    }
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};  
 */
'use client'
import {useRouter} from "next/navigation"
import Link from "next/link"
import React, { useState,useEffect } from "react"; 
import Loading from '@/components/Loading';
import Lottie from 'lottie-react';
import robo from '@/assests/robo_anime1.json';
import bubble from '@/assests/roamingbubles_anime.json';
import {motion,transform,useAnimation} from "framer-motion";
import { Transition } from "react-spring";
import { auth } from "@/firebaseConfig";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth'


export default function Login() {
  const [loading, setLoading] = useState(false);
  const [login, setLogin] = useState(true);
  const router=useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const controls = useAnimation();
  const [username, setUsername] = useState('');
  
  
  const flipAnimation = async () => {
    await controls.start({
      x: login ? 0 : 0, 
      scaleX: login ? 1 : -1,
      originX: login ? 0 : 1, 
    });
    await controls.start({
      x: login ? 0 : 0,
      scaleX: login ? 1 : -1,
      originX: login ? 0 : 1,
    });
  };

  useEffect(() => {
    flipAnimation();
  }, [login]);

  
  const Signin = () => {
    signInWithEmailAndPassword(auth, email, password)
        .then((response) => {
            console.log(response.user)
            sessionStorage.setItem('Token1', response.user.accessToken);
            sessionStorage.setItem('user.email', user.email);
            sessionStorage.setItem('user.uid', user.uid);
            router.push('/Domain_Selection')
        })
        .catch((err) => {
            alert('Cannot Log in')
            console.error(err);
        })
}
    const signup = () => {
       createUserWithEmailAndPassword(auth, email, password)
                .then((response) => {
                console.log(response.user)
                sessionStorage.setItem('Token', response.user.accessToken);
                router.push('/login');
                alert("success");
            })
    }

    useEffect(() => {
        let token = sessionStorage.getItem('Token')
        if(token){
            router.push('/login')
        }
    }, [])

    return (
      <>
      {loading ? (
          <div className="relative">
          {loading && <Loading />} 
        </div>
      ) : (
      
        <div className="absolute h-screen w-full  bg-[rgb(20,28,38)]   flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 overflow-hidden">

        
<motion.div
      animate={controls}
      transition={{ type: 'spring', stiffness: 50, damping: 15 }}
      className="absolute w-1/2 left-0"
    >
      <Lottie animationData={robo} />
    </motion.div>
          
          
          {/* <motion.div
          animate={{rotate:-90}} initial={{rotate:0}}
          className="absolute ">
            <img className="rotate-90" src="/images/login_bg1_D.jpg" alt="" />
          </motion.div> 
          <div className="absolute right-0 ">
            <img className=" -rotate-90" src="/images/login_bg1_R.jpg" alt="" />
          </div>*/}

                  {/* <div className=" absolute  top-10 flex justify-evenly items-center text-orange-200 sm:mx-auto sm:w-80 sm:max-w-sm">
                  <Link href="/"><img
                      className=" text-blue-200 mx-auto h-10 w-auto"
                      src="/images/isa_logo_D.jpg"
                      alt="ISA"
                    />
                    </Link>
                    <span className="bg-[rgb(20,28,38)] left-48  ">International Socviety of automation</span>
                  </div> */}
          <>
          {login ? (
            <motion.div 
            animate={{x:500}}
            transition={{type:"spring",duration:0.8}}
            >
                
                  <div className=" relative bottom-20 sm:mx-auto sm:w-full sm:max-w-sm">
                    
                    <h2 className=" mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-blue-200">
                      Sign in  account
                    </h2>
                  </div>
          
                  <div className="relative bottom-10 mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" action="#" method="POST">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-blue-200">
                          Email address
                        </label>
                        <div className="mt-2">
                          <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                            className="block w-full rounded-md p-2 border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-blue-200 placeholder:text-green-200 focus:ring-2 focus:ring-inset focus:ring-green-200 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
          
                      <div>
                        <div className="flex items-center justify-between">
                          <label htmlFor="password" className="block text-sm font-medium leading-6 text-blue-200">
                            Password
                          </label>
                          <div className="text-sm">
                            <a href="#" className="font-semibold text-blue-200 hover:text-blue-500">
                              Forgot password?
                            </a>
                          </div>
                        </div>
                        <div className="mt-2">
                          <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                            className="block w-full rounded-md p-2 border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-blue-300 placeholder:text-blue-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
          
                      
                    </form>
                    <br/>
                    <div>
                        <button
                          type="submit"
                          className="flex w-full justify-center rounded-md bg-blue-200 px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                          onClick={Signin}
                        >
                           sign in
                        </button>
                      </div>
                    
                    <p className="mt-10 text-center text-sm text-blue-500">
                      wanna create acc?{' '}
                      <button  className="font-semibold leading-6 text-blue-200 hover:text-blue-500" onClick={()=>{setLogin(!login)}}>
                        Sign Up
                      </button>
                    </p>
                  </div>
                  </motion.div>
          ) : (


            <motion.div 
            animate={{x:-500}}
            transition={{type:"spring",duration:0.8}}
            >
  
          <div className=" relative bottom-20 sm:mx-auto sm:w-full sm:max-w-sm">
            
            <h2 className=" mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-blue-200">
              Register your account
            </h2>
          </div>
  
          <div className="relative bottom-10 mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action="#" method="POST">
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-blue-200">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 p-2 text-black shadow-sm ring-1 ring-inset ring-blue-300 placeholder:text-blue-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-blue-200">
                  Username
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    name="name "
                    type="text"
                    autoComplete="name"
                    required
                    onChange={(e) => setUsername(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 p-2 text-black shadow-sm ring-1 ring-inset ring-blue-300 placeholder:text-green-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-blue-200">
                    Password
                  </label>
                  
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 p-2 text-black shadow-sm ring-1 ring-inset ring-blue-300 placeholder:text-blue-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>  
</div>
              
            </form>
            <br/>
            <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-blue-200 px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                  onClick={signup}
                >
                   Register
                </button>
              </div>
  
            <p className="mt-10 text-center text-sm text-blue-500">
              Already have a account?{' '}
              <button  className="font-semibold leading-6 text-blue-200 hover:text-blue-500" onClick={()=>{setLogin(!login)}}>
                Sign In
              </button>
            </p>
          </div>
        </motion.div>
        
          )}
          </>
        </div>
        
        
        )}
        </>
    );
      };
