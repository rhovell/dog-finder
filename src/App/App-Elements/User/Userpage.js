import React from "react";

class Userpage extends React.Component {


    render() {
        const userIsActive = this.props.userIsActive;

        return (

            <div className="userpage">
                <div className="favourite-images"></div>
                <div className="favourite-searches"></div>
                <div className="favourite-breeds"></div>
            </div>

        );
    }
}

export default Userpage;