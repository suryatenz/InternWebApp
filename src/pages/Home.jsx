import React from 'react'
import SearchBar from '../components/SearchBar';

export default function Home() {
  return ( 
      <>
       <div className='flex flex-col  items-center justify-center pt-1 mt-1'>
         <img src='./logo.svg' className='w-52 mx-auto cursor-pointer' />
        <div className='mt-2'>
         <h1 className='font-semibold text-4xl mb-2'>Suggest & Review a Product </h1>
         <span className='flex items-center justify-center mx-auto text-md mb-1'>Any Electirc & Electronics Products</span>
         </div>
         </div> 
         <div className=''>
          <SearchBar />
          </div>
          
       </>  
  );
}