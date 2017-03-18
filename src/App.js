import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import CityInput from './commponent/search-input';
import CityList from './commponent/city-ul';
import api from './api';
// import cityStore from './cityStore';
// import cityActions from './cityAction';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        cities: [],
        defaultCities: true,
        num: 0
    };

    this.addCity = this.addCity.bind(this);
    this.location = this.location.bind(this);
  }

  counter() {
    var num = 0;
    return function() {
      return num += 1;
    }
  }

  getRequest(url) {
    this.setState({ 
      num: this.state.num + 1
    });
//     var data1 = {
//   "weather": [
//     {
//       "id": 802,
//       "main": "Clouds",
//       "description": "scattered clouds",
//       "icon": "03d"
//     }
//   ],
//   "base": "stations",
//   "main": {
//     "temp": 279.15,
//     "pressure": 1003,
//     "humidity": 56,
//     "temp_min": 279.15,
//     "temp_max": 279.15
//   },
//   "visibility": 10000,
//   "wind": {
//     "speed": 5,
//     "deg": 150
//   },
//   "clouds": {
//     "all": 40
//   },
//   "dt": 1489847400,
//   "sys": {
//     "type": 1,
//     "id": 7323,
//     "message": 0.5237,
//     "country": "RU",
//     "sunrise": 1489808119,
//     "sunset": 1489851631
//   },
//   "id": 524901,
//   "name": "123Moscow",
//   "cod": 200
// };
    api.get(url)
      .then(data => {
          this.setState({ 
            cities: this.state.cities.concat([data])
          });
      });
    // data1.id += this.state.num;
    // this.setState({ 
    //   cities: this.state.cities.concat(data1)
    // });
    console.log('getRequest', this.state.cities, this.state.num);
  }

  addCity(cityName) {
    // cityActions.addCity(cityName);
    // Get the data from the cache if possible
    if (cityName.length !== 0) {
        // Request new data to the API
        this.getRequest(`?q=${cityName}`);
    }
  }

  location(flag) {
    if (flag) {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(position => {
              // Текущие координаты.
              const lat = position.coords.latitude;
              const log = position.coords.longitude;
              this.getRequest(`?lat=${lat}&lon=${log}`);
          });
      }
      this.setState({ 
        defaultCities: !this.state.defaultCities
      });
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <CityInput onClick={this.addCity} />
        <CityList cities={this.state.cities} onLoad={this.location(this.state.defaultCities)}/>
      </div>
    );
  }
}

export default App;
