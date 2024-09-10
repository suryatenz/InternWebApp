import React, { forwardRef } from 'react';
import { RxCounterClockwiseClock } from "react-icons/rx";
import { ArrowRight } from 'lucide-react';
import { IoWalletOutline } from "react-icons/io5";
import { FiRefreshCcw } from "react-icons/fi";

const ProfileBar = forwardRef((props, ref) => {
    if (!props.isOpen) {
      return null;
    }
    return(
  <div style={{height: '88vh'}}  ref={ref} className="absolute right-2 top-full mt-2 w-80 rounded-sm shadow-lg p-4 z-10 overflow-y-auto bg-neutral-950 ">
    <div className='flex justify-between text-xl font-medium items-center '>
        <span>Hi, Madhav</span>
    <ArrowRight  className='cursor-pointer text-neutral-400' onClick={props.toggleProfile} />
    </div>
    <span className='text-neutral-400 text-xs'>Your Profile</span>
    <div className='flex flex-col bg-neutral-900 border border-neutral-800  p-4 mt-2 rounded'>
        <div className='flex items-center'>
    <RxCounterClockwiseClock className='text-orange-500 font-bold' />
        <span className='pl-2 text-sm font-medium'>
            History
        </span>

        </div>
        <div className='flex pt-4 gap-4 '>
            <div className='flex flex-col' >
                     <span className='text-xs text-neutral-500'>Previous Assets</span>
                     <span>16   </span>
            </div>
            <div className='flex flex-col' >
                     <span className='text-xs text-neutral-500'>Previously Live</span>
                     <span>06   </span>
            </div>
        </div>
        <div className='flex justify-end'>

            <span className='text-xs  text-blue-500 cursor-pointer'>View more</span>

        </div>

    </div>
        <div className="bg-neutral-900 border border-neutral-800 mt-2 p-3 rounded">    
                <div className='flex justify-between items-center  ' >
                    <div className='flex gap-1 items-center' >
                  <IoWalletOutline className='text-orange-500' size={20} />     
                  <span>Earnings</span>
                  </div>
                  <FiRefreshCcw size={12} className='text-orange-600 font-bold w-10 cursor-pointer' />
                </div>
                <div className='flex pt-4 justify-between pr-4'>
            <div className='flex flex-col' >
                     <span className='text-xs text-neutral-500'>UBC Wallet</span>
                     <span className='text-xl'> ₹21,320   </span>
            </div>
            <div className='flex flex-col pb-2' >
                     <span className='text-xs text-neutral-500'>Total Earnings</span>
                     <span className='text-xl'>₹85,320   </span>
            </div>
        </div>
      
             <span className='text-orange-500 text-xs font-medium  '>Catalog Earnings</span>
             <div className='flex  items-center justify-between  pb-2 m-2 border border-t-0 border-r-0 border-l-0 border-neutral-700'>
                <span className='text-neutral-400' style={{fontSize:"10px"}}> Washing Machine</span>
                <span className='text-xs'> ₹38,012/Month</span>
             </div>
             <div className='flex  items-center justify-between  pb-2 m-2 border border-t-0 border-r-0 border-l-0 border-neutral-700'>
                <span className='text-neutral-400' style={{fontSize:"10px"}}> Laptop</span>
                <span className='text-xs'> ₹12,000/Month</span>
             </div>
             <div className='flex  items-center justify-between  pb-2 m-2'>
                <span className='text-neutral-400' style={{fontSize:"10px"}}>Smart Watch</span>
                <span className='text-xs'> ₹22,005/Month</span>
             </div>

        </div>
  </div>
);
});
export default ProfileBar;