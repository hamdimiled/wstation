import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import FormControl from '@material-ui/core/FormControl';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Typography } from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import amber from '@material-ui/core/colors/amber';
import AddIcon  from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import red from '@material-ui/core/colors/red';
import DeleteIcon from '@material-ui/icons/Delete';
import gql from "graphql-tag";
import { graphql,Query,Mutation  } from "react-apollo";
import CustomizedSnackbars from "./Snackbar";

const styles =theme => ( {
  root: {
    width: "100%",
    overflowX: "auto"
  },
   tableContainer: {
    height: 320,
  },
  table: {
    minWidth: 700
  },
  progress: {
    margin: theme.spacing.unit * 2,
  },editIcon:{
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
}, deleteButton:{
  '&:hover': {
      backgroundColor: red[100],
  },
},
deleteIcon:{
  color:red[500],
},
});
class SimpleTable extends React.Component {
  constructor(props) {
    super(props);
    console.log("hi");
    this.state={
        grandeurs:[],
        page: 0,
        rowsPerPage: 5,
        isLoading:true,
        openModal:false,
        editData:null,
        openDeleteModal:false,
        intitule:'',
        unite:'',
        resolution:'',
        offset:'',
        taille:'',
        success:false,
        idToDelete:null,
        idToEdit:null,
        openEditModal:false,
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  handleChangePage = (event, page) => {
    this.setState({ page });
  };
  handleClickOpenDelete (id) {
    console.log("id",id);
    this.setState({ openDeleteModal: true,idToDelete:id,success:false });
  };

  handleCloseDelete = () => {
    this.setState({ openDeleteModal: false,idToDelete:null,success:false });
  };
  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };
  handleClickOpen(data){
if(data){
    this.setState({ openEditModal: true,idToEdit:data._id,editData:data,success:false,intitule:data.intitule,unite:data.unite,resolution:data.resolution,offset:data.offset,taille:data.taille });
}else{
  this.setState({ openModal: true,editData:null,success:false,intitule:'',unite:'',resolution:'',offset:'',taille:''  });
}
  };

  handleClose = () => {
    this.setState({ openModal: false,openEditModal: false });
  };
  handleInputChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    });
  }
  render() {
    const { classes } = this.props;

    return (
    <span>
      <Typography variant="h4" gutterBottom component="h2">
        Grandeurs Physiques
        <Button style={{float:"right",marginBottom:10, backgroundColor:"white"}} variant="outlined" color="default" onClick={()=>this.handleClickOpen(null)}>
  <AddIcon   />
  <span className={classes.overflowButton}>
    Ajouter
    </span>
  </Button>
      </Typography>
      <div className={classes.tableContainer}>
      <Paper className={classes.root}>
      {this.state.success &&
        <CustomizedSnackbars open={this.state.success} variant="success" text="Opération Réussi"/>
        }
      <Query fetchPolicy="network-only" query={Grandeurs}>
          {({ loading, error, data, refetch, networkStatus }) => {
             console.log("queryy",data);
             if (loading) return   <div style={{display: "flex",justifyContent: "center",overflow:"hidden"}} >
             <CircularProgress  size={40} className={classes.progress} /></div>;
             if (error) return  <CustomizedSnackbars open={this.state.error} variant="error" text="Probléme Serveur"/>
            return <Table className={classes.table}>
            <TableHead> 
              <TableRow>
                <TableCell>Intitulé</TableCell>
                <TableCell align="right">Unité</TableCell>
                <TableCell align="right">Résolution</TableCell>
                <TableCell align="right">Offset</TableCell>
                <TableCell align="right">Taille</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
           
          
            <TableBody>
         
              {data.GrandeursLists.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map(grandeur => (
                <TableRow key={grandeur._id}>
                  <TableCell component="th" scope="row">
                    {grandeur.intitule}
                  </TableCell>
                  <TableCell align="right">{grandeur.unite}</TableCell>
                  <TableCell align="right">{grandeur.resolution}</TableCell>
                  <TableCell align="right">{grandeur.offset}</TableCell>
                  <TableCell align="right">{grandeur.taille}</TableCell>
                  <TableCell align="right">
                  <IconButton
   aria-label="Edit"
   className={classes.editButton}
   onClick={()=>this.handleClickOpen(grandeur)}
  >
   <EditIcon className={classes.editIcon} />
  </IconButton>
  <IconButton onClick={()=>this.handleClickOpenDelete(grandeur._id)}
                    className={classes.deleteButton}
                    aria-label="Delete"
                  >
                    <DeleteIcon className={classes.deleteIcon} />
                  </IconButton>
                  </TableCell>
                </TableRow>
              ))
            }
            </TableBody>
           
            <TableFooter>
                <TableRow>
                  <TablePagination 
                    rowsPerPageOptions={[5, 10, 25]}
                    count={data.GrandeursLists.length}
                    rowsPerPage={this.state.rowsPerPage}
                    page={this.state.page}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  />
                </TableRow>
              </TableFooter>
          </Table>;
          }}
           </Query>
      </Paper>
      </div>
      <Dialog
          maxWidth="sm"
          open={this.state.openModal}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
         <Mutation mutation={GrandeurAdd}
         refetchQueries={[{ query: Grandeurs }]}
         onCompleted={()=>this.setState({ openModal: false,success:true,intitule:'',unite:'',resolution:'',offset:'',taille:'' })}
         >
      {(GrandeurAdd, { data,loading, error }) => (
          <form className={classes.form}
        onSubmit={e => {
          e.preventDefault();
          GrandeurAdd({ variables: { intitule: this.state.intitule,unite: this.state.unite,resolution: parseFloat(this.state.resolution),offset: parseFloat(this.state.offset),taille: parseFloat(this.state.taille) } });
        }}
        >
        {console.log("er",error)}
        {error && <CustomizedSnackbars open={this.state.error} variant="error" text="Probléme Serveur"/>}
          <DialogTitle id="form-dialog-title">Formulaire </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {this.state.editData?
            "Modification d'une grandeur physique":
            "Ajout d'une grandeur physique"
              }
            </DialogContentText>
            <TextField
              required={true}
              margin="dense"
              id="intitule"
              label="Intitulé"
              type="TextField"
              fullWidth
              onChange={this.handleInputChange}
              value={this.state.intitule}
            />
            <TextField
            required={true}
              margin="dense"
              id="unite"
              label="Unité"
              type="TextField"
              fullWidth
              onChange={this.handleInputChange}
              value={this.state.unite}
            />
            <TextField
            required={true}
              margin="dense"
              id="resolution"
              label="Résolution"
              type="Number"
              fullWidth
              onChange={this.handleInputChange}
              value={this.state.resolution}
            />
            <TextField
            required={true}
              margin="dense"
              id="offset"
              label="Offset"
              type="Number"
              fullWidth
              onChange={this.handleInputChange}
              value={this.state.offset}
            />
            <TextField
            required={true}
              margin="dense"
              id="taille"
              label="Taille"
              type="Number"
              fullWidth
              onChange={this.handleInputChange}
              value={this.state.taille}
            />
            
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Annuler
            </Button>
            <Button type="submit"  color="primary">
              Confirmer
            </Button>
          </DialogActions>
          </form>
         
          )}
          </Mutation>
        </Dialog>



        <Dialog
          maxWidth="sm"
          open={this.state.openEditModal}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
         <Mutation mutation={GrandeurUpdate}
         refetchQueries={[{ query: Grandeurs }]}
         onCompleted={()=>this.setState({ openEditModal: false,success:true,intitule:'',unite:'',resolution:'',offset:'',taille:'' })}
         >
      {(GrandeurUpdate, { data,loading, error }) => (
          <form className={classes.form}
        onSubmit={e => {
          e.preventDefault();
          GrandeurUpdate({ variables: {id:this.state.idToEdit,data:{ intitule: this.state.intitule,unite: this.state.unite,resolution: parseFloat(this.state.resolution),offset: parseFloat(this.state.offset),taille: parseFloat(this.state.taille)} } });
        }}
        >
        {console.log("er",error)}
        {error && <CustomizedSnackbars open={this.state.error} variant="error" text="Probléme Serveur"/>}
          <DialogTitle id="form-dialog-title">Formulaire </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {this.state.editData?
            "Modification d'une grandeur physique":
            "Ajout d'une grandeur physique"
              }
            </DialogContentText>
            <TextField
              required={true}
              margin="dense"
              id="intitule"
              label="Intitulé"
              type="TextField"
              fullWidth
              onChange={this.handleInputChange}
              value={this.state.intitule}
            />
            <TextField
            required={true}
              margin="dense"
              id="unite"
              label="Unité"
              type="TextField"
              fullWidth
              onChange={this.handleInputChange}
              value={this.state.unite}
            />
            <TextField
            required={true}
              margin="dense"
              id="resolution"
              label="Résolution"
              type="Number"
              fullWidth
              onChange={this.handleInputChange}
              value={this.state.resolution}
            />
            <TextField
            required={true}
              margin="dense"
              id="offset"
              label="Offset"
              type="Number"
              fullWidth
              onChange={this.handleInputChange}
              value={this.state.offset}
            />
            <TextField
            required={true}
              margin="dense"
              id="taille"
              label="Taille"
              type="Number"
              fullWidth
              onChange={this.handleInputChange}
              value={this.state.taille}
            />
            
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Annuler
            </Button>
            <Button type="submit"  color="primary">
              Confirmer
            </Button>
          </DialogActions>
          </form>
         
          )}
          </Mutation>
        </Dialog>



        <Dialog
          open={this.state.openDeleteModal}
          onClose={this.handleCloseDelete}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
         <Mutation mutation={GrandeurRemove}
         refetchQueries={[{ query: Grandeurs }]}
         onCompleted={()=>this.setState({ openDeleteModal: false,success:true})}
         >
      {(GrandeurRemove, { data,loading, error }) => (
          <form className={classes.form}
        onSubmit={e => {
          e.preventDefault();
          GrandeurRemove({ variables: { id: this.state.idToDelete } });
        }}
        >
        {error && <CustomizedSnackbars open={this.state.error} variant="error" text="Probléme Serveur"/>}
          <DialogTitle id="alert-dialog-title">Supprimer une grandeur physique</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
            voulez-vous vraiment supprimer cette grandeur physique ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseDelete} color="primary">
              Refuser
            </Button>
            <Button type="submit"  color="primary" autoFocus>
              Accepter
            </Button>
          </DialogActions>
          </form>
          )}
          </Mutation>
        </Dialog>
      </span>
    );
  }
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired
};
export const Grandeurs = gql`
query getGrandeurs{
  GrandeursLists {
    _id
    intitule
    unite
    resolution
    offset
    taille
  }
}
   `;
   const GrandeurAdd = gql`
  mutation GrandeurAdd($intitule: String!,$unite: String!,$resolution: Float!,$offset: Float!,$taille: Float!) {
    GrandeurAdd(intitule: $intitule,unite: $unite,resolution: $resolution,offset: $offset,taille: $taille) {
      intitule
      unite
      resolution
      offset
      taille
    }
  }
`; 
const GrandeurRemove=gql`
mutation GrandeurRemove($id: ID!) {
  GrandeurRemove(id:$id) {
  intitule
  unite
  resolution
  offset
  taille
}}
`;
const GrandeurUpdate=gql`
mutation GrandeurUpdate($id: ID!,$data:GrandeurInput!) {
  GrandeurUpdate(id:$id,data:$data) {
  intitule
  unite
  resolution
  offset
  taille
}}
`;
export default withStyles(styles)(SimpleTable);
