
import React from 'react';
import Client from './Client';

const MATCHING_ITEM_LIMIT = 25;
const Search = React.createClass({
  getInitialState: function () {
    return {
      foods: [],
      showRemoveIcon: false,
      searchValue: '',
    };
  },
  handleSearchChange: function (e) {
    const value = e.target.value;

    this.setState({
      searchValue: value,
    });

    if (value === '') {
      this.setState({
        foods: [],
        showRemoveIcon: false,
      });
    } else {
      this.setState({
        showRemoveIcon: true,
      });

      Client.search(value, (foods) => {
        console.log('foods ', foods);
        // this.setState({
        //   foods: foods.slice(0, MATCHING_ITEM_LIMIT),
        // });
      });
    }
  },
  handleSearchCancel: function () {
    this.setState({
      foods: [],
      showRemoveIcon: false,
      searchValue: '',
    });
  },
  render: function () {
    return (
      <div id='search'>
        <div className='ui fluid search'>
          <div className='ui icon input'>
            <input
                className='prompt'
                type='text'
                placeholder='Search...'
                value={this.state.searchValue}
                onChange={this.handleSearchChange}
            />
            <i className='search icon'/>
          </div>
          {
            this.state.showRemoveIcon ? (
                <i
                    className='remove icon'
                    onClick={this.handleSearchCancel}
                />
            ) : ''
          }
        </div>
      </div>
    );
  },
});

export default Search;
