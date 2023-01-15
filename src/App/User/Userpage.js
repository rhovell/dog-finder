import React from "react";
import './Userpage.scss'
import FavouriteContainer from '../DogFinder/FavouriteContainer.js'
import { ReactComponent as DogPaw } from '../DogFinder/dog-paw.svg'


class Userpage extends React.Component {

    render() {
        const favouriteImages = this.props.favouriteImages;
        const sortedImages = favouriteImages.sort((a, b) => a.id > b.id ? 1 : -1)

        return (

            <div className="userpage">
                <div className="favourite-images">
                    {
                        sortedImages.map((image, i) => (
                            <div className="favourite-container" key={'dog' + i}>
                                <p>{image.title[0].toUpperCase() + image.title.slice(1)}</p>
                                <div className='image-container' >
                                    <img alt={image.title} className="search-result-image" title={image.title} src={image.url} id={image.id}></img>
                                </div>
                                <DogPaw></DogPaw>
                            </div>
                        ))
                    }
                </div>
            </div>

        );
    }
}

export default Userpage;