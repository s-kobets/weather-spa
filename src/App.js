import React, { Component } from 'react';
import { Provider } from 'react-redux';
import logo from './logo.svg';
import './App.css';

import CityInput from './component/search-input';
import CityList from './component/city-ul';
import cityStore from './cityStore';
import { actions } from './ducks'

class App extends Component {

  componentDidMount() {
    if (localStorage.getItem('cities')) {
      if (JSON.parse(localStorage.getItem('cities')).cities.length === 0) {
        this.location();
      }
    }
    // cityStore.subscribe(() => this.forceUpdate());
  }

  location() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            // Текущие координаты.
            const lat = position.coords.latitude;
            const log = position.coords.longitude;
            cityStore.dispatch(actions.loadAddCity({lat, log}));
        });
    }
  }

  render() {
    // const cities = cityStore.getState().cities;
    return (
      <Provider store={cityStore}>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
          </div>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
          <CityInput />
          <CityList />
        </div>
      </Provider>
    );
  }
}

export default App;
