import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect'
import CityForecast from './city-forecast.js'
import { convertToPressure, convertToCelsius } from '../utils'
import { citiesStore } from '../store/selectors'
import { actions as cityActions } from '../store/ducks'

class CityList extends Component {

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
    this.props.actions.removeCity(city);
    this.props.actions.removeList(city);
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
      actions: bindActionCreators(cityActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CityList);
