import React, { useState,useRef,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginHeader from "../components/LoginHeader";
import LoginFooter from "../components/LoginFooter";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { TriangleAlert } from 'lucide-react';
import "../index.css";
const Login = () => {
  const emailRef = useRef();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const handlenav = () => {
    navigate("/search");
  };
  // console.log(formData)
  useEffect(()=>{
    emailRef.current.focus();
  
  },[])
  const handleForgot = () => {
    navigate("/forgotpassword");
  };
  const handleToggle = () => {
    setShowPassword(!showPassword);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // setNotFound(!notFound)
    handlenav();
  };
  const handleSignUP = () => {
    navigate("/signupValidate");
  };
  const [notFound,setNotFound]=useState(false);
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="imaga  bg-neutral-900 h-screen flex flex-col w-screen text-white  mx-auto">
      <LoginHeader />
      <div className="justify-center flex items-center pt-6 mt-8 pb-2 ">
        <img src="./logo.svg" className="w-60 ml-24 " />
      </div>
      <div className="flex flex-col pt-3 ml-28">
        <form
          className="flex flex-col   items-center"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col relative  w-1/3 ">
            <input
              ref={emailRef}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              type="email"
              placeholder="Enter E-mail Address"
              className={`bg-neutral-900 p-2 pl-3 border ${notFound ? "border-red-600" :"border-neutral-600" }  rounded-lg text-white  placeholder-neutral-600 placeholder:text-sm font-normal shadow-sm `}
              required
            />
             {notFound &&  <TriangleAlert  className="absolute top-3 right-3 text-red-600 font-thin "  size={20} /> }
            { notFound && <span className="text-xs mt-1 font-medium text-red-600">This e-mail is not registered with us !</span>}
          </div>
          <div className="flex flex-col  relative w-1/3 mt-6 mb-1">
            <input
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              className={`bg-neutral-900 p-2 pl-3 border ${notFound ? "border-red-600" :"border-neutral-600" }  rounded-lg text-white placeholder-neutral-600 placeholder:text-sm font-normal shadow-sm`}
              required
           />
            {showPassword ? (
              <FiEyeOff
                className="absolute top-3 right-4 text-neutral-500 cursor-pointer"
                onClick={handleToggle}
              />
            ) : (
              <FiEye
                className="absolute top-3 right-4 text-neutral-500 cursor-pointer"
                onClick={handleToggle}
              />
            )}
           {notFound && <span className="text-xs mt-1 font-medium text-red-600">This entered password is wrong!</span> }
          </div>
          <div className="flex flex-col items-end justify-end w-1/3 ">
            <span className="text-orange-500 text-sm underline cursor-pointer hover:opacity-75 " onClick={handleForgot}>
              Forgot Password?
            </span>
          </div>
          <div className=" flex flex-col  w-1/3  mt-5">
            <button 
              className="p-2 bg-orange-500 rounded-lg hover:opacity-85 shadow-sm"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
      </div>
      <div className="pt-4">
      <hr className="custom-hr flex w-2/4 mt-5 mx-auto " />
      </div>
      <div className="flex justify-center pt-2 ml-24">
      Don't have an account?  <span className="text-orange-500  cursor-pointer hover:opacity-75 pl-1" onClick={handleSignUP}>Sign Up</span>
      </div>
      <div className="mt-auto">
        <LoginFooter />
      </div>
    </div>
  );
};

export default Login;
