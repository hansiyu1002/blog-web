import { createSlice } from '@reduxjs/toolkit';
import api from '../services/api';

const initialState = {
    value: 0,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: (builder) => {
        builder.addMatcher(api.endpoints.signupUser.matchFulfilled, (state, { payload }) => {
            state.user = payload.user;
            state.token = payload.token;
        });
        builder.addMatcher(api.endpoints.loginUser.matchFulfilled, (state, { payload }) => {
            state.user = payload.user;
            state.token = payload.token;
        });
        builder.addMatcher(api.endpoints.logoutUser.matchFulfilled, (state) => {
            delete state.user;
            delete state.token;
        });
    }
})

export default userSlice.reducer