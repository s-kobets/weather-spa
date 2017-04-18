import React, { Component } from 'react';
import { connect } from 'react-redux';
import { convertToCelsius } from '../utils'

class CityForecast extends Component {
  constructor() {
    super()

    this.state = {
      content: '',
    }
  }

  render() {
    console.log('list', this.state.content);
    return (
      <div>
          <a href='#' onClick={this.more.bind(this)} className='city-block__forecast' title='more'>more/collapse</a>
          <div className='column'>
            { this.state.content }
          </div>
      </div>
    );
  }

  more() {
    this.props.onClick(this.props.more, event);
    this.setState({
      content: this.props.citiesStore.list.map(this.createCityRow, this)
    })
  }

  createCityRow(city, index) {
    // console.log('createCityRow', city);
    if (city.active && city.city.id === this.props.more.id) {
      const list = city.list.splice(0,4);
      // console.log('createCityRow', city, list);

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