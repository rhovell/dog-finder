import BreedSelector from './Form-items/Breed-Selector.js' 
import React from "react";
import './results-area.scss'


class DisplayArea extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            viewMode: "column"
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
        const imageTitle = this.props.selectedSubBreed != '' ? selectedBreed + ', ' + selectedSubBreed : selectedBreed;

        return (
            <div className="results-area">
                <div className="image-results">
                    {
                        imageList.map((image, i) => (
                            <div className='image-container' key={'dog' + i}>
                                <img alt={imageTitle} title={imageTitle} src={image}></img>
                            </div>
                        ))
                    }
                </div>
        </div> 
        );
    }
}

export default DisplayArea;
