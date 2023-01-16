import React from "react";
import './App.scss';
import DogFinder from './DogFinder/Displays/DogFinder.js'
import Footer from './App-Elements/Footer/Footer.js';
import Header from './App-Elements/Header/Header.js';
import Userpage from './User/Userpage.js';
import CookieBar from './Cookies/Cookie-bar.js';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import { Routes, Route } from "react-router-dom";

class App extends React.Component {

  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);

    const { cookies } = props;
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
      isLoading: true,
      cookiesAccepted: false,
      user: cookies.get('user') || 'Null',
      favouriteImages: [],
      showScrollBtn: false
    };
    this.updateCookies = this.updateCookies.bind(this);
    this.setUser = this.setUser.bind(this);
    this.selectBreed = this.selectBreed.bind(this);
    this.setSubBreeds = this.setSubBreeds.bind(this);
    this.fetchImages = this.fetchImages.bind(this);
    this.displayImages = this.displayImages.bind(this);
    this.setNumber = this.setNumber.bind(this);
    this.addFavouriteImage = this.addFavouriteImage.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.setFaveCookies = this.setFaveCookies.bind(this);
    this.checkForUser = this.checkForUser.bind(this);
    this.onScroll = this.onScroll.bind(this);
    // this.isBottom = this.isBottom.bind(this);
  }

  componentDidMount() {
    document.addEventListener('scroll', this.onScroll);
    fetch(
      "https://dog.ceo/api/breeds/list/all")
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          breeds: json.message,
          BreedsAreLoaded: true,
          isLoading: false
        });
      }).catch((error) => {
        console.warn('error')
      })
      this.checkForUser()
  }

  onScroll(e){
    const wrappedElement = document.getElementById('app');
    if (isBottom(wrappedElement)) {
      this.setState({
        showScrollBtn: true
      })
    } else {
      this.setState({
        showScrollBtn: false
      })
    }
    function isBottom(el) {
      return el.getBoundingClientRect().top <= -350;
    }
  }

  scrollTop(){
    window.scrollTo(0, 0);
  }

  checkForUser(){
    const { cookies } = this.props;
    let userData = cookies.get('user')
    if (userData){
      let userItem = {
        userName: userData.userName,
        stateDate: userData.stateDate,
        favourites: userData.favourites,
        userActive: userData.userActive
      }
      this.setState({
        user: userItem,
        favouriteImages: userData.favourites
      })
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot){

  }
    
  updateCookies(cookieAccepted){
    this.setState({
      cookiesAccepted: cookieAccepted
    }, this.setUser)
  }

  setUser(){
    // generate user string
    let userString = 'user' + stringGen(10);
    let stateDate = new Date();
    function stringGen(len) {
      var text = "";
      var charset = "abcdefghijklmnopqrstuvwxyz0123456789";
      for (var i = 0; i < len; i++)
        text += charset.charAt(Math.floor(Math.random() * charset.length));
      return text;
    }

    // only if cookies have been accepted...
    const cookiesAccepted = this.state.cookiesAccepted;
    if(cookiesAccepted === 'true'){
      const { cookies } = this.props;
      let userItem = {
        userName: userString,
        stateDate: stateDate,
        favourites: [],
        userActive: true
      }

      cookies.set('user', userItem, { path: '/' });
      this.setState({ 
        user: userItem
       });
    }
  }

  selectBreed(selectedBreed) {
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
    if (hasSubBreed && selectedSubBreed !== ''){
      urls.push(breedOnly, subs);
    } else {
      urls.push(breedOnly)
    }

    for(var i = 0; i < urls.length; i++){
      this.fetchImagesAPI(urls[i])
    }
  }

  fetchImagesAPI(url){
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
    var getMeTo = document.querySelector("#displayResults");
    getMeTo.scrollIntoView({ behavior: 'smooth' }, true);

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

  addFavouriteImage(imageItem){
    let newFavourites = [];
    if (this.state.favouriteImages.length === 0){
      newFavourites.push(imageItem)
      this.setState({
        favouriteImages: newFavourites
      })
      this.setFaveCookies(newFavourites)
    } else if (this.state.favouriteImages.length > 0) {
      this.handleCheck(imageItem)
    }

    
  }
  
  handleCheck(imageItem) {
    let newFavourites = [];
    if(this.state.favouriteImages.some(item => imageItem.id === item.id) === true){
      newFavourites = this.state.favouriteImages.filter(item => imageItem.id !== item.id)
    } else {
      newFavourites = [...this.state.favouriteImages, imageItem]
    }
    this.setState({
      favouriteImages: newFavourites
    })
    this.setFaveCookies(newFavourites)
  }

  setFaveCookies(newFavourites){
    const { cookies } = this.props;
    // let userData = cookies.get('user')
    let userItem = {
      userName: this.state.user.userName,
      stateDate: this.state.user.stateDate,
      favourites: newFavourites,
      userActive: this.state.user.userActive
    }
    cookies.set('user', userItem, { path: '/' });
  }

    
  render(){
      
    // functions
    const displayImages = this.displayImages;
    const setNumber = this.setNumber;
    const selectBreed = this.selectBreed;
    const updateCookies = this.updateCookies;
    const addFavouriteImage = this.addFavouriteImage;
    const scrollTop = this.scrollTop;

    // states
    // arrays
    const breeds = Object.keys(this.state.breeds);
    const selectedBreed = this.state.selectedBreed;
    const selectedSubBreed = this.state.selectedSubBreed;
    const subBreeds = this.state.subBreeds;
    const imagesToShow = this.state.imagesToShow;
    const imageList = this.state.imageList;
    const favouriteImages = this.state.favouriteImages;
    // booleons
    const BreedsAreLoaded = this.state.BreedsAreLoaded;
    const SubBreadsAreLoaded = this.state.SubBreadsAreLoaded;
    const hasSubBreed = this.state.hasSubBreed;
    const viewMode = this.state.viewMode;
    const isLoading = this.state.isLoading;
    const userIsActive = this.state.user.userActive ? this.state.user.userActive : '';
    const showScrollBtn = this.state.showScrollBtn;
    // numbers
    const maxImages = this.state.maxImages;
    

    return (
  
      <div className="App" id="app">
        <Routes>
          <Route path="/" element={<Header userIsActive={userIsActive}  />}>
            <Route index element={
              <DogFinder 
              // booleons
                BreedsAreLoaded={BreedsAreLoaded}
                SubBreadsAreLoaded={SubBreadsAreLoaded}
                hasSubBreed={hasSubBreed}
                viewMode={viewMode}
                isLoading={isLoading}
                userIsActive={userIsActive}
                showScrollBtn={showScrollBtn}
                // arrays
                breeds={breeds}
                selectedBreed={selectedBreed}
                subBreeds={subBreeds}
                selectedSubBreed={selectedSubBreed}
                imageList={imageList}
                favouriteImages={favouriteImages}
                // numbers
                imagesToShow={imagesToShow}
                maxImages={maxImages}
                // functions
                selectBreed={selectBreed}
                setNumber={setNumber}
                displayImages={displayImages}
                addFavouriteImage={addFavouriteImage}
                scrollTop={scrollTop}
                />} 
              />
            <Route path="favourites" element={
              <Userpage scrollTop={scrollTop} showScrollBtn={showScrollBtn} favouriteImages={favouriteImages} addFavouriteImage={addFavouriteImage} 
              />} />
            
            
          </Route>
        </Routes>
        
        <Footer updateCookies={updateCookies} userIsActive={userIsActive}></Footer>
        <CookieBar updateCookies={updateCookies}></CookieBar>
      </div>
    );
  }
}

export default withCookies(App);
