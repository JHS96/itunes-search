const axios = require('axios');

const uri = '/search/metallica/all'

// test to see if axiosGet works correctly
test('returned data is Status 200', () => {
  return axios.get(uri)
    .then(response => response.json())
    .then(result => {
      expect(result.status).toEqual(200);
    }, (error) => {
      console.log(error);
    }, 30000);
});