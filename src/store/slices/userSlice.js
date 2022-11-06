import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    displayName: '',
    email: '',
    uid: '',
    status: 'loading',
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
            state.status = 'idle';
        },
        unset: (state) => {
            state.displayName = '';
            state.email = '';
            state.uid = '';
            state.status = 'idle';
        },
    },
});

export const { set, unset } = userSlice.actions

export default userSlice.reducer;