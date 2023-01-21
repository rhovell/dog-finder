import React from "react";
import { ReactComponent as Up } from './up.svg'
import './scrollBtn.scss'

function ScrollUpButton(props) {

    const scrollTop = props.scrollTop 
    return (
        <div className="page-overlay">
            <button className="scrollToTop" onClick={scrollTop}> 
                <Up></Up>
            </button>
        </div>

    );
}

export default ScrollUpButton;