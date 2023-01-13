import React from "react";
import './Footer.scss'


class Footer extends React.Component {

    render() {

        return (

            <footer className="app-footer">
                <div className="footer-container">
                    <ul className="footer-link-list">
                        <li className="footer-link-item">
                            App built by Rachel Hovell 
                        </li>
                        <li className="footer-link-item">
                            Information and images courtesy of <a href="https://dog.ceo/dog-api/documentation" className="footer-link" title="Dog API">Dog API</a>
                        </li>
                    </ul>
                </div>
            </footer>

        );
    }
}

export default Footer;