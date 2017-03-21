import React, { Component } from 'react';
import { connect } from 'react-redux';

class CityList extends Component {
  render() {
    // console.log('CityList', this.props.cities);
    return (
      <ul className='column'>
        {this.props.citiesStore.cities.map(this.createCityRow, this)}
      </ul>
    );
  }

  createCityRow(city) {
    // console.log('createCityRow', city);

    return (
      <li key={city.id} className='city'>
        <div className='city-block'>
          <img src={'http://openweathermap.org/img/w/' + city.weather[0].icon + '.png'} alt={city.weather[0].description} />
          <div className='city-block__description'>
            <strong> {city.name} </strong>
            <ul>
              <li>{city.weather[0].description}</li>
              <li>temp: {this._convertToCelsius(city.main.temp)} &#186;C</li>
              <li>pressure: {this._convertToPressure(city.main.pressure)} mm Hg</li>
              <li>humidity: {city.main.humidity} %</li>
              <li>wind speed: {city.wind.speed} meter/sec</li>
            </ul>
          </div>
        </div>
        <a href='#' onClick={this.deleteCity.bind(this, city)} className='city-block__delete' title='delete'>&#215;</a>
      </li>
    );
  }

  deleteCity(city, event) {
    event.preventDefault();
    // console.log(city);
    this.props.onClick(city);
  }
  
  _convertToPressure(pressure) {
    return (pressure * 0.750062).toFixed(2);
  }
  _convertToCelsius(degK) {
    return Math.round(degK - 273.15);
  }
}

export default connect(
  state => ({
    citiesStore: state
  }),
  dispatch => ({})
)(CityList);