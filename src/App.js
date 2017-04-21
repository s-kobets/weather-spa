import React, { Component } from 'react';
import { Provider } from 'react-redux';
import logo from './logo.svg';
import './App.css';

import CityInput from './component/search-input';
import CityList from './component/city-ul';
import api from './api';
import cityStore from './cityStore';

class App extends Component {
  constructor(props) {
    super(props);

    this.location = this.location.bind(this);
    this.increment = this.increment.bind(this);
  }

  componentDidMount() {
    if (localStorage.getItem('cities')) {
      if (JSON.parse(localStorage.getItem('cities')).cities.length === 0) {
        this.location();
      }
    }
    // cityStore.subscribe(() => this.forceUpdate());
  }

  increment(data) {
    cityStore.dispatch({
      type: 'ADD_CITY',
      amount: data
    });
  }

  getRequest(url) {
    const request = {
      type: 'weather',
      settings: url,
    }
    api.get(request)
      .then(data => {
          this.increment(data);
      })
      .catch(err => {
        alert(err.message);
      });
  }

  location() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            // Текущие координаты.
            const lat = position.coords.latitude;
            const log = position.coords.longitude;
            this.getRequest(`?lat=${lat}&lon=${log}`);
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
