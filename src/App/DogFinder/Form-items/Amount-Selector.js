import React from "react";


function AmountSelector(props) {

    const maxImages = props.maxImages
    const setNumber = props.setNumber
    return (

        <label htmlFor='number'>
            <p>How many images?</p>
            <select className='number-select' id='number' onChange={(e) => setNumber(e)}>
                {
                    Array.from(Array(maxImages), (e, i) => {
                        if(i+1 === maxImages){
                            return <option key={i + 1}>All</option>
                        } else {
                            return <option key={i + 1}>{i + 1}</option>

                        }
                    })
                }
            </select>
        </label> 

    );
}

export default AmountSelector;