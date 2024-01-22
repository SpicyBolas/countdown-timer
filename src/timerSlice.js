import{ createSlice } from '@reduxjs/toolkit';

export const timerSlice = createSlice({
    name: 'counter',
    initialState: {
        break: 5,
        session: 25,
    },
    reducers: {
        thing1: (state) => {
            state.value += 1
        },
        thing2: (state) => {
            state.value -= 1
        },
    },
})

export const {thing1, thing2} = timerSlice.actions;

export default timerSlice.reducer;