import React, { Component } from 'react';

class CityInput extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <form className='row city-input'>
        <input
          className='u-full-width'
          type='text'
          ref="city"
          placeholder='Enter city name'/>
        <button
          className='button button-primary'
          type='submit'
          onClick={this.handleSubmit}>
          Add city
        </button>
      </form>
    );
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onClick(this.refs.city.value);
    this.refs.city.value = '';
  }
}

export default CityInput;