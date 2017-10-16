import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm, Field } from 'redux-form'
import { actions as cityActions } from '../ducks'

class CityInput extends Component {

  render() {
    const { handleSubmit } = this.props;

    return (
      <form className='row city-input' onSubmit={handleSubmit(this.handleFormSubmit)}>
        <Field
          name='cityName'
          component='input'
          className='u-full-width'
          type='text'
          placeholder='Enter city name'
          />
        <button
          className='button button-primary'
          type='submit'
        >
          Add city
        </button>
      </form>
    );
  }

  handleFormSubmit = (formProps) => {
    const cityName = formProps.cityName;
    if (cityName && cityName.length !== 0) {
      // Request new data to the API
      this.props.actions.fetchAddCity(cityName);
    }
    this.props.reset();
  }
}

const ReduxInputForm = reduxForm({
  form: 'city',
  destroyOnUnmount: false,
})(CityInput)

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
      actions: bindActionCreators(cityActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReduxInputForm);

  