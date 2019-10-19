const axios = require('axios');

const uri = '/search/imageUrl/type/trackName/moreInfoUrl/trackId'

// test to see if axiosDelete works correctly
test('returned data is error null', () => {
  return axios.delete(uri)
    .then(response => response.json())
    .then(result => {
      expect(result.error).toEqual(200);
    }, (error) => {
      console.log(error);
    }, 30000);
});