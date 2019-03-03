import React, { Component } from 'react';
import { Provider } from 'react-redux';
import logo from '../assets/img/logo.svg';

import '../assets/css/App.css';

import CityInput from '../components/search-input';
import CityList from '../components/city-ul';
import cityStore from '../store/cityStore';
import { actions } from '../store/ducks';

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
        cityStore.dispatch(actions.loadAddCity({ lat, log }));
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
            <a
              href="//twitter.com/s_kobets617"
              className="none-text-decoration"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 64 64"
                preserveAspectRatio="none"
                width="30px"
                height="30px"
              >
                <path d="M26.064,45.003c12.076,0,18.68-10.005,18.68-18.68c0-0.284-0.006-0.567-0.019-0.849  c1.282-0.927,2.396-2.083,3.275-3.399c-1.176,0.523-2.442,0.875-3.77,1.034c1.355-0.813,2.396-2.099,2.887-3.632  c-1.269,0.752-2.673,1.299-4.169,1.594c-1.198-1.276-2.904-2.074-4.792-2.074c-3.626,0-6.566,2.94-6.566,6.565  c0,0.515,0.058,1.016,0.17,1.497c-5.456-0.274-10.295-2.887-13.532-6.859c-0.564,0.97-0.889,2.097-0.889,3.3  c0,2.278,1.159,4.289,2.922,5.465c-1.077-0.033-2.089-0.329-2.974-0.821c-0.001,0.027-0.001,0.055-0.001,0.084  c0,3.18,2.263,5.834,5.267,6.436c-0.551,0.15-1.132,0.231-1.731,0.231c-0.423,0-0.834-0.042-1.234-0.118  c0.836,2.608,3.259,4.506,6.133,4.56c-2.247,1.761-5.078,2.81-8.154,2.81c-0.53,0-1.052-0.03-1.566-0.091  C18.906,43.916,22.356,45.003,26.064,45.003" />
                <path d="M32,58C17.663,58,6,46.337,6,32S17.663,6,32,6s26,11.663,26,26S46.337,58,32,58z M32,8  C18.767,8,8,18.767,8,32s10.767,24,24,24s24-10.767,24-24S45.233,8,32,8z" />
              </svg>
            </a>
            <a
              href="//github.com/s-kobets"
              target="_blank"
              rel="noopener noreferrer"
              className="none-text-decoration"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 30 30"
                width="30px"
                height="30px"
              >
                <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z" />
              </svg>
            </a>
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
