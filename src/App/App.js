import './App.scss';
import DogFinder from './DogFinder/DogFinder.js'
import React, { useEffect, useState } from "react";
import LoadingIcon from './Loading-Icon/LoadingIcon.js';
import Footer from './App-Elements/Footer.js';
import Header from './App-Elements/Header.js';


class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      breeds: [],
      BreedsAreLoaded: false,
      selectedBreed: [],
      hasSubBreed: false,
      SubBreadsAreLoaded: false,
      subBreeds: [],
      selectedSubBreed: [],
      images: [],
      maxImages: 0,
      viewMode: false,
      imagesToShow: 1,
      imageList: [],
      isLoading: true
    };
    this.selectBreed = this.selectBreed.bind(this);
    this.setSubBreeds = this.setSubBreeds.bind(this);
    // this.fetchSubBreeds = this.fetchSubBreeds.bind(this);
    // this.selectSubBreed = this.selectSubBreed.bind(this);
    this.fetchImages = this.fetchImages.bind(this);
    this.displayImages = this.displayImages.bind(this);
    this.setNumber = this.setNumber.bind(this);
    // this.fetchImagesAPI = this.fetchImagesAPI.bind(this);
  }

  componentDidMount() {
    fetch(
      "https://dog.ceo/api/breeds/list/all")
      .then((res) => res.json())
      .then((json) => {
        // console.warn(json)
        this.setState({
          breeds: json.message,
          BreedsAreLoaded: true,
          isLoading: false
        });
        // console.warn(this.state.breeds)
      }).catch((error) => {
        console.warn('error')
      })
  }

  componentDidUpdate(prevProps, prevState, snapshot){
    // console.warn('prevState', prevState.selectedBreed);
    if(this.state.selectedBreed != prevState.selectedBreed){
      // this.fetchSubBreeds()
    }
  }

  selectBreed(selectedBreed) {
    console.warn('selectBreed(event)', selectedBreed)
    // if (this.state.selectedBreed != []){
      this.setState({
        selectedBreed: [],
        hasSubBreed: false,
        SubBreadsAreLoaded: false,
        subBreeds: [],
        selectedSubBreed: [],
        images: [],
        maxImages: 0,
        viewMode: false,
        imagesToShow: 1,
        imageList: [],
        isLoading: true
      })
    // }
    selectedBreed = selectedBreed.toLowerCase();
    // console.warn('selectedBreed',selectedBreed)
    this.setState({
      selectedBreed: selectedBreed
    }, this.setSubBreeds) 

  }

  setSubBreeds(){
    const selectedBreed = this.state.selectedBreed;
    const subBreeds = this.state.breeds[selectedBreed] ? this.state.breeds[selectedBreed] : [];
    this.setState({
      subBreeds: subBreeds,
      SubBreadsAreLoaded: true
    }, this.fetchImages)
    if(subBreeds.length > 0){
      this.setState({
        hasSubBreed: true
      })
    }
    console.warn(subBreeds);
  }
    
  fetchImages(){
    // console.warn('fetchImages')
    const breed = this.state.selectedBreed;
    const hasSubBreed = this.state.hasSubBreed;
    const selectedSubBreed = this.state.selectedSubBreed ? this.state.selectedSubBreed : '';
    // const SubBreadsAreLoaded = this.state.SubBreadsAreLoaded;
    let breedOnly = 'https://dog.ceo/api/breed/' + breed + '/images';
    let subs = 'https://dog.ceo/api/breed/' + breed + '/' + selectedSubBreed + '/images';
    let urls = [];
    if (hasSubBreed && selectedSubBreed != ''){
      urls.push(breedOnly, subs);
      // console.warn('url', urls)
    } else {
      urls.push(breedOnly)
      // console.warn('url', urls)
    }

    for(var i = 0; i < urls.length; i++){
      this.fetchImagesAPI(urls[i])
    }
    
  }

  fetchImagesAPI(url){
    console.warn(url);
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        // console.warn(json)
        this.setState({
          images: json.message,
          maxImages: json.message.length,
          isLoading: false
        });
        // console.warn(this.state.images)
      }).catch((error) => {
        console.warn('fetchImagesAPI error', error)
      })
  }

  displayImages(event) {
    event.preventDefault();
    const imagesToShow = this.state.imagesToShow;
    this.setState({
      viewMode: true,
      isLoading: true
    })
    let newImages = this.state.images.filter((image,index) => index < imagesToShow)
      this.setState({
        imageList: newImages,
        isLoading: false
      })

  }

  setNumber(event){
    const maxImages = this.state.maxImages;
    if(event.target.value === 'All'){
      this.setState({
        imagesToShow: maxImages
      })

    } else {
      this.setState({
        imagesToShow: event.target.value
      })

    }
  }

    
  render(){
      
    // functions
    const displayImages = this.displayImages;
    const setNumber = this.setNumber;
    const selectBreed = this.selectBreed;
    // states
    // arrays
    const breeds = Object.keys(this.state.breeds);
    const selectedBreed = this.state.selectedBreed;
    const selectedSubBreed = this.state.selectedSubBreed;
    const subBreeds = this.state.subBreeds;
    const imagesToShow = this.state.imagesToShow;
    const imageList = this.state.imageList;
    // booleons
    const BreedsAreLoaded = this.state.BreedsAreLoaded;
    const SubBreadsAreLoaded = this.state.SubBreadsAreLoaded;
    const hasSubBreed = this.state.hasSubBreed;
    const viewMode = this.state.viewMode;
    const isLoading = this.state.isLoading;
    // numbers
    const maxImages = this.state.maxImages;

    return (
  
      <div className="App">
        <Header></Header>
        {isLoading ? <LoadingIcon></LoadingIcon>
          : 
          <DogFinder
              // booleons
              BreedsAreLoaded={BreedsAreLoaded}
              SubBreadsAreLoaded={SubBreadsAreLoaded}
              hasSubBreed={hasSubBreed}
              viewMode={viewMode}
              isLoading={isLoading}
              // arrays
              breeds={breeds}
              selectedBreed={selectedBreed}
              subBreeds={subBreeds}
              selectedSubBreed={selectedSubBreed}
              imageList={imageList}
              // numbers
              imagesToShow={imagesToShow}
              maxImages={maxImages}
              // functions
              selectBreed={selectBreed}
              setNumber={setNumber}
              displayImages={displayImages}
              >
            </DogFinder>
          }
        <Footer></Footer>
      </div>
    );
  }
}

export default App;
