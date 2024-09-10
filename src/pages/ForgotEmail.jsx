import { useState, useRef, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateUserId ,updateVerification} from "../redux/productSlice";
import CircularProgress from '@mui/material/CircularProgress';
export default function ForgotEmail() {
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [buttonState, setButtonState] = useState('Send Code');
  const [emailError, setEmailError] = useState('');
  const [formData, setFormData] = useState('')
  const handleChange = (e) => {
    setLoading(false);
    setFormData( e.target.value);
    setEmailError('')
  }
  const handleBack = () => {
    navigate('/')
  }
  const hansleSubmit =async (e) => {
    e.preventDefault();
    const email = formData
    setLoading(true);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email.');
      setLoading(false);
      return;
    }
    const payload = {
       email: formData
    }
    try {
        const response = await axios.post('http://13.201.75.142:8080/user/api/v1/check-user-exists', payload,{  
          headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate'
        }
    });
        
        const data= await response.data
        console.log(response.data);
          const user = data.result.userDetails.userId;
          const passwordSet=data.result.userDetails.passwordSet
          dispatch(updateUserId(user));
          if (passwordSet &&user && data.result.isPresent) {
                  const res= await axios.post('http://13.201.75.142:8080/user/api/v1/send-otp',{
                    userId:user,
                    "purpose": "PASSWORD_RESET_OTP",
                    "channel": "EMAIL"
                  },{  
                    headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-cache, no-store, must-revalidate'

                  }}) 

                  var userDetails= await res.data
                  if(userDetails.success){
                     setLoading(false);
                     const verificationId=userDetails.result.verificationId
                     dispatch(updateVerification(verificationId))
                     setButtonState('Success');
                     setTimeout(() => {
                      navigate('/forgotpassword/verifyotp')
                    }, 1000);
                    
                  }else{
                    setEmailError(userDetails.errorMessages.errorMessage || 'Error sending OTP');
                    setLoading(false);
                    setButtonState('Failed')
                    setTimeout(() => {
                      setButtonState('Send Code');
                      
                    }, 4000);
                  }
                }
        else{
           setEmailError('User not found')
           setLoading(false);
           setButtonState('Failed')
           setTimeout(() => {
             setButtonState('Send Code');
             
           }, 4000);
        }
          } catch (error) {
          setEmailError(error.message||'INTERNAL SERVER ERROR');
          setLoading(false);
          setButtonState('Failed')
          setTimeout(() => {
            setButtonState('Send Code');
            
          }, 4000);
           console.error(error);
        }
  }
  useEffect(() => {
    emailRef.current.focus()
  }, [])

  return (
    <div className='flex flex-col ml-28 pl-5 pt-5 gap-3'>
      <div className='flex flex-col  gap-2 '>
        <span className='text-orange-400 font-semibold text-2xl mx-auto shadow-md mb-3'>Email Verification</span>
        <div className='flex flex-col justify-center mx-auto'>
          <span className='text-base text-neutral-600 '>We will sent you a verification code to your registered email address</span>
        </div>
      </div>
      <hr className="custom-hr flex w-3/6 mt-2 mx-auto " />
      <div className='flex justify-center items-center mt-3 max-w-screen max-h-screen'>
        <form onSubmit={hansleSubmit} className='flex flex-col gap-6 w-1/3 mx-auto'>
          <div className='flex flex-col gap-2'>
            <label htmlFor="email" className='text-white text-sm'>Email</label>
            <input ref={emailRef} type="email" id="email" name="email" placeholder="Enteryour registered email" value={formData} onChange={handleChange} className={`bg-neutral-900 p-2 pl-3 border ${emailError ? 'border-red-500' : 'border-neutral-600'} rounded-lg text-white  placeholder-neutral-600 placeholder:text-sm font-normal shadow-sm`} required />
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
            <span className='text-orange-600 font-semibold text-sm cursor-pointer hover:opacity-80' onClick={handleBack} >Get back to Login page</span>
          </div>
        </form>
      </div>
    </div>
  )
}
