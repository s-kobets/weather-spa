import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CityForecast from './city-forecast.js'
import api from '../api';
import { convertToPressure, convertToCelsius } from '../utils'

class CityList extends Component {
  constructor(props) {
    super(props);

    this.forecast = this.forecast.bind(this);
  }

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
        {this.props.citiesStore.cities.map(this.createCityRow, this)}
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
        < CityForecast more={city} onClick={this.forecast.bind(this)} />
      </li>
    );
  }

  forecast(city, event) {
    console.log('click forecast')
    event.preventDefault();
    const curentCity = this.props.citiesStore.list.filter((item) => {
      return item.city.id === city.id
    });
    if (curentCity.length === 0) {
      console.log('if', curentCity)
      this.props.incrementList(city);
    } else if (curentCity[0].active) {
      console.log('else if', curentCity)
      this.props.ActiveList(curentCity[0], false);
    } else {
      console.log('else', curentCity)
      this.props.ActiveList(curentCity[0], true);
    }
  }

  deleteCity(city, event) {
    event.preventDefault();
    // console.log(city);
    this.props.removeCity(city);
    this.props.removeList(city);
  }
}

CityList.propTypes = {
  citiesStore: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    citiesStore: state
  }
}

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
    },    

    incrementList: (city) => {
      // Get the data from the cache if possible
      if (city) {
          // Request new data to the API
          api.get('forecast', `?id=${city.id}`)
            .then(data => {
                const itemObj = {active: true};
                dispatch({
                  type: 'ADD_LIST',
                  amount: Object.assign({}, itemObj, data)
                });
            })
            .catch(err => {
              alert(err.message);
            });
      }
    },

    removeList: (cityName) => {
      dispatch({
        type: 'REMOVE_LIST',
        amount: cityName
      });
    },

    ActiveList: (city, param) => {
      city.active = param;
      dispatch({
        type: 'ACTIVE_LIST',
        amount: city
      });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CityList);
