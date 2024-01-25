import{ createSlice } from '@reduxjs/toolkit';

export const timerSlice = createSlice({
    name: 'counter',
    initialState: {
        break: 5,
        session: 25,
        status: 0,
        timeRemaining: 25,
        timeRemainingStr: '25:00',
        sessionStatus: 1,
    },
    reducers: {
        toggleTimer: (state) => {
            state.status = (state.status === 1 ? 0 : 1);
        },
        toggleSession: (state) => {
            state.sessionStatus = (state.sessionStatus === 1 ? 0 : 1)   
        },
        updateTimer: (state,action) => {
            state.timeRemaining = action.payload.timeIn;
            state.timeRemainingStr = action.payload.timeStrIn;
        },
        setBreak: (state,action) => {
            state.break = action.payload;
        },
        setSession: (state,action) => {
            state.session = action.payload;
        },
        reset: (state) => {
            state.break = 5;
            state.session = 25;
            state.status= 0;
            state.sessionStatus = 1;
            state.timeRemaining = 25;
            state.timeRemainingStr = '25:00';
        },

    },
})

export const {toggleTimer, toggleSession,updateTimer, setSession, setBreak,reset} = timerSlice.actions;

export default timerSlice.reducer;