import { createSlice } from '@reduxjs/toolkit';
import api from "../services/api";

const initialState = {
    value: 0,
}

export const blogSlice = createSlice({
    name: 'blog',
    initialState,
})

export default blogSlice.reducer