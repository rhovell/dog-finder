import React from "react";
import {ReactComponent as HeartLogo } from './heart.svg'
import {ReactComponent as HeartLogoFilled } from './filled-heart.svg'
import './images.scss'


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
            console.warn('fave exists');
            this.setState({
                active: true
            })
        } else {
            console.warn('fave doesnt exist');
            this.setState({
                active: false
            })
        }
    }

    shouldComponentUpdate(nextState) {
        if (this.props.favouriteImages !== nextState.favouriteImages) {
            console.warn('faves changed');
            return true
        } else {
            console.warn('faves same');
            return false
        };
    }

    handleClick(e, i, image, imageTitle, id, isFave){
        this.setState({
            active: !isFave
        })
        console.warn('FavouriteContainer', i, image, imageTitle, id, isFave);
        e.preventDefault();
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