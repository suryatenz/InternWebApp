import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../index.css";
import { useDispatch ,useSelector } from 'react-redux';
import { setUserWorkExperience } from '../redux/signupSlice';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
const Signupage25g = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [buttonState, setButtonState] = useState('Continue');
    const signup=useSelector(state=>state.signup)
    const [nav, setNav] = useState(false)
    const [formData, setFormData] = useState({
        designation: '',
        experience: '',
        companyName: '',
        engineeringSkills: ''
    });
    const [Error, setError] = useState({
        designation: false,
        experience: false,
        companyName: false,
        engineeringSkills: false
    });
    const navigate = useNavigate();
    const Ref = useRef()

    useEffect(() => {
        Ref.current.focus()
    }, [])

    const handleSubmit =async (e) => {
        e.preventDefault();
        setLoading(true);
        let hasError = false;
        Object.entries(formData).forEach(([key, value]) => {
            if (!value) {
                hasError = true;
                setError(prevState => ({ ...prevState, [key]: true }));
            }
        });
        if (!hasError && nav) {
            setError(false);
            // navigate('/signuplast');
        }
        axios.put('http://13.201.75.142:8080/profile/api/v1/update-user-profile',{
            "userId": signup.userId,
            "profile": {
                "firstname": signup.profile.firstname,
                "lastname": signup.profile.lastname,
                "dateOfBirth": signup.profile.dateOfBirth,
                "gender": signup.profile.gender,
                "district": signup.profile.district,
                "state": signup.profile.state,
                "country": signup.profile.country,
                "linkedInUrl": signup.profile.linkedInUrl
            },
            "userEducation": signup.userEducation,
            "userWorkExperience": {
                "companyName": signup.userWorkExperience.companyName,
                "totalYearsOfExperience": signup.userWorkExperience.totalYearsOfExperience,
                "latestRoleDesignation": signup.userWorkExperience.latestRoleDesignation,
                "skillsStatus": signup.userWorkExperience.skillsStatus,
                "catalogVariants": signup.userWorkExperience.catalogVariants,
                "userEngineeringSkills":[
                    signup.userWorkExperience.userEngineeringSkills
                ] 
            }}, {
            headers: {
              'Content-Type': 'application/json',
              'Cache-Control': 'no-cache'
            }
          })
          .then(response => {
            console.log(response.data);
            if (response.data.success) {
                setLoading(false)
                setButtonState('Success')
                setTimeout(()=>{
                    navigate('/signuplast');
                
                },1000)
            
              }
          })
          .catch(error => {
            console.error(error);
            setLoading(false)
            setButtonState('Failed')
            setTimeout(()=>{  setButtonState('Continue') }
            ,4000)
            console.log({
                "userId": signup.userId,
                "profile": {
                    "firstname": signup.profile.firstname,
                    "lastname": signup.profile.lastname,
                    "dateOfBirth": signup.profile.dateOfBirth,
                    "gender": signup.profile.gender,
                    "district": signup.profile.district,
                    "state": signup.profile.state,
                    "country": signup.profile.country,
                    "linkedInUrl": signup.profile.linkedInUrl
                },
                "userEducation": signup.userEducation,
                "userWorkExperience": {
                    "companyName": signup.userWorkExperience.companyName,
                    "totalYearsOfExperience": signup.userWorkExperience.totalYearsOfExperience,
                    "latestRoleDesignation": signup.userWorkExperience.latestRoleDesignation,
                    "skillsStatus": signup.userWorkExperience.skillsStatus,
                    "catalogVariants": signup.userWorkExperience.catalogVariants,
                    "userEngineeringSkills":[
                        signup.userWorkExperience.userEngineeringSkills
                    ] 
                }}, {
                headers: {
                  'Content-Type': 'application/json',
                  'Cache-Control': 'no-cache'
                }
              })
          });
         
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'engineeringSkills') {
            const skills = value.split(',').map(skill => skill.trim());
            const skillCount = skills.filter(skill => skill !== '').length;
            if (skillCount >= 5) {
                setFormData({ ...formData, [name]: value });
                setError({ ...Error, [name]: false });
                setNav(true)
            } else {
                setNav(false)
                setFormData({ ...formData, [name]: value });
                setError({ ...Error, [name]: true });
            }
        } else {
            setFormData({ ...formData, [name]: value });
            setError({ ...Error, [name]: false });
        }
        dispatch(setUserWorkExperience({
            companyName: formData.companyName,
            totalYearsOfExperience: formData.experience,
            latestRoleDesignation: formData.designation,
            userEngineeringSkills:{ 
                skillName:formData.engineeringSkills,
            }
        }))
    };

    return (
        <div className="imaga h-screen flex bg-neutral-900">
            <div className=" mt-6 ml-12 text-white text-4xl">
                <p className=''> Join a thriving</p>
                <p className='pt-0.5'>community of Engineers</p>
                <p className=' pt-1 text-sm ml-1'>with UnBoxing Community</p>
            </div>
            <div className="flex justify-center items-center h-screen text-white text-sm">
                <div className="w-3/4 flex justify-center ml-56 p-5 mb-28 mt-20">
                    <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
                        <div className="">
                            <img src='./logo.svg' className=' w-48 cursor-pointer ml-28' alt="logo" />
                        </div>
                        <div className="">
                            <hr className="custom-hr flex w-full mt-2 mb-3" />
                        </div>
                        <div className="">
                            <label htmlFor="experience" className=" text-sm ml-0.5">Experience (In Years)<label className=' text-orange-500 text-sm' > *</label> </label>
                            <select name="experience" id="experience" className={`px-4 py-2 border ${!Error.experience ? 'border-neutral-600' : 'border-red-500'} rounded-lg bg-neutral-900 w-full mt-1`} value={formData.experience} onChange={handleChange} >
                                <option value="">Select Experience</option>
                                <option value="1">Entry Level</option>
                                <option value="2">+2 years</option>
                                <option value="5">+5 years</option>
                                <option value="10">+10 years</option>
                                <option value="20">+20 years</option>
                            </select>
                        </div>
                        <div className="">
                            <label htmlFor="designation" className=" text-sm ml-0.5"> Current Designation<label className=' text-orange-500 text-sm' > *</label> </label>
                            <div className=" flex flex-row">
                                <input type="text" ref={Ref} id="designation" name="designation" placeholder='Enter the Designation' className={`px-4 py-2 border ${!Error.designation ? 'border-neutral-600' : 'border-red-500'} rounded-lg bg-neutral-900 w-full mt-1`} value={formData.designation} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="">
                            <label htmlFor="companyName" className=" text-sm ml-0.5">Current Company Name<label className=' text-orange-500 text-sm' > *</label> </label>
                            <div className=" flex flex-row">
                                <input type="text" id="companyName" name="companyName" placeholder='Company Name' className={`px-4 py-2 border ${!Error.companyName ? 'border-neutral-600' : 'border-red-500'} rounded-lg bg-neutral-900 w-full mt-1`} value={formData.companyName} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="">
                            <label htmlFor="engineeringSkills" className=" text-sm ml-0.5">Engineering Skills<label className=' text-orange-500 text-sm' > *</label> </label>
                            <div className=" flex flex-row">
                                <input type="text" id="engineeringSkills" name="engineeringSkills" placeholder='Eg. Quality Assurance, Quality Manager'   className={`px-4 py-2 border ${!Error.engineeringSkills ? 'border-neutral-600' : 'border-red-500'} rounded-lg bg-neutral-900 w-full mt-1`} value={formData.engineeringSkills} onChange={handleChange} />
                            </div>
                            <label className={` text-sm ${!Error.engineeringSkills ? 'text-white' : 'text-red-500'} ml-1 mt-0.5`}>Select up to 5 skills you prefer</label>
                        </div>
                        <div className=" flex flex-row">
                            <div className=" mr-44 ml-44 pt-2 pl-3">  
                                <button type='submit' className={` ${buttonState === 'Failed' ? 'bg-[#FF0000]' : buttonState === 'Success' ? 'bg-[#038E00]' : 'bg-orange-500'} px-4 py-1.5 rounded-lg`} disabled={loading ?true:false}>{loading ? <CircularProgress  size={23} color="inherit" />:buttonState}</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signupage25g;






// {
// "userId": signup.userId,
// "profile": {
//     "firstname": signup.profile.firstname,
//     "lastname": signup.profile.lastname,
//     "dateOfBirth": signup.profile.dateOfBirth,
//     "gender": signup.profile.gender,
//     "district": signup.profile.district,
//     "state": signup.profile.state,
//     "country": signup.profile.country,
//     "linkedInUrl": signup.profile.linkedInUrl
// },
// "userEducation": signup.userEducation,
// "userWorkExperience": {
//     "companyName": signup.userWorkExperience.companyName,
//     "totalYearsOfExperience": signup.userWorkExperience.totalYearsOfExperience,
//     "latestRoleDesignation": signup.userWorkExperience.latestRoleDesignation,
//     "skillsStatus": signup.userWorkExperience.skillsStatus,
//     "catalogVariants": signup.userWorkExperience.catalogVariants,
//     "userEngineeringSkills":[
//         {
//             "skillName": signup.userWorkExperience.userEngineeringSkills.skillName
//         }
//     ] 
// }};