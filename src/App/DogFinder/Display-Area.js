import BreedSelector from './Form-items/Breed-Selector.js' 
import React from "react";
import './results-area.scss'
import FavouriteContainer from './FavouriteContainer.js'
import { ReactComponent as DogPaw } from './dog-paw.svg'

class DisplayArea extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            viewMode: "column"
        };
        this.handleFavouriteToggle = this.handleFavouriteToggle.bind(this);

    }
    componentDidMount() {
        // console.warn('this.props', this.props);
    }
    componentDidUpdate(prevProps) {
        if (prevProps.favouriteImages != this.props.favouriteImages){
            console.warn('this.props', this.props.favouriteImages);
            
        }
        
    }

    handleFavouriteToggle(i, image, imageTitle){
        console.warn('i, image, imageTitle', i, image, imageTitle);
        let imgItem = {
            id: imageTitle+i,
            title: imageTitle,
            url: image,
            fave: true
        }
        console.warn('selectedImage', imgItem);
        this.props.addFavouriteImage(imgItem)
        
    }



    render() {
        const BreedsAreLoaded = this.props.BreedsAreLoaded;
        const favouriteImages = this.props.favouriteImages;
        const selectedBreed = this.props.selectedBreed;
        const imageList = this.props.imageList;
        const selectedSubBreed = this.props.selectedSubBreed ? this.props.selectedSubBreed : '';
        const imageTitle = this.props.selectedSubBreed != '' ? selectedBreed + ', ' + selectedSubBreed : selectedBreed;
        const handleFavouriteToggle = this.handleFavouriteToggle;

        return (
            <div className="results-area">
                <div className="image-results">
                    {
                        imageList.map((image, i) => (
                            <div key = {'dog' + i}>
                                <div className='image-container' >
                                    <FavouriteContainer imageTitle={imageTitle} favouriteImages={favouriteImages} image={image} i={i} id={selectedBreed+i} handleFavouriteToggle={handleFavouriteToggle}></FavouriteContainer>
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
