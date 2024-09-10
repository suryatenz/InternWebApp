import "../index.css";
import react from 'react';
import { useNavigate } from "react-router";
export default  function RestComplete() {
  const navigate = useNavigate()

  const handleClick =()=>{
    navigate('/')
  } 
  return (
    <div className="bg-neutral-900 h-screen w-screen">
    <div className=" pt-20  flex justify-center">
        
      <img src='./logo.svg' className='w-52 cursor-pointer ' />
      
    </div>
         <div className="flex  flex-col justify-center  h-3/6 items-center gap-14">
            <span className="text-white text-3xl font-semibold">Password Reset!</span> 
            <span className="text-white text-lg font-medium">Your password has been reset successfully.</span>
            <div className="flex ">
              <span className="text-white text-base ">
                 You can now  <span className="underline text-orange-500 cursor-pointer" onClick={handleClick}> Login </span> with your new password.
                </span>
                
       
            </div> 
         </div>
    </div>
  )
}

