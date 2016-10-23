
import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Help from 'material-ui/svg-icons/action/help';
import Search from './Search';

const styles = {
  container: {
    textAlign: 'center',
    paddingTop: 40,
  },
};

const muiTheme = getMuiTheme(darkBaseTheme);

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.state = {
      open: false,
    };
  }

  handleRequestClose() {
    this.setState({ open: false });
  }

  handleTouchTap() {
    this.setState({ open: true });
  }

  render() {
    const standardActions = (
      <FlatButton
        label="Cool"
        primary={true}
        onTouchTap={this.handleRequestClose}
      />
    );

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={styles.container}>
          <Dialog
            open={this.state.open}
            actions={standardActions}
            onRequestClose={this.handleRequestClose}>
            paste in a sample response to generate a quick JSON api (must be valid JSON!)
          </Dialog>
          <h1>quick api <Help className="help" color="#fff" onTouchTap={this.handleTouchTap}/>
          </h1>
          <Search />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;