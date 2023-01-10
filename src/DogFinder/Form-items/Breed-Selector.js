import React from "react";


class BreedSelector extends React.Component {


    render() {
        const selectBreed = this.props.selectBreed
        const breeds = this.props.breeds
        return (
  
            <label htmlFor='breed'>
                <p>Choose a Breed</p>
                <select className='breed-select' id='breed'  onChange={(e) => selectBreed(e)}>
                    <option className="placeholder">Choose a breed</option>
                    {
                        breeds.map((breed) => (
                            <option key={breed}  id={breed}>
                                {breed[0].toUpperCase() + breed.slice(1)}
                            </option>
                        ))
                    }
                    </select>
            </label>

        );
    }
}

export default BreedSelector;