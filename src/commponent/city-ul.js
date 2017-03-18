import React, { Component } from 'react';
import cityActions from '../cityAction';

class CityList extends Component {
    render() {
        console.log('CityList', this.props.cities);
        return (
            <ul>
                {this.props.cities.map(this.createCityRow, this)}
            </ul>
        );
    }

    createCityRow(city) {
        console.log('createCityRow', city);
        return (
            <li key={city.id} className='city'>
                <div className='nine columns'>
                    <div>
                        <strong> {city.name} </strong>
                        <span className=''>
                            {city.weather.description}
                        </span>
                        <ul>
                            <li>temp: {this._convertToCelsius(city.main.temp)} C</li>
                            <li>pressure: {city.main.pressure}</li>
                            <li>humidity: {city.main.humidity}</li>
                        </ul>
                    </div>
                </div>
                <div className='three columns delete-city'>
                    <a href="#" onClick={this.deleteCity.bind(this, city)}>Delete</a>
                </div>
            </li>
        );
    }

    deleteCity(city, event) {
        event.preventDefault();
        cityActions.deleteCity(city);
    }

    _convertToCelsius(degK) {
        return Math.round(degK - 273.15);
    }
}

export default CityList;