import React, { Component, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm, Field } from 'redux-form';
import { actions as cityActions } from '../store/ducks';
import data from '../data.json';

export const Search = props => {
  const [filter, setFilter] = useState('');
  const [countries, setCountries] = useState([]);

  const selectFavoriteCountry = country => {
    setFilter(country.name);
  };

  const countriesJSX = countries.map((city, index) => {
    const name = `<span class='highlight'>${city.name}</span>`;
    const country = `<span class='highlight'>${city.country}</span>`;

    return (
      <li
        key={`${city.name}-${index}`}
        onClick={() => selectFavoriteCountry(city)}
      >
        <span
          className="country"
          dangerouslySetInnerHTML={{
            __html: `${name}, ${country}`
          }}
        />
      </li>
    );
  });

  const handleChange = e => {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      const trimValue = e.currentTarget.value.trim();
      setFilter(trimValue);
      if (trimValue.length > 0) {
        const value = `${trimValue[0].toUpperCase()}${trimValue.slice(1)}`;
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
        });
        setCountries(filterData);
      } else {
        setCountries([]);
      }
    }, 250);
  };

  return (
    <React.Fragment>
      <Field
        name="cityName"
        component="input"
        className="u-full-width"
        onChange={handleChange}
        value={filter}
        type="text"
        placeholder="Enter city name"
      />
      {/* <ul>{countriesJSX}</ul> */}
    </React.Fragment>
  );
};

class CityInput extends Component {
  render() {
    const { handleSubmit } = this.props;

    return (
      <form
        className="row city-input"
        onSubmit={handleSubmit(this.handleFormSubmit)}
      >
        <Search />
        <button className="button button-primary" type="submit">
          Add city
        </button>
      </form>
    );
  }

  handleFormSubmit = formProps => {
    const cityName = formProps.cityName;
    if (cityName && cityName.length !== 0) {
      // Request new data to the API
      this.props.actions.fetchAddCity(cityName);
    }
    this.props.reset();
  };
}

const ReduxInputForm = reduxForm({
  form: 'city',
  destroyOnUnmount: false
})(CityInput);

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(cityActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReduxInputForm);
