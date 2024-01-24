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
            Break Length
          </div>
          <div id="break-buttons">
            <div id="break-decrement" className="button">
              <FontAwesomeIcon icon={faArrowDown}/>
            </div>
            <div className="number">
             {breakLength}
            </div>
            <div id="break-increment" className="button">
              <FontAwesomeIcon icon={faArrowUp}/>
            </div>
          </div>
        </div>
        <div id="session">
          <div id="session-label">
            Session Length
          </div>
          <div id="session-buttons">
            <div id="session-decrement" className="button">
            <FontAwesomeIcon icon={faArrowDown}/>
            </div>
            <div className="number">
              {sessionLength}
            </div>
            <div id="session-increment" className="button">
              <FontAwesomeIcon icon={faArrowUp}/>
            </div>
          </div>
        </div>
      </div>
      <div id="session-view">
        <h2 id="timer-label">Session</h2>
        <div id="time-left">
          <div className="number">
            25:00
          </div>
        </div>
      </div>
      <div id="timer-buttons">
        <div id="start_stop" className="button">
          <FontAwesomeIcon icon={faPlay}/><FontAwesomeIcon icon={faPause}/>
        </div>
        <div id="reset" className="button">
        <FontAwesomeIcon icon={faRotateLeft}/>
        </div>
      </div>
    </div>
  );
}

export default App;
