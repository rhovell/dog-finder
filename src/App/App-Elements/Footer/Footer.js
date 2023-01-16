import React from "react";
import './Footer.scss'
import CookieConsent, { getCookieConsentValue } from "react-cookie-consent";


class Footer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }
        this.handleCookies = this.handleCookies.bind(this);
    }

    handleCookies() {
        let cookieAccepted = getCookieConsentValue();
        this.props.updateCookies(cookieAccepted)
    }

    render() {
        const handleCookies = this.handleCookies;
        const userIsActive = this.props.userIsActive;

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
                        {userIsActive ? <></> : 
                        <li className="reset-cookies footer-link-item">
                            Would you like to start saving your favourite images? Simply 
                            <CookieConsent 
                            visible="true" 
                            buttonStyle={{
                                backgroundColor: 'transparent',
                                color: 'white',
                                fontWeight: "bolder",
                                border: '0',
                                fontSize: '18px',
                                display: "inline-block"
                            }}
                            debug={true}
                            buttonWrapperClasses="inline-space"
                            overlay={false}
                            buttonText='Accept Cookies'
                            contentClasses='inline-cookies'
                            onAccept={() => {
                                handleCookies()
                            }}
                            >
                            </CookieConsent> to get started!
                        </li>}
                        
                    </ul>
                </div>
            </footer>

        );
    }
}

export default Footer;