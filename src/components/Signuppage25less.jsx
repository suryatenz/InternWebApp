import  { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../index.css";
import { setProfile,addUserEducation,setUserWorkExperience } from '../redux/signupSlice';
import { useDispatch } from 'react-redux';
const Signuppage25less = () => {
    const dispatch = useDispatch();
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 122 }, (_, i) => currentYear - i);
    const [formData, setFormData] = useState({
        education: '',
        yeareducation: '',
        instituteName: '',
        catalogskillstatus: '',
        linkedinurl: '',
        catalogVariants: []
    });
    const [Error, setError] = useState({
        education: false,
        yeareducation: false,
        instituteName: false,
        catalogVariants: false,
        catalogskillstatus: false,
        linkedinurl: false
    });
    const navigate = useNavigate();
    const [customOptionValue, setCustomOptionValue] = useState("");
    const Ref = useRef();

    useEffect(() => {
        Ref.current.focus();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        let hasError = false;
        Object.entries(formData).forEach(([key, value]) => {
            if (!value) {
                hasError = true;
                setError(prevState => ({ ...prevState, [key]: true }));
            }
        });
        if (formData.catalogVariants.length !== 5) {
            setError(prevState => ({ ...prevState, catalogVariants: true }));
            hasError = true;
        }
        if (!hasError) {
            navigate('/signupg');
        }
        dispatch(setProfile({
            linkedInUrl: formData.linkedinurl,
           }))
           dispatch(addUserEducation({
                institutionName: formData.instituteName,
                educationBackground: formData.education,
                endYear: formData.yeareducation,
                 
           }))
            dispatch(setUserWorkExperience({
                skillsStatus: formData.catalogskillstatus,
                catalogVariants: formData.catalogVariants.join(','),
              }))

    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        let error = false;
        if (name === "linkedinurl") {
            const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
            if (!urlRegex.test(value)) {
                error = true;
            }
        }
        if (name === "customOption") {
            setCustomOptionValue(value);
        } else {
            setFormData({ ...formData, [name]: value });
        }
        setError({ ...Error, [name]: error });
    };
    const handleAddOption = () => {
        const newOption = customOptionValue.trim();
        if (newOption !== "" && formData.catalogVariants.length < 5) {
            setFormData(prevState => ({
                ...prevState,
                catalogVariants: [...prevState.catalogVariants, newOption]
            }));
            setCustomOptionValue("");
            if (formData.catalogVariants.length === 4) {
                setError(prevState => ({ ...prevState, catalogVariants: false }));
            }
        }
    };

    const handleRemoveOption = (indexToRemove) => {
        const updatedOptions = formData.catalogVariants.filter((option, index) => index !== indexToRemove);
        setFormData({ ...formData, catalogVariants: updatedOptions });
        setError(prevState => ({ ...prevState, catalogVariants: true }));
    };

    return (
        <>
            <div className="imaga h-screen flex bg-neutral-900">
                <div className=" mt-6 ml-12 text-white text-4xl">
                    <p className=''> Join a thriving</p>
                    <p className='pt-0.5'>community of Engineers</p>
                    <p className=' pt-1 text-sm ml-1'>with UnBoxing Community</p>
                </div>
                <div className="flex justify-center items-center h-screen text-white">
                    <div className="w-3/4 flex justify-center ml-72 mt-8 px-2 pb-2 mb-8">
                        <form className="flex flex-col space-y-3" onSubmit={handleSubmit}>
                            <div className="">
                                <img src='./logo.svg' className=' w-48 cursor-pointer ml-28' alt="logo" />
                            </div>
                            <div className="">
                                <hr className="custom-hr flex w-full mb-2" />
                            </div>
                            <div className="">
                                <label htmlFor="education" className=" text-sm ml-0.5">Engineering Education Background<label className=' text-orange-500 text-sm' > *</label> </label>
                                <div className=" flex flex-row">
                                    <input type="text" ref={Ref} id="education" name="education" placeholder='Engineering Education Background' className={`px-4 py-2 text-sm border ${!Error.education ? 'border-neutral-600' : 'border-red-500'} rounded-lg bg-neutral-900 w-full mt-1`} value={formData.education} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="">
                                <label htmlFor="yeareducation" className=" text-sm ml-0.5">Year of Education<label className=' text-orange-500 text-sm' > *</label> </label>
                                <div className=" flex flex-row">
                                <select id="yeareducation" name="yeareducation" className={`px-4 py-2 border ${!Error.yeareducation ? 'border-neutral-600' : 'border-red-500'} rounded-lg bg-neutral-900 w-full mt-1 text-gray-400 scrollbar-nav1`} value={formData.yeareducation} onChange={handleChange}>
                                <option value="">Year</option>
                                {years.map(year => (
                                    <option key={year} value={year}>{year}</option>
                                ))}
                            </select>
                            </div>
                            </div>
                            <div className="">
                                <label htmlFor="instituteName" className=" text-sm ml-0.5">Institute Name<label className=' text-orange-500 text-sm' > *</label> </label>
                                <div className=" flex flex-row">
                                    <input type="text" id="instituteName" name="instituteName" placeholder='Institute Name' className={`px-4 py-2 text-sm border ${!Error.instituteName ? 'border-neutral-600' : 'border-red-500'} rounded-lg bg-neutral-900 w-full mt-1`} value={formData.instituteName} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="">
                                <label htmlFor="catalogVariants" className="text-sm">Catalog Variants<label className=' ml-0.5 text-orange-500'>*</label></label>
                                <div className={`px-4 py-2 border ${!Error.catalogVariants ? 'border-neutral-600' : 'border-red-500'} rounded-lg bg-neutral-900 w-full mt-1`}>
                                    <div className="flex flex-row h-7">
                                        {Array.isArray(formData.catalogVariants) && formData.catalogVariants.map((option, index) => (
                                            <div key={index} className="flex items-center text-sm px-2 pb-1">
                                                <div className="mr-3 text-white">{option}</div>
                                                <button type="button" className="text-neutral-100 text-xl pb-0.5" onClick={() => handleRemoveOption(index)}>x</button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                {formData.catalogVariants.length < 5 ? <div className=""> <div className="flex mt-2 text-sm">
                                    <input type="text" name="customOption" placeholder="Enter Custom Option" className={`px-4 py-2 border ${!Error.catalogVariants ? 'border-neutral-600' : 'border-red-500'} rounded-lg bg-neutral-900 w-full mt-1 mr-2`} value={customOptionValue} onChange={(e) => setCustomOptionValue(e.target.value)} />
                                    <button type="button" className={`${formData.catalogVariants.length === 5 ? 'bg-orange-800' : 'bg-orange-500'} px-3 mt-2 py-2 rounded-md text-white`} onClick={handleAddOption} >Add</button>
                                </div>
                                    {Error.catalogVariants && <div className="text-red-600 text-center text-xs">You Should enter 5 skills</div>}
                                </div> :
                                    <div className=""></div>
                                }
                            </div>
                            <div className="text-sm">
                                <label htmlFor="catalogskillstatus" className="text-sm">
                                    Catalog Skill Status
                                    <label className="ml-0.5 text-orange-500">*</label>
                                </label>
                                <select
                                    id="catalogskillstatus"
                                    name="catalogskillstatus"
                                    className={`px-4 py-2 border ${!Error.catalogskillstatus ? 'border-neutral-600' : 'border-red-500'} rounded-lg bg-neutral-900 w-full mt-1 text-gray-400`}
                                    value={formData.catalogskillstatus}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Skill Status</option>
                                    <option value="Novice">Novice</option>
                                    <option value="Beginner">Beginner</option>
                                    <option value="Competency">Competency</option>
                                    <option value="Proficiency">Proficiency</option>
                                    <option value="Expertise">Expertise</option>
                                    <option value="Master">Master</option>
                                </select>
                            </div>
                            <div className="text-sm">
                                <label htmlFor="linkedinurl" className="text-sm">Linkedin Url<label className=' ml-0.5 text-orange-500'>*</label></label>
                                <input type="url" id="linkedinurl" placeholder='Catalog Skill Status' name="linkedinurl" className={`px-4 py-2 border ${!Error.linkedinurl ? 'border-neutral-600' : 'border-red-500'} rounded-lg bg-neutral-900 w-full mt-1 text-gray-400`} value={formData.linkedinurl} onChange={handleChange} />
                            </div>
                            <div className=" flex flex-col pt-2 text-sm">
                                <div className=" mr-44 ml-44 pl-1">
                                    <button type='submit' className=' bg-orange-500 px-4 py-1.5 rounded-lg' >Continue</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Signuppage25less;
