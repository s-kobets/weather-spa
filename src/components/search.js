import React, { PureComponent } from 'react';
import Dropdown from './dropdown';
import data from '../data.json';
import { callAllEvents } from '../utils';

class Search extends PureComponent {
  state = {
    filter: '',
    visible: false,
    highlight: 0,
    countries: []
  };

  input = null;
  lastHighlight = 0;

  selectFavoriteCountry = city => {
    this.setState({ filter: city.name });
    this.input.focus();
  };

  handleClickOption = city => e => {
    e.preventDefault();
    this.selectFavoriteCountry(city);
  };

  countriesJSX = countries => {
    const { filter } = this.state;
    if (countries.length === 0) {
      return <li>Not {filter} in the World</li>;
    }
    return countries.map((city, index) => {
      this.lastHighlight = index;
      return (
        <li
          key={`${city.name}-${index}`}
          onClick={this.handleClickOption(city)}
          className={`${index === this.state.highlight && 'highlight'}`}
        >
          {city.name}, {city.country}
        </li>
      );
    });
  };

  generateCountries = value => {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      let counterSuccess = 0;
      let filterData = [];

      data.some(city => {
        if (city.name.includes(value)) {
          counterSuccess += 1;
          filterData.push(city);
          return false;
        } else if (counterSuccess > 10) {
          return true;
        }
        return false;
      });
      this.setState({ countries: filterData, visible: true });
    }, 250);
  };

  handleBlur = () => {
    clearTimeout(this.timeoutBlur);
    this.timeoutBlur = setTimeout(() => {
      this.setState({ visible: false });
    }, 250);
  };

  handleFocus = e => {
    clearTimeout(this.timeoutBlur);
    const trimValue = e.currentTarget.value.trim();
    if (trimValue.length > 0) {
      this.generateCountries(trimValue);
    }
  };

  handleChange = e => {
    const { value } = e.currentTarget;

    const valueTrim = value.trim();
    const trimValue = valueTrim
      ? `${valueTrim[0].toUpperCase()}${valueTrim.slice(1)}`
      : '';
    this.setState({ filter: trimValue });
    if (trimValue.length > 0) {
      this.generateCountries(trimValue);
    } else {
      this.setState({ countries: [], visible: false });
    }
  };

  handleKeyDown = e => {
    const { highlight, countries } = this.state;
    switch (e.keyCode) {
      // down
      case 40: {
        let changeHighlight = highlight + 1;
        if (changeHighlight > this.lastHighlight) changeHighlight = 0;
        this.setState({ highlight: changeHighlight });
        break;
      }
      // up
      case 38: {
        let changeHighlight = highlight - 1;
        if (changeHighlight < 0) changeHighlight = this.lastHighlight;
        this.setState({ highlight: changeHighlight });
        break;
      }
      //enter
      case 13: {
        e.preventDefault();
        const cityName = this.countriesJSX(countries)[highlight].key.replace(
          /-[0-9]+/,
          ''
        );
        this.setState({ filter: cityName });
        break;
      }
      default: {
        break;
      }
    }
  };

  render() {
    const { visible, filter, countries } = this.state;
    const { input } = this.props;
    const { onChange, onFocus, onBlur, onKeyDown } = input;

    return (
      <label className="search">
        <input
          {...input}
          ref={node => (this.input = node)}
          onChange={callAllEvents(this.handleChange, onChange)}
          onKeyDown={callAllEvents(this.handleKeyDown, onKeyDown)}
          onFocus={callAllEvents(this.handleFocus, onFocus)}
          onBlur={callAllEvents(this.handleBlur, onBlur)}
          value={filter}
          type="text"
          placeholder="Enter city name"
        />
        <Dropdown visible={visible} disablePortal>
          <ul className="dropdown search__list">
            {this.countriesJSX(countries)}
          </ul>
        </Dropdown>
      </label>
    );
  }
}

export default Search;
