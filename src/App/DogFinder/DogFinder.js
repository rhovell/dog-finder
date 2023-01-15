import './DogFinder.scss';
import './Form-items/form.scss';
import BreedSelector from './Form-items/Breed-Selector.js' 
import React, { useEffect, useState } from "react";
import SubbreedSelector from './Form-items/Subbreed-Selector';
import AmountSelector from './Form-items/Amount-Selector';
import Submit from './Form-items/Submit';
import DisplayArea from './Display-Area';
import LoadingIcon from '../Loading-Icon/LoadingIcon.js'


class DogFinder extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            howToActive: false
        };
        this.tellMe = this.tellMe.bind(this)

    }
    
    componentDidUpdate(prevProps) {
        // if (prevProps.text !== this.props.text) {
        //     this.updateAndNotify();
        //     console.warn(this.props)
        // }
    }

    tellMe(e){
        e.preventDefault()
        this.setState(prevState => ({
            howToActive: !prevState.howToActive
        }))
    }


    render() {
        const BreedsAreLoaded = this.props.BreedsAreLoaded;
        const breeds = this.props.breeds;
        const selectBreed = this.props.selectBreed;
        const selectedBreed = this.props.selectedBreed;
        const hasSubBreed = this.props.hasSubBreed;
        const subBreeds = this.props.subBreeds;
        const SubBreadsAreLoaded = this.props.SubBreadsAreLoaded;
        const selectSubBreed = this.props.selectSubBreed;
        const maxImages = this.props.maxImages;
        const viewMode = this.props.viewMode;
        const displayImages = this.props.displayImages;
        const setNumber = this.props.setNumber;
        const imageList = this.props.imageList;
        const selectedSubBreed = this.props.selectedSubBreed ? this.props.selectedSubBreed : '';
        const tellMe = this.tellMe;
        const howToActive = this.state.howToActive;
        const isLoading = this.props.isLoading;
        const favouriteImages = this.props.favouriteImages;
        const addFavouriteImage = this.props.addFavouriteImage;

        

        // if (!BreedsAreLoaded) return <div className="loading-area">Loading...</div>

        return (
            <div className="dog-finder-form">
                {isLoading ? <LoadingIcon></LoadingIcon>
                    :  
                    <>
                <div className='intro-area'>
                    <p className='intro'>Welcome to Dog Finder! Here you can view images of all of your favourite dogs by breed and subreed! </p>
                    <button className='tell-me-how' id='tellMe' onClick={(e) => tellMe(e)}>Tell Me How!</button>
                    {howToActive ? 
                    <div className="pop-up"><p className='how-to'>Simply choose your breed from the dropdown below, if your choosen breed has sub-breeds, another dropdown will appear for you to select. Sub-breed or not - select how many images you'd like to view and hit 'View Now'! <br></br>Hey Presto! More dogs than you can shake a stick at!</p></div>
                    :
                    <></>}
                    
                </div>

                    <div className="app-area">
                        
                            <form className='dog-finder' onSubmit={(e) => displayImages(e)}>

                                <BreedSelector selectedBreed={selectedBreed} selectedSubBreed={selectedSubBreed} breeds={breeds} selectBreed={selectBreed}></BreedSelector>

                                {hasSubBreed ? <SubbreedSelector subBreeds={subBreeds} selectSubBreed={selectSubBreed}></SubbreedSelector>
                                :
                                <></>}
                                
                                {SubBreadsAreLoaded ? <AmountSelector maxImages={maxImages} setNumber={setNumber}></AmountSelector>
                                : <></>}

                                {SubBreadsAreLoaded ? <Submit></Submit>
                                : <></>}
                                
                            </form>

                        
                        <DisplayArea BreedsAreLoaded={BreedsAreLoaded}
                            selectedBreed={selectedBreed}
                            imageList={imageList}
                            selectedSubBreed={selectedSubBreed}
                            favouriteImages={favouriteImages}
                            addFavouriteImage={addFavouriteImage}>
                        </DisplayArea> 
                        
                    </div>
                    </>
                } 
            </div>
        );
    }
}

export default DogFinder;
