const rootUrl = 'http://api.openweathermap.org/data/2.5/weather';
const apiUrl = '&appid=13bb07540b37ac984d9c9bd027c20637';

//9deb1490da7395429f58c27e7cf9746c
const api = {
    get: function(place) {
        return fetch(rootUrl + place + apiUrl, {
            headers: {
                // No need for special headers
            }
        })
        .then(response => {
            const json = response.json();
            if (response.status >= 200 && response.status < 300) {
                return json;
            } else {
                return json.then(Promise.reject.bind(Promise));
            }
        });

    }
}

export default api;