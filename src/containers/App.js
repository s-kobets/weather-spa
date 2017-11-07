import React, { Component } from 'react';
import { Provider } from 'react-redux';
import logo from '../assets/img/logo.svg';
import '../assets/css/App.css';

import CityInput from '../components/search-input';
import CityList from '../components/city-ul';
import cityStore from '../store/cityStore';
import { actions } from '../store/ducks'

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

          <div className="App-content">
            <p className="App-intro">
              To get started, edit <code>src/App.js</code> and save to reload.
            </p>
            <CityInput />
            <CityList />
          </div>
          
          <div className="App-footer">
            <p>Copyright 2017 Kobets - Built With Passion</p>
            <a href="//twitter.com/s_kobets617" className="none-text-decoration" target="_blank">
              <span className="fa-stack">
                <i className="fa fa-circle-o fa-stack-2x"></i>
                <i className="fa fa-twitter fa-stack-1x"></i>
              </span>
            </a>
            <a href="//github.com/s-kobets" className="none-text-decoration">
              <span className="fa-stack">
                <i className="fa fa-circle-o fa-stack-2x"></i>
                <i className="fa fa-github fa-stack-1x"></i>
              </span>
            </a>
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
