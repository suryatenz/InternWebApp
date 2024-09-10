import React, { createContext, useState ,useContext} from 'react'
import {ChevronLeft, ChevronRight, CircleHelp, Clipboard, Ellipsis, Gem, LayoutDashboard, LogOut, Mail, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
// import logo from './logo.svg'; 
// import logo1 from './logo1.svg';  

const SidebarContext=createContext()
export default function Navbar({children}) {
  const [expand,setExpand]=useState(true);
  const navigate=useNavigate();
  const handleLogout=()=>{
        navigate("/")
  }
  return (
    <SidebarContext.Provider value={{expand}}>

      <div className={`h-full flex flex-col  text-white ${expand ? "" : "justify-center items-center" } border-r border-neutral-800 shadow-sm`} >
          <Link to="/">          <div className='pb-2  flex  items-center pt-3 '>
        <img  src={`/logo${expand?"":"1"}.svg`} 
      alt='Logo' 
      className={`overflow-hidden transition-all  ${expand ?"w-40": "w-10 pt-1.5 " }`}
    />   
      </div>
          </Link>
           <ul className='flex flex-col pt-3  '>
              {children}
          </ul>
         <div className='mt-auto'>
          <div className='flex'>
         <button className={`hover:text-orange-500 ${expand || "flex items-center py-2 px-2 my-1"}`} onClick={()=>setExpand(!expand)} >
          {expand ? <ChevronLeft  size={30}/> : <ChevronRight  size={30}/>}
          </button>{expand &&<div onClick={handleLogout} ><SideBarItem  icon={<LogOut size={20} />} text="Logout" /></div>}
          </div>
         <SideBarItem icon={<Ellipsis size={20} />} text="Give feedback"  />
         {expand && <SideBarItem icon={<Ellipsis size={20} />} text="Refer an engineer"  />}
         </div>
        
      </div>
      </SidebarContext.Provider>
  )
}
export function SideBarItem({icon,text}){
  const {expand}=useContext(SidebarContext)
  const [isEarningsClicked, setEarningsClicked] = useState(false);
  const [isAffiliatedProgramsClicked, setAffiliatedProgramsClicked] = useState(false);
  const handleItemClick = () => {
    if (text === 'Earnings') {
      setEarningsClicked(!isEarningsClicked);
    }else if (text === 'Affiliated Programs') {
      setAffiliatedProgramsClicked(!isAffiliatedProgramsClicked);
    }
  };
  return (
    <>
    <li className='relative flex items-center py-2 px-3 my-1 text-sm rounded-md cursor-pointer hover:text-orange-500' onClick={handleItemClick}>
    {icon}
    <span className={`overflow-hidden transition-all ${expand ? "w-32 ml-3" :"w-0"}`}>{text}</span>
    </li>
    {isEarningsClicked && text === 'Earnings' && expand && (
  <ul className='flex flex-col items-start mx-auto font-normal  group-hover: cursor-pointer gap-2' style={{fontSize:"12px", listStyleType: 'disc', paddingLeft: '20px'}}>
    <li className='text-center hover:text-orange-500'>Commision Share</li>
    <li className='text-center hover:text-orange-500'>Affiliation Share</li>
    <li className='text-center hover:text-orange-500'>Transfers</li>
  </ul>
)}
{isAffiliatedProgramsClicked && text === 'Affiliated Programs' && expand && (
  <ul className='flex flex-col items-start  mx-auto font-normal group-hover: cursor-pointer gap-2' style={{fontSize:"12px", listStyleType: 'disc', paddingLeft: '20px'}}>
    <li className='text-center hover:text-orange-500'>Share Links</li>
    <li className='text-center hover:text-orange-500'>Product Shared</li>
  </ul>
)}
  </>
);
}