import './App.scss';
import DogFinder from '../DogFinder/DogFinder.js'
import React, { useEffect, useState } from "react";


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
      isLoading: false
    };
    this.selectBreed = this.selectBreed.bind(this);
    this.fetchSubBreeds = this.fetchSubBreeds.bind(this);
    this.selectSubBreed = this.selectSubBreed.bind(this);
    this.fetchImages = this.fetchImages.bind(this);
    this.displayImages = this.displayImages.bind(this);
    this.setNumber = this.setNumber.bind(this);
    this.fetchImagesAPI = this.fetchImagesAPI.bind(this);
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
      this.fetchSubBreeds()
    }
  }

  selectBreed(event) {
    // console.warn('selectBreed(event)')
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
        imageList: []
      })
    // }
    let selectedBreed = event.target.value.toLowerCase();
    // console.warn('selectedBreed',selectedBreed)
    this.setState({
      selectedBreed: selectedBreed,
      isLoading: true
    }, this.fetchSubBreeds) 
  }
    
  fetchSubBreeds() {
    const selectedBreed = this.state.selectedBreed;
    // console.warn('selectedBreed', selectedBreed)
    fetch('https://dog.ceo/api/breed/' + selectedBreed + '/list')
      .then((res) => res.json())
      .then((json) => {
        // console.warn('json.message',json.message)
        if (json.message[selectedBreed]){
          this.setState({
            subBreeds: json.message[selectedBreed],
          });
        }
      }).then(() => {
        // console.warn('subBreeds',this.state.subBreeds);
        if (this.state.subBreeds.length > 0) {
          this.setState({
            hasSubBreed: true
          });
        } else {
          this.setState({
            hasSubBreed: false
          }, this.fetchImages);
        }
        this.setState({
          SubBreadsAreLoaded: true,
          isLoading: false
        });

      }).catch((error) => {
        console.warn('fetchSubBreeds error', error)
      })
  }


  selectSubBreed(event) {
    // console.warn('selectSubBreed event triggered')
    let selectedSubBreed = event.target.value.toLowerCase();
    // console.warn(selectedSubBreed)
    this.setState({
      selectedSubBreed: selectedSubBreed,
      isLoading: true
    }, this.fetchSubBreeds)
    // this.fetchImages()
    // console.warn(this.state.selectedSubBreed)      
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
    if (hasSubBreed){
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
      viewMode: true
    })
    let newImages = this.state.images.filter((image,index) => index < imagesToShow)
      this.setState({
        imageList: newImages
      })

  }

  setNumber(event){
    this.setState({
      imagesToShow: event.target.value
    })
  }

    
  render(){
      
    // functions
    const selectSubBreed = this.selectSubBreed;
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
        <header className="App-header">
          <h1>Dog Finder</h1>
        </header>
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
            selectSubBreed={selectSubBreed}
            setNumber={setNumber}
            displayImages={displayImages}>
          </DogFinder>
      </div>
    );
  }
}

export default App;
