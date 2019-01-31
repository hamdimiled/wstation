import React from 'react';
import PropTypes, { checkPropTypes } from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import CustomizedSnackbars from "./Snackbar";
import Cookies from 'universal-cookie';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

class SignIn extends React.Component  {
  constructor(props){
super(props);
this.email='';
this.password='';
this.state={
  error:false
}
  }
   handleClick=async ()=>{
    this.setState({error:false});
    const response = this.props.mutate({
      query: Login,
      variables: { email: this.email,password:this.password }
    }).then((result)=>{
      if(result){
        if(result.data.Login==true){
          const cookies = new Cookies();
          cookies.set('authenticated', true);
          this.props.history.push("/dashboard");
        }else{
         this.setState({error:true});
         console.log("st",this.state);
console.log("ezer",result.data.Login);
        }
      }else{
        
      }
    },
    (error)=>{
      console.log("error",error);
    }
    );
  }
  _emailChange(text){
this.email=text;
  }
  _passwordChange(text){
this.password=text;
  }
  render(){
    const { classes } = this.props;
  return (
    <main className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form}
        onSubmit={e => {
          e.preventDefault();
          this.handleClick();
        }}
        >
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input type="email" onChange={(text)=>this._emailChange(text.target.value)} id="email" name="email" autoComplete="email" autoFocus />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input  onChange={(text)=>this._passwordChange(text.target.value)} name="password" type="password" id="password" autoComplete="current-password" />
          </FormControl>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign in
          </Button>
        </form>
        {this.state.error &&
        <CustomizedSnackbars open={this.state.error} variant="error" text="Erreur mot de passe"/>
        }
      </Paper>
    </main>
  );
            }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};
export const Login = gql`
mutation Login ($email: String!, $password: String!){
  Login(email: $email,password: $password) 
   }
   `;
export default graphql(Login)(withStyles(styles)(SignIn));