import React from "react";


function SubbreedSelector(props) {

    const subBreeds = props.subBreeds
    const selectSubBreed = props.selectSubBreed
    return (

        <label htmlFor='subbreed'>
            <p>Choose a Sub-breed</p>
            <select className='subbreed-select' id='subbreed' onChange={selectSubBreed}>
                <option className="placeholder">Choose a subbreed</option>
                {
                    subBreeds.map((subbreed) => (
                        <option key={subbreed} id={subbreed}>
                            {subbreed[0].toUpperCase() + subbreed.slice(1)}
                        </option>
                    ))
                }
            </select>
        </label>

    );
}

export default SubbreedSelector;