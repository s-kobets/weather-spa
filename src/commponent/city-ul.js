import React, { Component } from 'react';
// import cityActions from '../cityAction';

class CityList extends Component {
    render() {
        console.log('CityList', this.props.cities);
        return (
            <ul className='column'>
                {this.props.cities.map(this.createCityRow, this)}
            </ul>
        );
    }

    createCityRow(city) {
        console.log('createCityRow', city);

        return (
            <li key={city.id} className='city'>
                <div className='city-block'>
                    <img src={'http://openweathermap.org/img/w/' + city.weather[0].icon + '.png'} alt={city.weather[0].description} />
                    <div className='city-block-description'>
                        <strong> {city.name} </strong>
                        <ul>
                            <li>{city.weather[0].description}</li>
                            <li>temp: {this._convertToCelsius(city.main.temp)} C</li>
                            <li>pressure: {city.main.pressure}</li>
                            <li>humidity: {city.main.humidity}</li>
                        </ul>
                    </div>
                </div>
                <a href="#" onClick={this.deleteCity.bind(this, city)}>Delete</a>
            </li>
        );
    }

    deleteCity(city, event) {
        event.preventDefault();
        console.log(city);
    }

    _convertToCelsius(degK) {
        return Math.round(degK - 273.15);
    }
}

export default CityList;