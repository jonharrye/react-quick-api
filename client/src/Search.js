import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {orange500, blue500} from 'material-ui/styles/colors';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {post, get} from './Client';

const styles = {
  errorStyle: {
    color: orange500,
  },
  underlineStyle: {
    borderColor: orange500,
  },
  floatingLabelStyle: {
    color: orange500,
  }
};

var Hello = React.createClass({
  render: function () {
    return <div style={{width:'50%',textAlign:'left'}}><pre>{JSON.stringify(this.props.json, null, 2) }</pre></div>;
  }
});

const Search = React.createClass({
  getInitialState: function () {
    return {
      json: null,
      searchValue: '',
      errorText: null
    };
  },
  handleSearchChange: function (e) {
    const value = e.target.value;
    this.validate(value);
  },

  handleSubmit: function () {
    if (this.state.searchValue === '') {
      this.setState({json: null});
    } else {
      post(this.state.searchValue)
        .then(val => get(val.object_id))
        .then(res => {
          console.log('res final', res);
          this.setState({json: res.data})
        });
    }
  },

  validate: function (json) {

    this.setState({searchValue: json});

    try {
      JSON.parse(json);
      this.setState({errorText: null});
    } catch (err) {
      this.setState({errorText: 'invalid JSON!'});
    }
  },

  render: function () {
    return (
      <div id='search'>
        <Card>
          <CardText>
            <TextField
              hintText='{"foo": "bar""}'
              floatingLabelText="Paste your sample response"
              multiLine={true}
              errorText={this.state.errorText}
              underlineStyle={this.state.errorText ? styles.underlineStyle : null}
              fullWidth
              rows={2}
              value={this.state.searchValue}
              onChange={this.handleSearchChange}
              style={{width:'75%'}}
              floatingLabelStyle={{float:'right'}}
            />
            <div className="btn-container">
              <RaisedButton
                label="Submit"
                secondary={true}
                onTouchTap={this.handleSubmit}
              />
            </div>
          </CardText>
        </Card>
        <div className='res'>

          {
            this.state.json && <Hello json={this.state.json}/>
          }

        </div>
      </div>
    );
  },
});

export default Search;
