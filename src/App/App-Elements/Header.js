import React from "react";
import './Header.scss'

class Header extends React.Component {


    render() {
        const maxImages = this.props.maxImages
        const setNumber = this.props.setNumber
        return (

            <header className="App-header">
                <h1>Dog Finder</h1>
            </header>

        );
    }
}

export default Header;