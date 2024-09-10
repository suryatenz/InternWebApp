import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../index.css";
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { useDispatch } from 'react-redux';
import { setProfile } from '../redux/signupSlice.js';
const Signupfirst = () => {
    const dispatch=useDispatch()
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        day: '',
        month: '',
        year: '',
        gender: '',
        district: '',
        state: '',  
        country: ''
    });
    const [Error, setError] = useState({
        firstName: false,
        lastName: false,
        day: false,
        month: false,
        year: false,
        gender: false,
        district: false,
        state: false,
        country: false
    });
    const navigate = useNavigate();
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 122 }, (_, i) => currentYear - i);
    const Ref = useRef()

    useEffect(() => {
        Ref.current.focus();
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        let hasError = false;
        let yer = parseInt(formData.year)
        let yy = parseInt(years)
        Object.entries(formData).forEach(([key, value]) => {
            if (!value) {
                hasError = true;
                setError(prevState => ({ ...prevState, [key]: true }));
            }
        });
        if (!hasError) {
            if (yy - yer < 25) {
                navigate('/signup25l')
            }
            else {
                navigate('/signupg');
            }
        }
    };

    const handlenavo = () => {
        navigate('/')
    }
    
    const handleChange = (e) => {
        if (e.target) {
            const { name, value } = e.target;
            setFormData({ ...formData, [name]: value });
            setError({ ...Error, [name]: false });
        } else if (typeof e === 'string') {
            setFormData({ ...formData, country: e });
            setError({ ...Error, country: false });
        }
      
        dispatch(setProfile({
            firstname: formData.firstName,
            lastname: formData.lastName,
            dateOfBirth: `${formData.year}-${formData.month < 10 ? `0${formData.month}` : formData.month}-${formData.day < 10 ? `0${formData.day}` : formData.day}`,
            gender: formData.gender,
            district: formData.district,
            state: formData.state,
            country: formData.country,
    
         }));
    };

    return (
        <div className="imaga h-screen flex bg-neutral-900">
             <div className=" mt-6 ml-12 text-white text-4xl">
                <p className=''> Join a thriving</p>
                <p className='pt-0.5'>community of Engineers</p>
                <p className=' pt-1 text-sm ml-1'>with UnBoxing Community</p>
            </div>
        <div className="flex justify-center items-center ml-28 text-white text-sm">
            <div className=" w-82 flex justify-center ml-32 mt-5 p-5 mb-4">
                <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
                    <div className="">
                        <img src='./logo.svg' className='w-52 cursor-pointer ml-28' alt="logo" />
                    </div>
                    <div className="">
                        <hr className="custom-hr flex w-full mb-2" />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="firstName" className=" text-sm ml-0.5">Enter Full Name<label className=' text-orange-500 text-sm' > *</label> </label>
                        <div className=" flex flex-row">
                            <input type="text" ref={Ref} id="firstName" name="firstName" placeholder='First Name' className={`px-4 py-2 border ${!Error.firstName ? 'border-neutral-600' : 'border-red-500'} rounded-lg bg-neutral-900 w-1/2 mt-1`} value={formData.firstName} onChange={handleChange} />
                            <input type="text" id="lastName" name="lastName" placeholder='Last Name' className={`px-4 py-2 ml-4 border ${!Error.lastName ? 'border-neutral-600' : 'border-red-500'} rounded-lg bg-neutral-900 w-1/2 mt-1`} value={formData.lastName} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="dob" className="text-sm ml-0.5">Select DOB<label className='text-orange-500 text-sm'> *</label></label>
                        <div className="flex flex-row">
                            <select id="day" name="day" className={`px-4 py-2 border ${!Error.day ? 'border-neutral-600' : 'border-red-500'} rounded-lg bg-neutral-900 w-1/3 mt-1 text-gray-400 scrollbar-nav1`} value={formData.day} onChange={handleChange}>
                                <option value="">Day</option>
                                {[...Array(31).keys()].map(day => (
                                    <option key={day + 1} value={day + 1}>{day + 1}</option>
                                ))}
                            </select>
                            <select id="month" name="month" className={`px-4 py-2 ml-3 border ${!Error.month ? 'border-neutral-600' : 'border-red-500'} rounded-lg bg-neutral-900 w-1/3 mt-1 text-gray-400 scrollbar-nav1`} value={formData.month} onChange={handleChange}>
                                <option value="">Month</option>
                                {[...Array(12).keys()].map(month => (
                                    <option key={month + 1} value={month + 1}>{month + 1}</option>
                                ))}
                            </select>
                            <select id="year" name="year" className={`px-4 py-2 ml-3 border ${!Error.year ? 'border-neutral-600' : 'border-red-500'} rounded-lg bg-neutral-900 w-1/3 mt-1 text-gray-400 scrollbar-nav1`} value={formData.year} onChange={handleChange}>
                                <option value="">Year</option>
                                {years.map(year => (
                                    <option key={year} value={year}>{year}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="">
                        <label htmlFor="gender" className=" text-sm">Select Gender<label className=' text-orange-500 ml-0.5'> *</label></label>
                        <select id="gender" name="gender" className={`px-4 py-2 border ${!Error.gender ? 'border-neutral-600' : 'border-red-500'} rounded-lg bg-neutral-900 w-full mt-1 text-gray-400`} value={formData.gender} onChange={handleChange}>
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Others">Others</option>
                        </select>
                    </div>
                    <div className="">
                        <label htmlFor="country" className="text-sm">Select Country<label className=' ml-0.5 text-orange-500'>*</label></label>
                        <CountryDropdown
                            className={`px-4 py-2 border ${!Error.country ? 'border-neutral-600' : 'border-red-500'} rounded-lg bg-neutral-900 w-full mt-1 text-gray-400 scrollbar-nav1`}
                            value={formData.country}
                            onChange={handleChange} />
                    </div>
                    <div className="">
                        <label htmlFor="state" className="text-sm">Select State<label className=' ml-0.5 text-orange-500'>*</label></label>
                        {
                            formData.country ?
                                <div className="">
                                    <RegionDropdown
                                        country={formData.country}
                                        value={formData.state}
                                        onChange={(val) => { setFormData({ ...formData, state: val }); setError({ ...Error, state: false }) }}
                                        className={`px-4 py-2 border ${!Error.state ? 'border-neutral-600' : 'border-red-500'} rounded-lg bg-neutral-900 w-full mt-1 text-gray-400 scrollbar-nav1`}
                                    />
                                </div> :
                                <div className="">
                                    <select id="state" name="state" className={`px-4 py-2 border ${!Error.state ? 'border-neutral-600' : 'border-red-500'} rounded-lg bg-neutral-900 w-full mt-1 text-gray-400`}>
                                        <option value="">Select Region</option>
                                    </select>
                                </div>
                        }
                    </div>
                    <div className="">
                        <label htmlFor="district" className="text-sm">Select District<label className=' ml-0.5 text-orange-500'>*</label></label>
                        <input type='text' id="district" placeholder='Enter District' name="district" className={`px-4 py-2 border ${!Error.district ? 'border-neutral-600' : 'border-red-500'} rounded-lg bg-neutral-900 w-full mt-1 text-gray-400`} value={formData.district} onChange={handleChange} />
                    </div>
                    <div className="flex flex-col pt-1">
                        <div className="">
                            <button type='submit' className=' bg-orange-500 px-4 py-1.5 rounded-lg ml-48 mt-1'  >Continue</button>
                        </div>
                        <div className=" flex flex-row justify-center mt-2" onClick={handlenavo}>
                            <div className=" cursor-pointer">
                                <p>Already have an account?</p>
                            </div>
                            <div className="">
                                <p className='text-sm cursor-pointer text-orange-600 pl-1' >Log in</p>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        </div>  
    );
};

export default Signupfirst;

