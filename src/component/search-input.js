import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions as cityActions } from '../ducks'

class CityInput extends Component {

  render() {
    return (
      <form className='row city-input'>
        <input
          className='u-full-width'
          type='text'
          ref={(input) => this.cityInput = input}
          placeholder='Enter city name'/>
        <button
          className='button button-primary'
          type='submit'
          onClick={this.handleSubmit.bind(this)}>
          Add city
        </button>
      </form>
    );
  }

  handleSubmit(event) {
    event.preventDefault();
    const cityName = this.cityInput.value;

    if (cityName.length !== 0) {
      // Request new data to the API
      this.props.actions.fetchAddCity(cityName);
    }
    this.cityInput.value = '';
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
      actions: bindActionCreators(cityActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CityInput);

  