const axios = require('axios');

const uri = '/favourites/0'

// test to see if axiosDelete works correctly
test('returned data is error null', () => {
  return axios.delete(uri)
    .then(response => response.json())
    .then(result => {
      expect(result.error).toEqual(null);
    }, (error) => {
      console.log(error);
    }, 30000);
});