import  { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
export default function SignupOtp() {
  const navigate = useNavigate();
  const[error, setError] = useState('');  
  const [loading, setLoading] = useState(false);
  const [buttonState, setButtonState] = useState('Verify and Proceed');
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [timer, setTimer] = useState(180); 
  const [canResend, setCanResend] = useState(false);
  const inputRef = useRef([]);
  const userId = useSelector((state) => state.products.userId);
  const verificationId = useSelector((state) => state.products.verificationId);
  
  const handleBack = () => {
    navigate("/");
    setError('')
  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const combinedOtp = otp.join("");
      
      if (combinedOtp.length < 6) {
        setError('Please enter a valid OTP')
        setLoading(false);
        
         return;
      }
      // const payload = {
      //   purpose: "SIGNUP_OTP",
      //   otp: combinedOtp,
      //   verificationId:verificationId,
      //   userId:userId
      // };
      const response = await axios.post('http://13.201.75.142:8080/user/api/v1/verify-otp', {
        purpose: "SIGNUP_OTP",
        otp: combinedOtp,
        verificationId:verificationId,
        userId:userId
      });
      const check = response.data.result.userId
      console.log(response.data)
      if(check){
        setButtonState('Success')
        setLoading(false)
        setTimeout(() => {
          navigate("/signupValidate/verifyOtp/verifyPassword");
        }, 1000);
        
      }else{
        setError('Please enter a valid OTP');
        setLoading(false)
      }
    } catch (error) {
      console.log(error);
       setLoading(false);
      setButtonState('Failed')
      setError('Otp verification Failure')
      setTimeout(() => {
        setButtonState('Verify and Proceed');
        setError('')
      }, 4000);
    }
  };
  
  useEffect(() => {
    if (inputRef.current[0]) {
      inputRef.current[0].focus();
    }
  }, []);
  
  useEffect(() => {
    let timerId;
    if (timer > 0) {
      timerId = setTimeout(() => setTimer(timer - 1), 1000);
    } else {
      setCanResend(true);
    }
    return () => clearTimeout(timerId);
  }, [timer]);
  
  const handleChange = (e, index) => {
    const value = e.target.value;
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);
    if (value && index < 5 && inputRef.current[index + 1]) {
      inputRef.current[index + 1].focus();
    }
    setError('');
    setButtonState('Verify and Proceed')
  };
  
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && index > 0 && !otp[index] && inputRef.current[index - 1]) {
      inputRef.current[index - 1].focus();
    }
  };

  const handleResend = () => {
    setTimer(180);
    setCanResend(false);
  };

  return (
    <div className='flex flex-col mt-5 ml-32'>
      <div className='flex flex-col gap-1 items-center justify-center'>
        <span className='text-orange-400 font-semibold text-2xl shadow-md pb-3'>OTP Verification</span>
        <div className='flex flex-col justify-center mx-auto'>
          <span className='text-base text-neutral-500 pl-3 '>Enter the "6-digit" verification code sent to your e-mail address</span>
        </div>
        <hr className="custom-hr flex w-2/5 mt-6 mx-auto " />
      </div>
      <div className='flex justify-center items-center mt-6 max-w-screen max-h-screen'>
        <form className='flex flex-col  w-full mx-auto' onSubmit={handleSubmit}>
          <div className='flex items-center w-1/3 mx-auto justify-evenly'>
            {
              otp.map((value, index) => {
                return (
                  <input
                    key={index}
                    type="text"
                    value={value}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onChange={(e) => handleChange(e, index)}
                    ref={(input) => inputRef.current[index] = input}
                    className={`w-10  bg-neutral-900  border text-white ${error ? 'border-red-500' : 'border-neutral-600'} rounded-lg p-3 py-2  text-center font-light  text-sm shadow-sm`}
                  />
                );
              })
            }
          </div>
          <div className='flex flex-col   w-2/5 pr-32 pl-20 pt-3 gap-3 mx-auto'>
          {error && <div className="text-red-500 text-sm justify-start pb-6">{error}</div>}
            <span className='text-white font-semibold text-sm underline cursor-pointer hover:opacity-80'>Didn't receive the code?</span>
            <div className="">
              <span 
                className={`text-orange-600 font-semibold text-sm underline cursor-pointer hover:opacity-80 ${!canResend ? 'cursor-not-allowed opacity-50' : ''}`}
                onClick={canResend ? handleResend : null}
              >
                Resend Code {canResend ? '' : `in ${Math.floor(timer / 60)}:${('0' + timer % 60).slice(-2)}`}
              </span>
            </div>
          </div>
          <div className='flex flex-col items-center gap-4 justify-center w-1/3 mx-auto pt-6 pr-3'>
            <button
              type="submit"
              className={`${buttonState === 'Failed' ? 'bg-[#FF0000]' : buttonState === 'Success' ? 'bg-[#038E00]' : 'bg-orange-500'} text-white font-semibold  flex items-center justify-center py-2 px-6 w-48 rounded-lg hover:opacity-75`}
              disabled={loading ? true : false}
            >
                 {loading ? <CircularProgress  size={23} color="inherit" /> : buttonState}  
            </button>
            <span className='text-orange-600 font-semibold text-sm cursor-pointer hover:opacity-80' onClick={handleBack}>Get back to Login page</span>
          </div>
        </form>
      </div>
    </div>
  );
}
