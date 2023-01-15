import React from "react";
import './Userpage.scss'
import FavouriteContainer from '../DogFinder/Displays/FavouriteContainer.js'
import { ReactComponent as DogPaw } from '../DogFinder/Displays/dog-paw.svg'
import { Outlet, Link } from "react-router-dom";

class Userpage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
        };
        this.handleFavouriteToggle = this.handleFavouriteToggle.bind(this);

    }

    componentDidMount() {
        if (this.props.favouriteImages.some(item => this.props.id === item.id) === true) {
            console.warn('Userpage fave exists');
  
        } else {
            console.warn('Userpage fave doesnt exist');
  
        }
    }

    shouldComponentUpdate(nextProps){
        if(this.props.favouriteImages != nextProps.favouriteImages){
            console.warn('Userpage faves changed');
            return true
        }else {
            console.warn('Userpage faves same');
            return false
        };
    }

    handleFavouriteToggle(i, image, imageTitle, id, isFave) {
        console.warn('i, image, imageTitle', i, image, imageTitle, id);
        let imgItem = {
            id: id,
            title: imageTitle,
            url: image,
            fave: false
        }
        console.warn('remove fave', imgItem);
        this.props.addFavouriteImage(imgItem)

    }


    render() {
        const favouriteImages = this.props.favouriteImages;
        const sortedImages = favouriteImages.sort((a, b) => a.id > b.id ? 1 : -1)
        console.warn('favouriteImages.length', favouriteImages.length);
        // const addFavouriteImage = this.props.addFavouriteImage
        const handleFavouriteToggle = this.handleFavouriteToggle;


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
                                        <p>{image.title}</p>
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
            </div>

        );
    }
}

export default Userpage;