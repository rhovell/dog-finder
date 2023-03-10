import CookieConsent, { getCookieConsentValue } from "react-cookie-consent";
import React from "react";
import './cookieBar.scss'

class CookieBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            
        }
        this.handleCookies = this.handleCookies.bind(this);
    }

    handleCookies(){
        let cookieAccepted = getCookieConsentValue();
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
                flipButtons
                buttonText='Yes please!'
                declineButtonText='No Thanks'
                overlay={true}
                enableDeclineButton
                buttonWrapperClasses="flex-space"
                buttonStyle={{
                    backgroundColor: '#059700',
                    color: 'white',
                    fontWeight: "bolder",
                    borderRadius: '6px',
                    fontSize: '24px',
                    padding: '7px 12px'
                }}
                declineButtonStyle={{
                    backgroundColor: '#fd0101',
                    color: 'black',
                    fontWeight: "bolder",
                    borderRadius: '6px',
                    fontSize: '24px',
                    padding: '7px 12px'
                }}
                style={{
                    display: "flex"
                }}
                onOverlayClick={() => {
                    handleCookies()
                }}
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