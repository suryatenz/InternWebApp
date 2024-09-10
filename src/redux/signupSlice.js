import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userId: '',
    profile: {
      firstname: '',
      lastname: '',
      dateOfBirth: '',
      gender: '',
      district: '',
      state: '',
      country: '',
      linkedInUrl: ''
    },
    userEducation: [],
    userWorkExperience: {
      companyName: '',
      totalYearsOfExperience: 0,
      latestRoleDesignation: '',
      skillsStatus: '',
      catalogVariants: '',
      userEngineeringSkills: []
    }
  };

  const signupSlice = createSlice({
    name: 'signup',
    initialState,
    reducers: {
      setUserId: (state, action) => {
        state.userId = action.payload;
      },
      setProfile: (state, action) => {
        state.profile = { ...state.profile, ...action.payload };
      },
      addUserEducation: (state, action) => {
        state.userEducation.push(action.payload);
      },
      setUserWorkExperience: (state, action) => {
        state.userWorkExperience = { ...state.userWorkExperience, ...action.payload };
      },
      resetSignupData: () => initialState,
    },
  });
  
  export const { setUserId, setProfile, addUserEducation, setUserWorkExperience, resetSignupData } = signupSlice.actions;
  
  export default signupSlice.reducer;



