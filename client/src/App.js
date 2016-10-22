import React from 'react';
import Search from './Search';

const App = React.createClass({
  getInitialState: function () {
    return {
      selectedFoods: [],
    };
  },
  render: function () {
    return (
      <div className='App'>
        <div className='ui text container'>
          <Search />
        </div>
      </div>
    );
  },
});

export default App;
