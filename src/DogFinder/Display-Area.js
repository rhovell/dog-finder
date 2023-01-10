import './DogFinder.scss';
import BreedSelector from './Form-items/Breed-Selector.js' 
import React from "react";


class DisplayArea extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

        };

    }
    
    componentDidUpdate(prevProps) {
        // if (prevProps.text !== this.props.text) {
        //     this.updateAndNotify();
        //     console.warn(this.props)
        // }
    }



    render() {
        const BreedsAreLoaded = this.props.BreedsAreLoaded;
        const selectedBreed = this.props.selectedBreed;
        const imageList = this.props.imageList;
        const selectedSubBreed = this.props.selectedSubBreed ? this.props.selectedSubBreed : '';

        

        if (!BreedsAreLoaded) return <div className="loading-area">Loading...</div>

        return (
            <div className="results-area">
                <div className="image-results">
                    {
                        imageList.map((image, i) => (
                            <img key={'dog' + i}  src={image}></img>
                        ))
                    }
                </div>
        </div> 
        );
    }
}

export default DisplayArea;
