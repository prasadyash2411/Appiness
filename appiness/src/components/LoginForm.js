import React,{Component} from "react"
import '../App.css';
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import { Container, Input, DialogTitle } from '@material-ui/core';
import { connect } from 'react-redux';
import {
  LOGIN,
  LOGIN_PAGE_UNLOADED,
} from '../constants/actionTypes';
import agent from '../agent';
import { toast } from 'react-toastify';

class LoginForm extends Component{
    constructor(props){
      super(props);

      this.state={
        open: false,
        clicked: false,
        openForm:false,
        fields:{},
        errors:{}
      }

      this.handleChange = this.handleChange.bind(this)
      this.submitLoginForm = this.submitLoginForm.bind(this)
      this.validateForm=this.validateForm.bind(this)
    }
    componentWillReceiveProps(nextProps) {
      if(nextProps !== this.props){
        console.log('props', nextProps)
        toast.error(nextProps.message)
      }
    }
  
    handleChange(e){
      let { fields } = this.state
      fields[e.target.name] = e.target.value
      this.setState({
        fields
      });
    }

    submitLoginForm(e){
      e.preventDefault();
      if(this.validateForm()){
        this.props.onSubmit(this.state.fields);
      }
    }

    validateForm(){
      let fields = this.state.fields;
      let errors = {};
      let formIsValid = true;
      if (!fields["password"]) {
        formIsValid = false;
        errors["password"] = "*Please enter your password.";
      }
      else if (!fields["password"].length > 8) {
        formIsValid = false;
        errors["password"] = "*Password must be greater than 8 characters.";
      }

      this.setState({
        errors: errors
      });
      return formIsValid;
    }

  render(){ 
    return(
      <Container className="login_route">
      <center>
        <Dialog
            open={true} //changed
            aria-labelledby="responsive-dialog-title"
        >
          <form method="post" onSubmit={this.submitLoginForm}>
            <DialogTitle id="responsive-dialog-title" >{"LOGIN TO ACCOUNT"}</DialogTitle>
            <Input
                type="email"
                className="loginInput"
                placeholder="Email Id"
                name="email"
                value={this.state.fields.email}
                onChange={this.handleChange}
            />
            <div>
              {this.state.errors.email}
            </div>
            <Input
                type="password"
                className="loginInput"
                placeholder="Password"
                name="password"
                value={this.state.fields.password}
                onChange={this.handleChange}
            />
            <div>
              {this.state.errors.password}
            </div>
            <DialogActions>
              <Button type="submit" className="loginButton" onClick={()=>{console.log(this.state.fields)}}>LOGIN</Button>
            </DialogActions>
            <div className="spacer"></div>
          </form>
        </Dialog>
        </center>
      </Container>
    );
  }
}
  
  LoginForm.propTypes={
    fullScreen: PropTypes.bool.isRequired,
  }
const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
  onRedirect: () => dispatch({ type: 'REDIRECT' }),
  onSubmit: ({ email, password }) => dispatch({ type: LOGIN, payload: agent.Auth.login(email, password) }),
  onUnload: () => dispatch({ type: LOGIN_PAGE_UNLOADED }),
});
  
  export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);

