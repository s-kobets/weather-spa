import React, { Component } from 'react';
import { connect } from 'react-redux';
import api from '../api';

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
    this.props.addCity(this.refs.city.value);
    this.refs.city.value = '';
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    addCity: (cityName) => {
      // Get the data from the cache if possible
      if (cityName.length !== 0) {
          // Request new data to the API
          api.get(`?q=${cityName}`)
            .then(data => {
                dispatch({
                  type: 'ADD_CITY',
                  amount: data
                });
            })
            .catch(err => {
              alert(err.message);
            });
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CityInput);

  