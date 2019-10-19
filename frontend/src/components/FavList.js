import React from 'react';
import './favListStyle.css';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

class FavList extends React.Component {

  state = { favs: [] }

  // get info from api once component mounts, then set the state to the data that is returned
  componentDidMount() {
    axios.get('/favourites')
      .then(response => {
        this.setState({ favs: response.data })
      })
      .catch(error => {
        console.log(error);
      });
  }

  // delete item from favourites list based on the id of the parent node of the button that was clicked
  deleteItem = (event) => {
    let currentItem = document.getElementById(event.target.parentNode.id);

    axios.delete(`/favourites/${currentItem.id}`)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
    alert('Item Removed.');
    // reload window to reflect updated favourites list
    window.location.reload();
  }

  // render list of favourite items
  render() {

    let favItems = this.state.favs.map((item, index) => {
      return (
        <div key={'fav' + index} className='fav-item' id={index}>
          <h3 className='track-name'>{item.trackName}</h3>
          <img
            key={'img' + index}
            src={item.imageUrl}
            alt=''
          />
          <br />
          <br />
          <h5>{item.type}</h5>
          <a
            href={item.moreInfoUrl}
            target='_blank'
            rel='noopener noreferrer'>More Info...
        </a>
          <br />
          <Button
            id='remove-btn'
            className='btn btn-danger'
            onClick={this.deleteItem}>
            Remove
          </Button>
          <h6>{item.trackId}</h6>
        </div>
      );
    })

    return (
      <div id='fav-items-list'>
        <div id='to-search'>
          <a href='/'>To iTunes Search...</a>
        </div>
        <h1 id='fav-heading'>iTunes Favourites</h1>
        <br />
        {favItems}
      </div>
    )
  }
}

export default FavList;