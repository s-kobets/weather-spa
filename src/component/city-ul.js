import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect'
import CityForecast from './city-forecast.js'
import api from '../api';
import { convertToPressure, convertToCelsius } from '../utils'
import { citiesStore } from '../selectors'

class CityList extends Component {

  getRequest(url) {
    api.get('forecast', url)
      .then(data => {
        this.props.onCheck(data)
      })
      .catch(err => {
        alert(err.message);
      });
  }

  render() {
    // console.log('CityList', this.props.cities);
    return (
      <ul className='column'>
        {this.props.citiesStore.map(this.createCityRow, this)}
      </ul>
    );
  }

  createCityRow(city) {
    // console.log('createCityRow', city);

    return (
      <li key={city.id}>
        <div className='city'>
          <div className='city-block'>
            <img src={'http://openweathermap.org/img/w/' + city.weather[0].icon + '.png'} alt={city.weather[0].description} />
            <div className='city-block__description'>
              <strong> {city.name} </strong>
              <ul>
                <li>{city.weather[0].description}</li>
                <li>temp: {convertToCelsius(city.main.temp)} &#186;C</li>
                <li>pressure: {convertToPressure(city.main.pressure)} mm Hg</li>
                <li>humidity: {city.main.humidity} %</li>
                <li>wind speed: {city.wind.speed} meter/sec</li>
              </ul>
            </div>
          </div>
          <a href='#' onClick={this.deleteCity.bind(this, city)} className='city-block__delete' title='delete'>&#215;</a>
        </div>
        < CityForecast city={city} />
      </li>
    );
  }

  deleteCity(city, event) {
    event.preventDefault();
    // console.log(city);
    this.props.removeCity(city);
    this.props.removeList(city);
  }
}

CityList.propTypes = {
  citiesStore: PropTypes.array
}

const mapStateToProps = createStructuredSelector({
  citiesStore: citiesStore(),
})

const mapDispatchToProps = (dispatch) => {
  return {
    addCity: (cityName) => {
      // Get the data from the cache if possible
      if (cityName.length !== 0) {
          // Request new data to the API
          api.get('weather', `?q=${cityName}`)
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
    },

    removeCity: (cityName) => {
      dispatch({
        type: 'REMOVE_CITY',
        amount: cityName
      });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CityList);
