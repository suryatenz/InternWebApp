import React, { useState ,useEffect,useRef } from 'react';
import { FaSearch } from 'react-icons/fa';
import Card from './Card';
import { useSelector } from 'react-redux';
const Search = () => {
  const [data, setData] = useState('');
  const count = useSelector((state) => state.products.count);
  const searchRef = useRef();
  useEffect(()=>{
 searchRef.current.focus();
  },[])
  return (
    <div className="m-3">
    <div className='flex items-center max-w-3xl mx-auto border border-neutral-700 rounded-md mt-3 pl-3 mb-5'>
      <FaSearch className="text-white mr-2" />
        <input
          ref={searchRef}
          type="text"
          value={data}
          placeholder="Search only by Brand or Model Name"
          className="flex w-full h-10 rounded-md placeholder-neutral-400 outline-none bg-transparent flex-1 font-normal text-sm  mx-auto flex-grow py-3"
          onChange={(e) => setData(e.target.value)}
          style={{ minWidth: '0px'}}
        />
        <div className="">
          <p className=' text-[#979797] pr-3' >{count < 10 ? `0${count}` : count} Results</p>
        </div>
      </div>
        {data && <Card title={data} />}  
      </div> 
  )
};

export default Search;