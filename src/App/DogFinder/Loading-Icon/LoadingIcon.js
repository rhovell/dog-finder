import React from "react";
import loader from './loading.png'
import './loading-icon.scss'

function LoadingIcon(props) {
        return (
  
            <div className="loading-icon">
                <div className="center">
                    <p>Fetching...</p>
                    <img alt="" src={loader} className="spin" style={{width:'55px',height:'55px'}}></img>
                </div>
            </div>

        );
}

export default LoadingIcon;