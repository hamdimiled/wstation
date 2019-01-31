import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon  from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import amber from '@material-ui/core/colors/amber';
import { withStyles } from "@material-ui/core/styles";

const styles = {
  editIcon:{
    color:amber[500],
},
editButton:{
  '&:hover': {
      backgroundColor: amber[100],
  },
  overflowButton:{
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden" 
  }
},

  }
class FormDialog extends React.Component {
  state = {
    open: false,
  };
  constructor(props){
    super(props);
    console.log(props);
    
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
        {this.props.type=="edit"?(
 <IconButton
 aria-label="Edit"
 className={classes.editButton}
 onClick={this.handleClickOpen}
>
 <EditIcon className={classes.editIcon} />
</IconButton>):(
  <Button style={{float:"right",marginBottom:10, backgroundColor:"white"}} variant="outlined" color="default" onClick={this.handleClickOpen}>
  <AddIcon   />
  <span className={classes.overflowButton}>
    Ajouter
    </span>
  </Button>
  )
        }
        <Dialog
          maxWidth="sm"
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">{this.props.title} </DialogTitle>
          <DialogContent>
            <DialogContentText>
            {this.props.text} 
            </DialogContentText>
            <TextField
              margin="dense"
              id="intitule"
              label="Intitulé"
              type="TextField"
              fullWidth
              value={this.props.dataValue?this.props.dataValue.intitule:''}
            />
            <TextField
              margin="dense"
              id="unite"
              label="Unité"
              type="TextField"
              fullWidth
              value={this.props.dataValue?this.props.dataValue.unite:''}
            />
            <TextField
              margin="dense"
              id="resolution"
              label="Résolution"
              type="TextField"
              fullWidth
              value={this.props.dataValue?this.props.dataValue.resolution:''}
            />
            <TextField
              margin="dense"
              id="offset"
              label="Offset"
              type="TextField"
              fullWidth
              value={this.props.dataValue?this.props.dataValue.offset:''}
            />
            <TextField
              margin="dense"
              id="taille"
              label="Taille"
              type="TextField"
              fullWidth
              value={this.props.dataValue?this.props.dataValue.taille:''}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Annuler
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Confirmer
            </Button>
          </DialogActions>
        </Dialog>
      </span>
    );
  }
}
export default withStyles(styles)(FormDialog);