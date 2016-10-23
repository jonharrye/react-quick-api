/**
 * Created by jakeforaker on 10/22/16.
 */

import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {lightBlue300, lightBlue500, pink400} from 'material-ui/styles/colors';

const a = {
  color: pink400,
  textDecoration: 'none'
};

const Tpl = ({generatedUrl}) => (
  <div>
    <p><a style={a} href={generatedUrl} target="_blank">{generatedUrl}</a></p>
  </div>
);

class Generated extends Component {
  state = {
    open: true,
  };

  handleClose = () => {
    this.setState({open: false}, this.props.reset());
  };

  navigate = () => {
    window.open(
      this.props.generatedUrl,
      '_blank'
    );
  };

  render() {
    const actions = [
      <FlatButton
        label="whatev"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Check it out!"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.navigate}
      />,
    ];

    return (
      <Dialog
        title="Congrats, your api is live!"
        actions={actions}
        modal={false}
        open={this.state.open}
        onRequestClose={this.handleClose}>
        <Tpl generatedUrl={this.props.generatedUrl}/>
      </Dialog>
    );
  }
}

export default Generated;