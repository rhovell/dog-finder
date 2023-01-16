import React from "react";


class BreedSelector extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.setBreed = this.setBreed.bind(this);
    }

    componentDidMount(){
        if(this.props.selectedBreed !== this.state.value){
            this.setState({
                value: this.props.selectedBreed
            })
        }
    }

    handleChange = (e) => {
        e.preventDefault()
        let selectedValue = e.target.value;
        this.setState({
            value: selectedValue
        })
        setTimeout(function () {
            if(this.state.value !== ''){
                this.setBreed()
            }
        }.bind(this), 1000);
        
    }

    setBreed(){
        const breed = this.state.value
        this.props.selectBreed(breed)
    }

    render() {
        const breeds = this.props.breeds
        const value = this.state.value;
        const handleChange = this.handleChange;

        return (
  
            <label htmlFor='breed'>
                <p>Choose a Breed</p>
                <select className='breed-select' id='breed' onChange={(e) => handleChange(e)} value={value} >
                    <option className="placeholder">Choose a breed</option>
                    {
                        breeds.map((breed) => (
                            <option key={breed} id={breed} value={breed}>
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