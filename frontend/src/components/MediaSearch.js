import React from 'react';
import axios from 'axios';
import './mediaSearchStyle.css';

import ItemList from './ItemList';
import Button from 'react-bootstrap/Button';

class MediaSearch extends React.Component {

  state = {
    media: 'all',
    items: []
  }

  // set the state of media to whatever radio button was selected
  // if no radio button was selected, the default is 'all'
  selectedRadioBtn = (event) => {
    this.setState({ media: event.target.value });
  }

  // if the user presses 'Enter' after typing a search term, the search() function is triggered
  enterPressed = (event) => {
    if (event.keyCode === 13) {
      this.search();
    }
  }

  // fetch data based on user input
  // if nothing is found alert the user
  // if something is found set the state of the items array to the returned data
  search = () => {
    // itemDataArray = [];
    let searchTerm = document.getElementById('search-term').value;
    let uri = `/search/${encodeURIComponent(searchTerm)}/${this.state.media}`; // make sure that the searchTerm is properly encoded so that special characters don't cause issues

    axios.get(uri)
      .then(response => {
        if (response.data === 'Nothing found') {
          alert('Sorry, we found nothing that matches your search term...')
        } else {
          console.log(response);
          this.setState({ items: response.data });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  // render radio buttons, input area, search button, and item list (once it exists)
  render() {
    return (
      <div id='search-form'>
        <a href='/favourites'>To Favourites...</a>
        <form onChange={this.selectedRadioBtn}>
          <h1 id='search-heading'>iTunes Media Search</h1>
          <div className='media-select-div'>
            <input className='media-radio-btn' type='radio' name='media' value='music' />Music<br />
            <input className='media-radio-btn' type='radio' name='media' value='musicVideo' />Music Video<br />
          </div>
          <div className='media-select-div'>
            <input className='media-radio-btn' type='radio' name='media' value='podcast' />Podcast<br />
            <input className='media-radio-btn' type='radio' name='media' value='movie' />Movie<br />
          </div>
          <div className='media-select-div'>
            <input className='media-radio-btn' type='radio' name='media' value='shortFilm' />Short Film<br />
            <input className='media-radio-btn' type='radio' name='media' value='tvShow' />TV Show<br />
          </div>
          <div className='media-select-div'>
            <input className='media-radio-btn' type='radio' name='media' value='audiobook' />Audio Book<br />
            <input className='media-radio-btn' type='radio' name='media' value='ebook' />eBook<br />
          </div>
          <div className='media-select-div'>
            <input className='media-radio-btn' type='radio' name='media' value='software' />Software<br />
            <input className='media-radio-btn' type='radio' name='media' value='all' />All
          </div>
        </form>
        <br /><br />
        <input id='search-term' onKeyDown={this.enterPressed} />
        <Button id='search-btn' onClick={this.search}>Search</Button>
        <br />
        <br />
        <h1>Results:</h1>
        <div id='item-list-container'>
          <ItemList itemsToDisplay={this.state.items} />
        </div>
      </div>
    )
  }
}

export default MediaSearch;