import React from 'react'
import './itemListStyle.css';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

// collect data on item to be added to favourites list and sent it to the back-end to
// be added to the favourites list
const addToFavorites = (event) => {
  let selectedItem = document.getElementById(event.target.parentNode.id);

  // use encodeURIComponent() to ensure all characters are properly encoded
  let imageUrl = encodeURIComponent(selectedItem.getElementsByTagName('img')[0].src);
  let type = encodeURIComponent(selectedItem.getElementsByTagName('h5')[0].textContent);
  let trackName = encodeURIComponent(selectedItem.getElementsByTagName('h3')[0].textContent);
  let moreInfoUrl = encodeURIComponent(selectedItem.getElementsByTagName('a')[0].href);
  let trackId = encodeURIComponent(selectedItem.getElementsByTagName('h6')[0].textContent);

  // Sometimes items returned from the iTunes api don't have certain properties/details
  // When this happens the above information gathering statements will return nothing, and then
  // the save to favourites will fail.
  // for this reason we check if the info has been successfully gathered, and if not, we substitute
  // default values so that the item can still be saved to favourites.
  if (imageUrl === '') {
    imageUrl = 'no image url';
  }
  if (type === '') {
    type = '---';
  }
  if (trackName === '') {
    trackName = '---';
  }
  if (moreInfoUrl === '') {
    moreInfoUrl = '404';
  }
  if (trackId === '') {
    trackId = 'trackId unknown'
  }

  axios.post(`/search/${imageUrl}/${type}/${trackName}/${moreInfoUrl}/${trackId}`)
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });

  alert('Item added to favourites.');
}

// render a div containing info for each item returned by the search
const ItemList = (props) =>
  props.itemsToDisplay.map((item, index) => {
    return (
      <div key={'item' + index} className='list-item' id={'item' + index}>
        <h3 className='track-name'>{item.trackName}</h3>
        <img
          key={'img' + index}
          src={item.artworkUrl100}
          alt=''
        />
        <br />
        <br />
        <h5>{item.kind}</h5>
        <a
          href={item.collectionViewUrl}
          target='_blank'
          rel='noopener noreferrer'>More Info...
        </a>
        <br />
        <Button
          id='add-btn'
          onClick={addToFavorites}>
          Favorite
          </Button>
        <h6>{item.trackId}</h6>
      </div>
    );
  });

export default ItemList;