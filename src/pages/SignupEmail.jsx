import { useState, useRef, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from "react-redux";
import { updateUserId, updateVerification } from "../redux/productSlice";
import CircularProgress from '@mui/material/CircularProgress';
import { setUserId } from "../redux/signupSlice.js";
export default function SignupEmail() {
  const [emailError, setEmailError] = useState('');
  const emailRef = useRef();
  const [buttonState, setButtonState] = useState('Send Code');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const [formData, setFormData] = useState("")
  const dispatch = useDispatch();
  const handleBack = () => {
    navigate('/')
  }
  const hansleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const email = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email.');
      setLoading(false);
      return;
    }
    try {
      const payload = {
        "email": formData,
        "userType": "ENGINEER"
      };
      const response = await axios.post('http://13.201.75.142:8080/user/api/v1/signup', payload, {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate'
        }
      });
      setLoading(false);
      console.log(payload);
      console.log(response.data);
      const user = response.data.result.userDetails.userId;
      const veri = response.data.result.userDetails.verifications[0].verificationId;
      const pass = response.data.result.userDetails.passwordSet
      dispatch(updateUserId(user));
      dispatch(updateVerification(veri))
      dispatch(setUserId(user));
      if(response.data.result.userDetails.profile){
        setTimeout(() => {
          navigate('/signuplast')
        }, 1000);
        setButtonState('Success');
      }
      else if (response.data.result.userDetails.verifications[0].verified && !pass) {
        setButtonState('Success');
        setTimeout(() => {
          navigate("/signupValidate/verifyOtp/verifyPassword")
        }, 1000);
       
      }
      else if (pass) {
        setButtonState('Success');
        setTimeout(() => {
          navigate("/signup")
        }, 1000);
       
      }
      else {
        console.log(response.data);
        setButtonState('Success');
        setTimeout(() => {
          navigate('verifyOtp');
        }, 1000);
       
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setButtonState('Failed')
      setEmailError(error.message)
      setTimeout(() => {
        setButtonState('Send Code');
       
      }, 4000);
    
    }
  }
  useEffect(() => {
    emailRef.current.focus()
  }, [])
  const handleEmailChange = (e) => {
    setLoading(false);
    
    setFormData(e.target.value);
    setEmailError('');
    
  };


  return (
    <div className='flex flex-col ml-28 pl-5 pt-9 gap-3'>
      <div className='flex flex-col  gap-2 '>
        <span className='text-orange-400 font-semibold text-2xl mx-auto shadow-md mb-3'>Email Validation </span>
        <div className='flex flex-col justify-center mx-auto'>
          <span className='text-base text-neutral-600 '>We will sent you a verification code to your registered email address</span>
        </div>
      </div>
      <hr className="custom-hr flex w-3/6 mt-2 mx-auto " />
      <div className='flex justify-center items-center mt-3 max-w-screen max-h-screen'>
        <form onSubmit={hansleSubmit} className='flex flex-col gap-6 w-1/3 mx-auto'>
          <div className='flex flex-col gap-2'>
            <label htmlFor="email" className='text-white ml-1 text-sm'>Email</label>
            <input ref={emailRef} type="email" id="email" name="email" value={formData} placeholder="Enter your registered email" onChange={handleEmailChange} className={`bg-neutral-900 p-2 pl-3 border ${emailError ? 'border-red-500' : 'border-neutral-600'} rounded-lg text-white  placeholder-neutral-600 placeholder:text-sm font-normal shadow-sm`} required />
            {emailError && <div className="text-red-500 text-sm">{emailError}</div>}
          </div>
          <div className='flex flex-col items-center justify-center gap-3 mt-2'>
            <button
              onClick={hansleSubmit}
              type="submit"
              className={`${buttonState === 'Failed' ? 'bg-[#FF0000]' : buttonState === 'Success' ? 'bg-[#038E00]' : 'bg-orange-500'} text-neutral-300 font-semibold py-2 px-6 w-48 rounded-lg hover:opacity-75 flex items-center justify-center`}
              disabled={loading ? true : false}
            >
             {loading ? <CircularProgress  size={23} color="inherit" /> : buttonState}  
            </button>
            <span className='text-orange-600 font-semibold text-sm mt-1 cursor-pointer hover:opacity-80' onClick={handleBack} >Get back to Login page</span>
          </div>
        </form>
      </div>
    </div>
  )
}
