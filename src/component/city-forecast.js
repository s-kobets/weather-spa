import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect'
import PropTypes from 'prop-types';
import { convertToCelsius } from '../utils'
import { listStore } from '../selectors'
import { actions as listActions } from '../ducks'

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
          <a href='#' onClick={this.forecast.bind(this, this.props.city)} className='city-block__forecast' title='more'>more/collapse</a>
          <div className='column'>
            {this.props.listStore.map(this.createCityRow, this)}
          </div>
      </div>
    );
  }

  forecast(city, event) {
    event.preventDefault();
    const curentCity = this.props.listStore.filter((item) => {
      return item.city.id === city.id
    });
    if (curentCity.length === 0) {
      this.props.actions.moreDetailsCity(city.id);
    } else if (curentCity[0].active) {
      this.props.actions.activeList(curentCity[0], false);
    } else {
      this.props.actions.activeList(curentCity[0], true);
    }
  }

  createCityRow(city, index) {
    if (city.active && city.city.id === this.props.city.id) {
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
}

CityForecast.propTypes = {
  listStore: PropTypes.array,
  city: PropTypes.object,
}

const mapStateToProps = createStructuredSelector({
  listStore: listStore(),
})

const mapDispatchToProps = (dispatch) => {
  return {
      actions: bindActionCreators(listActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CityForecast);
