import React from 'react';
import ItemList from '../components/ItemList';
import renderer from 'react-test-renderer';

const testItems = [{
  "imageUrl": "https://is2-ssl.mzstatic.com/image/thumb/Music128/v4/8c/da/60/8cda60a5-0826-b606-d9d2-528da6af01e2/source/100x100bb.jpg",
  "type": "song",
  "trackName": "Master of Puppets (Remastered)",
  "moreInfoUrl": "https://music.apple.com/us/album/master-of-puppets-remastered/1275600311?i=1275600554&uo=4",
  "trackId": "1275600554"
}];

// snapshot test for ItemList component
ItemList('renders correctly', () => {
  const tree = renderer.create(
    <ItemList
      itemsToDisplay={testItems}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});