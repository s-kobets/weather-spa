import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import CityInput from './commponent/search-input';
import CityList from './commponent/city-ul';
// import cityActions from './cityAction';
import api from './api';
// import cityStore from './cityStore';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        cities: []
    };

    this.addCity = this.addCity.bind(this);
  }

  addCity(cityName) {
    // cityActions.addCity(cityName);
    // Get the data from the cache if possible
    if (cityName.length !== 0) {
        // Request new data to the API
        api.get(cityName)
            .then(data => {
              this.setState({
                city: this.state.cities.push(data)
              });
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
        <CityList cities={this.state.cities} />
      </div>
    );
  }
}

export default App;
