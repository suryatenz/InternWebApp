import { FiEye, FiEyeOff } from "react-icons/fi";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { IoMdCheckmark } from "react-icons/io";
import axios from 'axios';
import "../index.css";
import { useSelector } from "react-redux";
import CircularProgress from '@mui/material/CircularProgress';
export default function SetPassword() {
  const [loading, setLoading] = useState(false);
  const[error, setError] = useState('');  
  const [buttonState, setButtonState] = useState('Confirm');
  const userId = useSelector((state) => state.products.userId);
  const verificationId = useSelector((state) => state.products.verificationId);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const [strength, setStrength] = useState(0);
  const [conditons, setConditions] = useState({
    length: false,
    upper: false,
    number: false,
    special: false,
  })
  const [strengthColor, setStrengthColor] = useState('text-red-600');
  const [strengthLabel, setStrengthLabel] = useState('Very Poor');
  const navigate = useNavigate();
  const passwordRef = useRef();
  useEffect(() => {
    passwordRef.current.focus();
  }, []);
  const handleToggle = () => {
    setShowPassword(!showPassword);
  };
  const handleToggle1 = () => {
    setShowPassword1(!showPassword1);
  };
  const handleChange1 = (e) => {
    setError('')
    setPassword1(e.target.value.trim())
}
  const handleChange = (e) => {
    let value = e.target.value;
    value = value.trim()
    setPassword(value);
    setError('');
    let newStrength = 0;
    let newConditions = { ...conditons };

    if (value.length >= 8) {
      newStrength++;
      newConditions.length = true;
    } else {
      newConditions.length = false;
    }

     if (/[A-Z]/.test(value)) {
      newStrength++;
      newConditions.upper = true;
    } else {
      newConditions.upper = false;
    }

    if (/[0-9]/.test(value)) {
      newStrength++;
      newConditions.number = true;
    } else {
      newConditions.number = false;
    }

    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value)) {
      newStrength++;
      newConditions.special = true;
    } else {
      newConditions.special = false;
    }
    if (e.target.value.length > 0) {
      newStrength++;
    }
    if (e.target.value.length > 4) {
      newStrength++;
    }
    // console.log(newStrength);
    setLoading(false);
    setError('')
    setStrength(newStrength);
    setConditions(newConditions);
    let color = 'text-red-600 ';
  let label = 'Very Poor';
  if (newStrength === 2) {
    color = 'text-orange-600 ';
    label = 'Poor';
  } else if (newStrength === 3) {
    color = 'text-yellow-300';
    label = 'Fair';
  } else if (newStrength ==4 || newStrength ==5 ) {
    color = 'text-lime-400';
    label = 'Good';
  } else if (newStrength === 6) {
    color = 'text-green-600 ';
    label = 'Strong';
  }
    setStrengthColor(color);
    setStrengthLabel(label);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true);
    if (password == password1 && conditons.length && conditons.upper && conditons.number && conditons.special && password.length >= 8) {
     try {
        const payload = {
          userId:userId,
          verificationId:verificationId,
          password: password,
          confirmationPassword: password1
        };
        const response = await axios.post('http://13.201.75.142:8080/user/api/v1/set-password',payload , {
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
          }
        });
        const pass = response.data.result.isPasswordSet
        if(pass){
          setButtonState('Success')
          setLoading(false)
          setTimeout(() => {
            navigate("/resetComplete")
          }, 1000);
         
        }
       console.log(response.data)
      } catch (error) {
        setLoading(false);
        console.error(error);
        setButtonState('Failed')
      setError(error.message)
      setTimeout(() => {
        setButtonState('Confirm');
        setError('')
      }, 4000);
      }
    }else{
      setError('Password does not match or does not meet the requirements')
      setLoading(false);
      return;
   }
  }
  const handlenav = () => {
    navigate("/")
  }
  return (
    <div className="flex flex-col ml-20">
      <div className="flex flex-col gap-2  items-center justify-center ml-8 mt-2">
        <span className="text-orange-400 font-semibold text-2xl shadow-md ml-4">
          Reset Your Password
        </span>
        <hr className="custom-hr flex w-2/6 mt-4 ml-3" />
      </div>
      <div className="flex flex-col">
        <form className="flex flex-col w-full items-center justify-center pl-14" onSubmit={handleSubmit}>
          <div className="flex flex-col  relative w-1/3 mt-6 mb-1 gap-1">
            <label
              for="password"
              className="text-neutral-300 text-sm font-semibold "
            >
              *Enter New Password
            </label>
            <input
              ref={passwordRef}
              value={password}
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className={`bg-neutral-900 p-2 pl-3 border ${error ? "border-red-600" : "border-neutral-600"
                }  rounded-lg text-white placeholder-neutral-600 placeholder:text-sm font-normal shadow-sm`}
              required
              minLength={8}
              maxLength={20}
            />
            {showPassword ? (
              <FiEyeOff
                className="absolute top-9 right-4 text-neutral-500 cursor-pointer"
                onClick={handleToggle}
              />
            ) : (
              <FiEye
                className="absolute top-9 right-4 text-neutral-500 cursor-pointer"
                onClick={handleToggle}
              />
            )}
          </div>
          <div className="flex justify-between w-1/3 p-2">
            <span
              className={`border border-neutral-600 ${strength > 0 ? " bg-red-600 " : ""
                }  w-16 h-1.5 rounded-xl`}
            ></span>
            <span
              className={`border border-neutral-600 ${strength > 1 ? " bg-orange-600 " : ""
                }  w-16 h-1.5 rounded-xl`}
            ></span>
            <span
              className={`border border-neutral-600 ${strength > 2 ? " bg-yellow-600 " : ""
                }  w-16 h-1.5 rounded-xl`}
            ></span>
            <span
              className={`border border-neutral-600 ${strength > 3 ? " bg-yellow-300 " : ""
                }  w-16 h-1.5 rounded-xl`}
            ></span>
            <span
              className={`border border-neutral-600 ${strength > 4 ? " bg-lime-400 " : ""
                }  w-16 h-1.5 rounded-xl`}
            ></span>
            <span
              className={`border border-neutral-600 ${strength > 5 ? " bg-green-600 " : ""
                }  w-16 h-1.5 rounded-xl`}
            ></span>
          </div>
          <div className=" text-neutral-900 w-1/3 pb-2 text-xs">
            {password.length && <span className="text-neutral-300 font-medium">
              Password Strength: <span className={`text-xs ${strengthColor}`} >{strengthLabel}</span>
            </span>}
          </div>
          <span className="text-neutral-400 text-xs font-semibold w-1/3">
            PASSWORD MUST CONTAIN
          </span>
          <div className="flex flex-col w-1/3 mt-2 gap-1 ">
            <div className="flex gap-2">
              <span
                className={`${conditons.length ? "text-green-400" : " text-neutral-400 "}  font-normal  `}
                style={{ fontSize: "11px" }}
              >
                Between 8 and 20 characters
              </span>
              {conditons.length && <IoMdCheckmark className="text-green-400 font-light i" size={12} />}
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`${conditons.upper ? "text-green-400" : " text-neutral-400 "}  font-normal  `}
                style={{ fontSize: "11px" }}
              >
                1 or more upper case letters
              </span>{" "}
              {conditons.upper && <IoMdCheckmark className="text-green-400  font-light" size={12} />}
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`${conditons.number ? "text-green-400" : " text-neutral-400 "}  font-normal  `}
                style={{ fontSize: "11px" }}
              >
                1 or more numbers
              </span>{" "}
              {conditons.number && <IoMdCheckmark className="text-green-400  font-light" size={12} />}
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`${conditons.special ? "text-green-400" : " text-neutral-400 "}  font-normal  `}
                style={{ fontSize: "11px" }}
              >
                1 or more special characters
              </span>{" "}
              {conditons.special && <IoMdCheckmark className="text-green-400  font-light" size={12} />}
            </div>
          </div>
          <div className="flex flex-col relative w-1/3 mt-1 gap-1 pt-2">
            <label
              for="password"
              className="text-neutral-300 text-sm font-semibold"
            >
              *Re-enter Password
            </label>
            <input
              type={showPassword1 ? "text" : "password"}
              onChange={handleChange1}
              className={`bg-neutral-900 p-2 pl-3 border ${error? "border-red-600" : "border-neutral-600"
                }  rounded-lg text-white placeholder-neutral-600 placeholder:text-sm font-normal shadow-sm`}
              required
              minLength={8}
              maxLength={20}
            />
            {showPassword1 ? (
              <FiEyeOff
                className="absolute top-11 right-4 text-neutral-500 cursor-pointer"
                onClick={handleToggle1}
              />
            ) : (
              <FiEye
                className="absolute top-11 right-4 text-neutral-500 cursor-pointer"
                onClick={handleToggle1}

              />
            )}
            {password === password1 && password != "" && <span className="text-green-500  font-semibold" style={{ fontSize: "11px" }}>PASSWORD MATCHED</span>}
            {error && <div className="text-red-500 text-sm">{error}</div>}
          </div>
          <div className="flex items-center justify-center pt-6 w-full">
            <button type="submit"className={`${buttonState === 'Failed' ? 'bg-[#FF0000]' : buttonState === 'Success' ? 'bg-[#038E00]' : 'bg-orange-500'} text-white w-1/3 rounded-lg hover:opacity-70 py-2`} disabled={loading ? true : false}>
            {loading ? <CircularProgress  size={23} color="inherit" /> : buttonState}  
            </button>
          </div>
          <div className="">
            <p className=" text-orange-500 mt-8 cursor-pointer text-sm" onClick={handlenav}>Get back to Login page</p>
          </div>
        </form>
      </div>
    </div>
  );
}
