import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import red from '@material-ui/core/colors/red';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from "@material-ui/core/styles";

const styles = {
    deleteButton:{
      '&:hover': {
          backgroundColor: red[100],
      },
  },
  deleteIcon:{
      color:red[500],
  }
    }
    
class DeleteDialog extends React.Component {
  state = {
    open: false,
  };
  constructor(props){
     super(props);
  }


  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {

    const { classes } = this.props;
    return (
      <span>
    <IconButton onClick={this.handleClickOpen}
                  className={classes.deleteButton}
                  aria-label="Delete"
                >
                  <DeleteIcon className={classes.deleteIcon} />
                </IconButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{this.props.title}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
             {this.props.text}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Refuser
            </Button>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Accepter
            </Button>
          </DialogActions>
        </Dialog>
      </span>
    );
  }
}

export default withStyles(styles)(DeleteDialog);