import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MediaSearch from './components/MediaSearch';
import FavList from './components/FavList';

const Search = () => {
  return (<MediaSearch />);
}

const Fav = () => {
  return (<FavList />);
}

// in the root path the user sees the MediaSearch component
// in the /favourites path the user sees the favourites list
// for any other path the user sees a 404: Not Found error
function App() {
  return (
    <Router>
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
        crossOrigin="anonymous"
      />
      <div className="App">
        <header className="App-header">
          <Switch>
            <Route
              exact={true}
              path={'/'}
              component={Search}
            />
            <Route
              exact={true}
              path={'/favourites'}
              component={Fav}
            />
            <Route
              render={() =>
                <h1>Error 404: Not Found</h1>
              }
            />
          </Switch>
        </header>
      </div>
    </Router>
  );
}

export default App;
