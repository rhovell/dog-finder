import React from "react";
import './Userpage.scss'
import FavouriteContainer from '../DogFinder/Displays/FavouriteContainer.js'
import { ReactComponent as DogPaw } from '../DogFinder/Displays/assets/dog-paw.svg'
import { Link } from "react-router-dom";
import ScrollUpButton from '../ScrollUpButton.js';

class Userpage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
        };
        this.handleFavouriteToggle = this.handleFavouriteToggle.bind(this);

    }

    shouldComponentUpdate(nextProps){
        if (this.props.favouriteImages !== nextProps.favouriteImages || this.props.showScrollBtn !== nextProps.showScrollBtn){
            return true
        } else {
            return false
        };
    }

    handleFavouriteToggle(i, image, imageTitle, id, isFave) {
        let imgItem = {
            id: id,
            title: imageTitle,
            url: image,
            fave: false
        }
        this.props.addFavouriteImage(imgItem)
    }


    render() {
        const favouriteImages = this.props.favouriteImages;
        const sortedImages = favouriteImages.sort((a, b) => a.id > b.id ? 1 : -1)
        const handleFavouriteToggle = this.handleFavouriteToggle;
        const showScrollBtn = this.props.showScrollBtn
        const scrollTop = this.props.scrollTop

        return (

            <div className="userpage">
                <div className="favourite-images">
                    {favouriteImages.length === 0 ? 
                        <div className="no-favourites">
                            <h3>Sorry! There's no dogs here! Why not try adding some to your favourites collection?</h3>
                            <Link className="nav-link" to={'/'}>Find more dogs!</Link>
                        </div>
                        :
                        <>
                            {
                                sortedImages.map((image, i) => (
                                    <div className="dog-image" key={'dog' + i}>
                                        <p>{image.title[0].toUpperCase() + image.title.slice(1)}</p>
                                        <div className='image-container'>
                                            <FavouriteContainer 
                                            imageTitle={image.title} 
                                            favouriteImages={favouriteImages} 
                                            image={image.url} 
                                            id={image.id} 
                                            isFave={image.fave}
                                            handleFavouriteToggle={handleFavouriteToggle}
                                            />
                                        </div>
                                        <DogPaw></DogPaw>
                                    </div>
                                ))
                            }
                        </>
                        }
                </div>
                {showScrollBtn ? <ScrollUpButton scrollTop={scrollTop}></ScrollUpButton> : <></>}
            </div>

        );
    }
}

export default Userpage;