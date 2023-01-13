import CookieConsent, { Cookies, getCookieConsentValue, resetCookieConsentValue } from "react-cookie-consent";
import React from "react";


class CookieBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            
        }
        this.handleCookies = this.handleCookies.bind(this);
    }

    handleCookies(){
        console.warn(getCookieConsentValue())
        // const updateCookies = this.props.updateCookies();
        let cookieAccepted = getCookieConsentValue();
        // if (cookieAccepted === 'true'){
        //     console.warn('cookies accepted');
        // } else {
        //     console.warn('cookies rejected');
        // }
        this.props.updateCookies(cookieAccepted)
    }

    render() {
        const handleCookies = this.handleCookies;

        return (

            <div className="full-screen-modal">
                <CookieConsent
                onAccept={() => {
                    handleCookies()
                }}
                enableDeclineButton
                onDecline={() => {
                    handleCookies();
                }}>
                This website uses cookies to enhance user experince. (That means you get lots of extra features!)
                </CookieConsent>
            </div>

        );
    }
}

export default CookieBar;