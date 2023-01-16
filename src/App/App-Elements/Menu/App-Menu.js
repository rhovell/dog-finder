import React from "react";
import { Link } from "react-router-dom";
import './Menu.scss'

class AppMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false
        }
        this.toggleMenuState = this.toggleMenuState.bind(this)
        
    }

    toggleMenuState(e){
        
        this.setState({
            open: !this.state.open
        })

    }

    render() {
        const toggleMenuState = this.toggleMenuState;
        const open = this.state.open;

        return (

            <>
            <div className="nav-container">
                <div className="menu-toggle-button" onClick={toggleMenuState}>
                    <svg style={{ width: '3em'}} id="Layer_3" data-name="Layer 3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><title>Menu</title><path d="M97.092,36.078H30.908a2.111,2.111,0,0,0,0,4.222H97.092a2.111,2.111,0,0,0,0-4.222Z" /><path d="M97.092,61.889H30.908a2.111,2.111,0,0,0,0,4.222H97.092a2.111,2.111,0,0,0,0-4.222Z" /><path d="M97.092,87.7H30.908a2.111,2.111,0,0,0,0,4.222H97.092a2.111,2.111,0,0,0,0-4.222Z" /></svg>
                </div>
                
                
            </div>
                {open ? 
                    <div className="user-nav-container">
                        <nav className="user-navigation">
                            <div className="menu-closer" onClick={toggleMenuState}>
                                <svg fill="#FFFFFF" width="42px" viewBox="-8.5 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                    <title>close</title>
                                    <path d="M8.48 16l5.84-5.84c0.32-0.32 0.32-0.84 0-1.2-0.32-0.32-0.84-0.32-1.2 0l-5.84 5.84-5.84-5.84c-0.32-0.32-0.84-0.32-1.2 0-0.32 0.32-0.32 0.84 0 1.2l5.84 5.84-5.84 5.84c-0.32 0.32-0.32 0.84 0 1.2 0.16 0.16 0.4 0.24 0.6 0.24s0.44-0.080 0.6-0.24l5.84-5.84 5.84 5.84c0.16 0.16 0.36 0.24 0.6 0.24 0.2 0 0.44-0.080 0.6-0.24 0.32-0.32 0.32-0.84 0-1.2l-5.84-5.84z"></path>
                                </svg>

                            </div>
                            <ul className="nav-list">
                                <li className="nav-item">
                                    <Link className="nav-link" to={'/'} onClick={toggleMenuState}>Dog Finder</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to={'/favourites'} onClick={toggleMenuState}>My Favourites</Link>
                                </li>
                            </ul>
                        </nav>

                    </div>
                : 
                <></>
                }
                </>
        );
    }
}

export default AppMenu;