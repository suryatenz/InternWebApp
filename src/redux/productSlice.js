import { createSlice } from '@reduxjs/toolkit';

export const productSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        count:0,
        verificationId:null,
        userId:null,
    },
    reducers: {
        addToCart: (state, action) => {
            state.products.push(action.payload);
        },
        updateCount: (state, action) => {
            state.count = action.payload;
        },
        updateVerification: (state, action) => {
            state.verificationId = action.payload;  
        },
        updateUserId: (state, action) => {
            state.userId = action.payload; 
        }
    },
});

export const { addToCart , updateCount,updateVerification,updateUserId } = productSlice.actions;
export default productSlice.reducer;