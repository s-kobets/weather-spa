import React, { Component } from 'react';
import { connect } from 'react-redux';
import { convertToCelsius } from '../utils'

class CityForecast extends Component {
  render() {
    console.log('list', this.props.citiesStore.list);
    return (
      <div className='column'>
        {this.props.citiesStore.list.map(this.createCityRow, this)}
      </div>
    );
  }

  createCityRow(city, index) {
    console.log('createCityRow', city);
    if (city.active) {
      const list = city.list.splice(0,4);
      console.log('createCityRow', city, list);

      const template = list.map((indication) => {
            return ( 
              <div
                key={indication.dt_txt}
                className='city_indication'
              >
                <p>{indication.dt_txt}</p>
                <p>{convertToCelsius(indication.main.temp)} &#186;C</p>
                <p>wind speed: {indication.wind.speed} meter/sec</p>
              </div>
            );
      });

      return (
        <div key={index} className='city_forecast'>
          {template}
        </div>
      );
     }
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