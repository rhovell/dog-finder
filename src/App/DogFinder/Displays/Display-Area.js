import React from "react";
import './styles/results-area.scss'
import FavouriteContainer from './FavouriteContainer.js'
import { ReactComponent as DogPaw } from './assets/dog-paw.svg'

class DisplayArea extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            viewMode: "column"
        };
        this.handleFavouriteToggle = this.handleFavouriteToggle.bind(this);

    }

    handleFavouriteToggle(i, image, imageTitle, isFave){
        let imgItem = {
            id: imageTitle+i,
            title: imageTitle,
            url: image,
            fave: isFave
        }
        this.props.addFavouriteImage(imgItem)
    }



    render() {
        const favouriteImages = this.props.favouriteImages;
        const selectedBreed = this.props.selectedBreed;
        const imageList = this.props.imageList;
        const selectedSubBreed = this.props.selectedSubBreed ? this.props.selectedSubBreed : '';
        const imageTitle = this.props.selectedSubBreed.length > 0 ? selectedBreed + ', ' + selectedSubBreed : selectedBreed;
        const handleFavouriteToggle = this.handleFavouriteToggle;
        const userIsActive = this.props.userIsActive;

        return (
            <div className="results-area" id="displayResults">
                <div className="image-results">
                    {
                        imageList.map((image, i) => (
                            <div className="grid-box" key = {'dog' + i}>
                                <div className='image-container' >
                                    {userIsActive ?
                                        <FavouriteContainer
                                            imageTitle={imageTitle}
                                            favouriteImages={favouriteImages}
                                            image={image}
                                            i={i}
                                            id={selectedBreed + i}
                                            isFave={false}
                                            handleFavouriteToggle={handleFavouriteToggle}
                                        />
                                    : <img alt={imageTitle} className="search-result-image" title={imageTitle} src={image} id={selectedBreed + i}></img>}
                                    
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

export default DisplayArea;
