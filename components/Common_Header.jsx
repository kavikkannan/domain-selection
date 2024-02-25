
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/navigation';
const Commonheader = () => {
  const router=useRouter();
  const home = () => {
    router.push("/");
  }

  return (
    <header className="relative  w-full bg-white text-blue-800 p-4 flex items-center justify-between">
      <div className="flex items-center">
        <img src="/images/isa_logo.jpg" alt="Logo" className="h-12 w-12 mr-2 cursor-pointer" onClick={home} />
      </div>
      <div className="text-lg font-extrabold">International Society of Automation</div>
      <div>
      <div className="flex items-center">
        <img src="/images/vitlogomain.jpeg" alt="Logo" className="h-14 w-11 mr-2" />
      </div>
      </div>
    </header>
  );
};

export default Commonheader;
