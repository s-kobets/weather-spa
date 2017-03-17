import React, { Component } from 'react';

class CityInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        return (
            <form className='row city-input' onSubmit={this.handleSubmit}>
                <p>{this.state.value}</p>
                <input
                    className='u-full-width'
                    type='text'
                    name="city"
                    placeholder='Enter city name'
                    value={this.state.value}
                    onChange={this.handleChange}/>
                <button
                    className='button button-primary'
                    type='submit'>
                    Add city
                </button>
            </form>
        );
    }

    handleChange(event) {
        this.setState({
            value: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state.value);
        this.setState({
            value: ''
        });
    }
}

export default CityInput;