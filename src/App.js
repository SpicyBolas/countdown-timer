import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {toggleTimer,toggleSession,updateTimer,setSession,setBreak,reset} from './timerSlice.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown, faPlay, faPause, faRotateLeft } from '@fortawesome/free-solid-svg-icons';

import sound from './Audio/Alarm-clock-ringing-sound-effect.mp3';

function App() {
  //Assign dispatch function for actions
  const dispatch = useDispatch();
  //Assign variables for states
  var breakLength = useSelector((state)=>state.timer.break);
  var sessionLength = useSelector((state)=>state.timer.session);
  var onStatus = useSelector((state)=>state.timer.status);
  var timeRemaining  = useSelector((state)=>state.timer.timeRemaining);
  var timeRemainingStr  = useSelector((state)=>state.timer.timeRemainingStr);
  var sessionStatus  = useSelector((state)=>state.timer.sessionStatus);
  
  //Define the audio clip
  var audio = new Audio(sound);
 
 //Define function which takes in the numeric time remaining and converts to a string 
  function timeToStr(timeIn) {
    //Declare the string variables
    let minsStr,secsStr;

    //Separate time in into rounded minutes and seconds
    let mins = Math.floor(timeIn);
    let secs = Math.round((timeIn - mins)*60);
    
    //Append additional variable if mins is single digit, 
    //otherwise convert to string as is
    if(mins<10){
      minsStr = '0' + mins.toString();
    }
    else {
      minsStr = mins.toString();
    }
    //Append additional variable if secs is single digit, 
    //otherwise convert to string as is
    if(secs<10){
      secsStr = '0' + secs.toString();
    }
    else {
      secsStr = secs.toString();
    }
    //Concatenate the minutes and seconds into final time string
    let strOut = minsStr + ':' + secsStr;
    //return the time string
    return strOut;
  }
  //Define a function to swap the timer status
  function playPause(e) {
    dispatch(toggleTimer());
  }

  //Define a function to handle click increment changes for break and session
  function handleBreakDecrement(e) {
    let breakIn = Math.max(0,Math.min(breakLength-1,60));
    dispatch(setBreak(breakIn));

    if(sessionStatus===0){
      let timeRemainingTemp = Math.max(0,Math.min(timeRemaining - 1,60));
      let timeRemainingStrTemp = timeToStr(timeRemainingTemp);
      dispatch(updateTimer({timeIn: timeRemainingTemp,timeStrIn: timeRemainingStrTemp}));
    }
  } 

  function handleBreakIncrement(e) {
    let breakIn = Math.max(0,Math.min(breakLength+1,60));
    dispatch(setBreak(breakIn));

    if(sessionStatus===0){
      let timeRemainingTemp = Math.max(0,Math.min(timeRemaining + 1,60));
      let timeRemainingStrTemp = timeToStr(timeRemainingTemp);
      dispatch(updateTimer({timeIn: timeRemainingTemp,timeStrIn: timeRemainingStrTemp}));
    }
  } 

  //Define a function to handle click increment changes for break and session
  function handleSessionDecrement(e) {
    let sessionIn = Math.max(0,Math.min(sessionLength-1,60));
    dispatch(setSession(sessionIn));

    if(sessionStatus===1){
      let timeRemainingTemp = Math.max(0,Math.min(timeRemaining - 1,60));;
      let timeRemainingStrTemp = timeToStr(timeRemainingTemp);
      dispatch(updateTimer({timeIn: timeRemainingTemp,timeStrIn: timeRemainingStrTemp}));
    }

  } 

  function handleSessionIncrement(e) {
    let sessionIn = Math.max(0,Math.min(sessionLength+1,60));
    dispatch(setSession(sessionIn));

    if(sessionStatus===1){
      let timeRemainingTemp = Math.max(0,Math.min(timeRemaining + 1,60));
      let timeRemainingStrTemp = timeToStr(timeRemainingTemp);
      dispatch(updateTimer({timeIn: timeRemainingTemp,timeStrIn: timeRemainingStrTemp}));
    }
  } 

  //Function to rest the clock and puase and reload the audio
  function handleReset(e) {
    dispatch(reset());
    audio.pause();
    audio.load();
  }

  //Use react hook 'useEffect' to update the timer each second
  //when the timer status is on (i.e. 1) 
  useEffect(() => {
      let timeRemainingTemp, timeRemainingStrTemp;
      //declare interval every 1000ms
      var interval = setInterval(()=>{
        //subtract one second off the remaining time if current timer status is on
        if(onStatus === 1) {
          //Subtract 1 second
          timeRemainingTemp = Math.max(0,(timeRemaining*60 - 1)/60);
          
          //Convert to string
          timeRemainingStrTemp = timeToStr(timeRemainingTemp);
          
          //Update the time remaining and string equivalent states
          dispatch(updateTimer({timeIn: timeRemainingTemp,timeStrIn: timeRemainingStrTemp}));
        }
        //return null if timer status is off
        else {
          return null;
        }

        if(timeRemainingTemp===0){
          dispatch(toggleSession());
          
          if(sessionStatus===1){
            timeRemainingTemp = breakLength;
            timeRemainingStrTemp = timeToStr(timeRemainingTemp);
  
            dispatch(updateTimer({timeIn: timeRemainingTemp,timeStrIn: timeRemainingStrTemp}));
          }
          else{
            timeRemainingTemp = sessionLength;
            timeRemainingStrTemp = timeToStr(timeRemainingTemp);
  
            dispatch(updateTimer({timeIn: timeRemainingTemp,timeStrIn: timeRemainingStrTemp}));
          }
        }
      },1000);

      //clear interval to prevent memory leaks
      return () => clearInterval(interval);
  },[onStatus,timeRemaining]) //use the hook on state changes for timer status or time remaining

  //Define hook for alarm sound at change of session/break states
  useEffect(()=> {
    //Only play if the clock is 'on'
    if(onStatus===1){
      audio.play();
      //play sound for 2 seconds then pause and reload
      setTimeout(()=> {
        audio.pause();
        audio.load();
      },2000);
  }
  },[sessionStatus])

  return (
    <div className="App">
      <h1 id="title">25 + 5 Clock</h1>
      <div id="lengths">
        <div id="break">
          <div id="break-label">
            Break Length
          </div>
          <div id="break-buttons">
            <div id="break-decrement" className="button" onClick={handleBreakDecrement}>
              <FontAwesomeIcon icon={faArrowDown}/>
            </div>
            <div className="number">
             {breakLength}
            </div>
            <div id="break-increment" className="button" onClick={handleBreakIncrement}>
              <FontAwesomeIcon icon={faArrowUp}/>
            </div>
          </div>
        </div>
        <div id="session">
          <div id="session-label">
            Session Length
          </div>
          <div id="session-buttons">
            <div id="session-decrement" className="button" onClick={handleSessionDecrement}>
            <FontAwesomeIcon icon={faArrowDown}/>
            </div>
            <div className="number">
              {sessionLength}
            </div>
            <div id="session-increment" className="button" onClick={handleSessionIncrement}>
              <FontAwesomeIcon icon={faArrowUp}/>
            </div>
          </div>
        </div>
      </div>
      <div id="session-view">
        {sessionStatus===1 
          ? <h2 id="timer-label">Session</h2>
          : <h2 id="timer-label">Break</h2>
        }
        <div id="time-left">
          <div className="number">
            {timeRemainingStr}
          </div>
        </div>
      </div>
      <div id="timer-buttons">
        <div id="start_stop" className="button" onClick={playPause}>
          <FontAwesomeIcon icon={faPlay}/><FontAwesomeIcon icon={faPause}/>
        </div>
        <div id="reset" className="button" onClick={handleReset}>
          <FontAwesomeIcon icon={faRotateLeft}/>
        </div>
      </div>
    </div>
  );
}

export default App;
