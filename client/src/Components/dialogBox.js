import React, { Component } from 'react';
import { FlatButton, Dialog} from 'material-ui';

class DialogBox extends Component {
  constructor(props) {
    super(props);
  }

  handleOpen = () => {
    this.setState({...this.state, open: true});
  };

  handleClose = () => {
    this.setState(this.props.close);
  };

  render() {
    const actions = [
      <FlatButton
        label="OK"
        primary={true}
        onClick={this.props.onClick}
      />,
    ];

    return (
      <div>
        <Dialog
          actions={actions}
          modal={false}
          open={this.props.open}
          onRequestClose={this.handleClose}
        >
          {this.props.message}
        </Dialog>
      </div>
    );
  }
}

export default DialogBox;