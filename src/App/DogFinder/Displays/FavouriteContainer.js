import React from "react";
import {ReactComponent as HeartLogo } from './assets/heart.svg'
import {ReactComponent as HeartLogoFilled } from './assets/filled-heart.svg'
import './styles/images.scss'


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
        } else {
            this.setState({
                active: false
            })
        }
    }

    shouldComponentUpdate(nextState) {
        if (this.props.favouriteImages !== nextState.favouriteImages) {
            return true
        } else {
            return false
        };
    }

    handleClick(e, i, image, imageTitle, id, isFave){
        e.preventDefault();
        this.setState({
            active: !isFave
        })
        this.props.handleFavouriteToggle(i, image, imageTitle, id, isFave)
    }


    render() {
        const handleClick = this.handleClick;
        const i = this.props.i ? this.props.i : '';
        const id = this.props.id ? this.props.id : i;
        const image = this.props.image;
        const imageTitle = this.props.imageTitle;
        const isFave = this.props.fave;
        const active = this.state.active;

        return (
            <div className="image-holder" onClick={(e) => { handleClick(e, i, image, imageTitle, id, isFave) }}>
                <div className="favourites-container" >
                    {active ? 
                        <HeartLogoFilled className="favourite-image" width="40px"></HeartLogoFilled> 
                    :
                        <HeartLogo className="favourite-image" width="40px"> </HeartLogo> 
                    }
                </div>
                <img alt={imageTitle} className="search-result-image" title={imageTitle} src={image} id={id}></img>
            </div>
        );
    }
}

export default FavouriteContainer;