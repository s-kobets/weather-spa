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
            <form className='row city-input'>
                <input
                    className='u-full-width'
                    type='text'
                    name="city"
                    placeholder='Enter city name'
                    value={this.state.value}
                    onChange={this.handleChange}/>
                <button
                    className='button button-primary'
                    type='submit'
                    onClick={this.handleSubmit}>
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
        this.props.onClick(this.state.value);
        this.setState({
            value: ''
        });
    }
}

export default CityInput;