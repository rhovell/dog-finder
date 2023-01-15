import React from "react";
import {ReactComponent as HeartLogo } from './heart.svg'
import {ReactComponent as HeartLogoFilled } from './filled-heart.svg'


class FavouriteContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            active: false
        };
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount(){
        if (this.props.favouriteImages.some(item => this.props.id === item.id) === true) {
            this.setState({
                active: true
            })
        }
    }

    handleClick(e, i, image, imageTitle){
        e.preventDefault();
        this.setState({
            active: !this.state.active
        })
        this.props.handleFavouriteToggle(i, image, imageTitle)
    }


    render() {
        const handleClick = this.handleClick;
        const i = this.props.i;
        const image = this.props.image;
        const imageTitle = this.props.imageTitle;
        const active = this.state.active;

        return (
            <>
                <div className="favourites-container" onClick={(e) => { handleClick(e, i, image, imageTitle) }}>
                    {active ? 
                        <HeartLogoFilled className="favourite-image" width="40px"></HeartLogoFilled> 
                    :
                        <HeartLogo className="favourite-image" width="40px"> </HeartLogo> 
                    }
                </div>
                <img alt={imageTitle} className="search-result-image" title={imageTitle} src={image} id={imageTitle + i}></img>
            </>
        );
    }
}

export default FavouriteContainer;