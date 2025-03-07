import React from 'react';
import './navigateTopButton.css';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function NavigateTopButton() {
    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <button className="navigate-top-button" onClick={handleScrollToTop}>
            <FontAwesomeIcon icon={faArrowUp} className="icon" />
        </button>
    );
}

export default NavigateTopButton;