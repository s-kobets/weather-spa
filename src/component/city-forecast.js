import React, { Component } from 'react';
import { connect } from 'react-redux';

class CityForecast extends Component {
  render() {
    console.log('list', this.props.citiesStore);
    return (
      <ul className='column'>
        // {this.props.citiesStore.list.map(this.createCityRow, this)}
      </ul>
    );
  }

  createCityRow(city) {
    // console.log('createCityRow', city);

    return (
      <li key={city.id} className='city_forecast'>
      </li>
    );
  }

  forecast(city, event) {
    event.preventDefault();
    console.log(city);
  }
}

export default connect(
  state => ({
    citiesStore: state
  }),
  dispatch => ({})
)(CityForecast);