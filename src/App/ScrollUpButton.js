import React from "react";
import { ReactComponent as Up } from './up.svg'
import './scrollBtn.scss'

class ScrollUpButton extends React.Component {


    render() {
        const scrollTop = this.props.scrollTop 
        return (
            <div className="page-overlay">
                <button className="scrollToTop" onClick={scrollTop}> 
                    <Up></Up>
                </button>
            </div>

        );
    }
}

export default ScrollUpButton;