import React from "react";
import './Header.scss'
import AppMenu from '../Menu/App-Menu.js'
import { Outlet, Link } from "react-router-dom";


class Header extends React.Component {


    render() {
        const userIsActive = this.props.userIsActive;

        return (
            <>
            <header className="App-header">
                <div className="title-container">
                    <h1>Dog Finder</h1>
                </div>
                {userIsActive ? 
                    <AppMenu></AppMenu>
                : <></>
                }
            </header>
                <Outlet />
                </>

        );
    }
}

export default Header;