import React from 'react'

const Conformation = () => {
    return (
        <div className='bg-neutral-800 h-screen w-screen flex justify-center'>
            <div className=' flex flex-col mt-32'>
                <div className="">
                    <img src='./logo.svg' className='w-52 ml-32' />
                </div>   
                <div className="">
                
                </div> 
                <div className="mb-3">
                <p className='text-white text-4xl text-center ml-9 mt-16'>Password Reset!</p>
                </div>
                <div className="mb-3">
                    <p className=' text-white text-xl pl-12 mt-3'>Your password has been successfully reset.</p>
                </div>
                <div className=" text-white text-center text-sm ml-7 pl-5 mt-10">You can now <a href="/" className=' text-orange-500 underline'>Login</a> with your new password</div>
            </div>
        </div>
    )
}

export default Conformation
