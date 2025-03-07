import React from "react";
import './selectorTime.css';

function SelectorTime({ time, setTime }) {
    return (
        <div className="selector-time">
            <button
                className={`time-button ${time === 'short' ? 'selected' : ''}`}
                onClick={() => setTime('short')}
            >
                4 Weeks
            </button>
            <button
                className={`time-button ${time === 'medium' ? 'selected' : ''}`}
                onClick={() => setTime('medium')}
            >
                6 Months
            </button>
            <button
                className={`time-button ${time === 'long' ? 'selected' : ''}`}
                onClick={() => setTime('long')}
            >
                1 Year
            </button>
        </div>
    );
}

export default SelectorTime;