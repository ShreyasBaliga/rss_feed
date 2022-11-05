import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    displayName: '',
    email: '',
    uid: '',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        set: (state, action) => {
            const { displayName, email, uid } = action.payload;
            state.displayName = displayName;
            state.email = email;
            state.uid = uid;
        },
        unset: (state) => {
            state.displayName = '';
            state.email = '';
            state.uid = '';
        },
    },
});

export const { set, unset } = userSlice.actions

export default userSlice.reducer;