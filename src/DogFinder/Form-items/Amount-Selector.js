import React from "react";


class AmountSelector extends React.Component {


    render() {
        const maxImages = this.props.maxImages
        const setNumber = this.props.setNumber
        return (
  
            <label htmlFor='number'>
                <p>How many images?</p>
                <select className='number-select' id='number' onChange={(e) => setNumber(e)}>
                    {
                        Array.from(Array(maxImages), (e, i) => {
                            if (i === maxImages - 1) {
                                return <option key={i}>All</option>
                            } else {

                                return <option key={i}>{i}</option>
                            }
                        })
                    }
                </select>
            </label> 

        );
    }
}

export default AmountSelector;