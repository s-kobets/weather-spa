import { createFetch, base, method, parse, accept } from 'http-client'
const rootUrl = 'http://api.openweathermap.org/data/2.5/';
const apiUrl = '&appid=13bb07540b37ac984d9c9bd027c20637';

const fetch = createFetch(
    method('GET'),
    base(`${rootUrl}`),  // Prefix all request URLs 
    accept('application/json'),         // Set "Accept: application/json" in the request headers 
    parse('json', 'response'),                      // Read the response as JSON and put it in response.body 
)

//9deb1490da7395429f58c27e7cf9746c
const api = {
  get: function(type, settings) {
    return fetch(`${type}${settings}${apiUrl}`)
      .then(result => {
        const json = result.response;
        if (result.status >= 200 && result.status < 300) {
          return json;
        } else {
          return json.then(Promise.reject.bind(Promise));
        }
      });
  }
}

export default api;