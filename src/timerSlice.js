import{ createSlice } from '@reduxjs/toolkit';

export const timerSlice = createSlice({
    name: 'counter',
    initialState: {
        break: 5,
        session: 25,
        status: 0,
        timeRemaining: 25,
        timeRemainingStr: '25:00',
    },
    reducers: {
        toggleTimer: (state) => {
            state.status = (state.status === 1 ? 0 : 1);
        },
        updateTimer: (state,action) => {
            state.timeRemaining = action.payload.timeIn;
            state.timeRemainingStr = action.payload.timeStrIn;
        },
    },
})

export const {toggleTimer, updateTimer} = timerSlice.actions;

export default timerSlice.reducer;