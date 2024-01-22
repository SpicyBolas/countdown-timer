import logo from './logo.svg';
import './App.css';
import {useSelector, useDispatch} from 'react-redux';
import {thing1,thing2} from './timerSlice.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown, faPlay, faPause, faRotateLeft } from '@fortawesome/free-solid-svg-icons';

function App() {
  const breakLength = useSelector((state)=>state.timer.break);
  const sessionLength = useSelector((state)=>state.timer.session);
  return (
    <div className="App">
      <h1 id="title">25 + 5 Clock</h1>
      <div id="lengths">
        <div id="break">
          <div id="break-label">

          </div>
          <div id="break-buttons">
            <div id="break-decrement">
              <FontAwesomeIcon icon={faArrowDown}/>
            </div>
            {breakLength}
            <div id="break-increment">
              <FontAwesomeIcon icon={faArrowUp}/>
            </div>
          </div>
        </div>
        <div id="session">
          <div id="session-label">

          </div>
          <div id="session-buttons">
            <div id="session-decrement">
            <FontAwesomeIcon icon={faArrowDown}/>
            </div>
            {sessionLength}
            <div id="session-increment">
              <FontAwesomeIcon icon={faArrowUp}/>
            </div>
          </div>
        </div>
      </div>
      <div id="session-view">
        <h2 id="timer-label">Session</h2>
        <div id="time-left">
          25:00
        </div>
      </div>
      <div id="timer-buttons">
        <div id="start_stop">
          <FontAwesomeIcon icon={faPlay}/><FontAwesomeIcon icon={faPause}/>
        </div>
        <div id="reset">
        <FontAwesomeIcon icon={faRotateLeft}/>
        </div>
      </div>
    </div>
  );
}

export default App;
