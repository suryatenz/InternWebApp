import "../index.css";
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
const SignupLastpage = () => {
  const signup=useSelector(state=>state.signup)
  const navigate = useNavigate()

  const handle =()=>{
    navigate('/')
  } 
  console.log(signup);
  return (
    <>
    <div className=" bg-neutral-900 h-screen w-screen">
        <div className="text-white text-4xl pl-8 pt-5">
          <p className='mb-2'>Join a thriving</p>
          <p>community of Engineers</p>
          <p className=' text-sm mt-1 ml-1'>with UnBoxing Community</p>
        </div>
        <div className=" flex flex-col items-center justify-center pt-3">
          <div className="">
          <img src='./logo.svg' className='w-52 cursor-pointer ml-8' />
          </div>
          <div className="">
          <hr className="custom-hr flex w-96 mt-5 mb-3 ml-8" />
          </div>
          <div className=" text-white text-3xl mt-5 ml-12">
            <p className=' pb-2 ml-28'>Hang tight!! We are validating your account</p>
            <p className=' text-xl ml-16 mt-2 mb-2'>Your account creation is successful. To ensure the security and integrity of our</p>
            <p className=' text-xl ml-16 mb-2'>community, the new account requires an approval from our admin team. This</p>
            <p className='text-xl ml-16'> process typically takes 1-2 business days. You will receive an email notification </p>
            <p className=' text-xl text-center ml-6 mt-2'> once your account is ready to go. We appreciate your understanding.</p>
          </div>
          <div className=" text-white mt-6 ml-14 text-lg pt-3">
            <p>if you have any queries feel free to reach our support team at</p>
            <p className=' text-center text-lg text-orange-500 mt-2'>support@unboxingcommunity.com</p>
          </div>
          <div className="">
            <button className=' mt-5 bg-orange-500 px-3 py-1.5 text-white rounded-xl ml-16' onClick={handle} >Close</button>
          </div>
        </div>
    </div>
    </>
  )
}

export default SignupLastpage
