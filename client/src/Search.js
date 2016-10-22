import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import {orange500, blue500} from 'material-ui/styles/colors';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Generated from './Generated';
import {post, get} from './Client';

const styles = {
  underlineStyle: {
    borderColor: orange500,
  }
};

// var JSONelement = React.createClass({
//   render: function () {
//     return <div style={{width:'50%',textAlign:'left'}}><pre>{JSON.stringify(this.props.json, null, 2) }</pre></div>;
//   }
// });

class Search extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validate = this.validate.bind(this);
    this.reset = this.reset.bind(this);
    this.state = {
      json: null,
      searchValue: '',
      errorText: null,
      generatedUrl: null
    };
  }

  reset() {
    this.setState({ generatedUrl: null })
  }

  handleSearchChange(e) {
    const value = e.target.value;
    this.validate(value);
  }

  handleSubmit() {
    if (this.state.searchValue === '') {
      this.setState({json: null});
    } else {
      post(this.state.searchValue)
        .then(val => {
          if (val === 'invalid json') return;
          return get(val.object_id)
        })
        .then(res => {
          this.setState({
            json: res.body,
            generatedUrl: res.generatedUrl
          })
        })
        .catch(err => {
          console.log('err  CLIENT _____', err);
        });
    }
  }

  validate(json) {
    this.setState({searchValue: json});
    try {
      JSON.parse(json);
      this.setState({errorText: null});
    } catch (err) {
      this.setState({errorText: 'invalid JSON!'});
    }
  }

  render() {
    return (
      <Paper  zDepth={5}>
        <div>
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
                style={{width: '75%'}}
                floatingLabelStyle={{float: 'right'}}
              />
              <div className="btn-container">
                <RaisedButton
                  label="Submit"
                  secondary={true}
                  onTouchTap={this.handleSubmit}
                  disabledBackgroundColor="gray"
                  disabled={!!this.state.errorText}
                />
              </div>
            </CardText>
          </Card>
          <div className='res'>
            {
              this.state.generatedUrl && <Generated generatedUrl={this.state.generatedUrl} reset={this.reset}/>
            }
          </div>
        </div>
      </Paper>
    );
  }
}

export default Search;
