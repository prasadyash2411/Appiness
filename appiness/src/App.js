import React,{Component} from 'react';
import './App.css';
import { connect } from 'react-redux';
import { APP_LOAD, REDIRECT } from './constants/actionTypes';
import { store } from './store';
import { push } from 'react-router-redux';
import { DataTable } from './components'
import { ConnectedRouter } from 'connected-react-router'
import { Route, Switch } from 'react-router'
import LoginForm from './components/LoginForm'
import 'react-toastify/dist/ReactToastify.css';
import { Slide, ToastContainer } from 'react-toastify';

const mapStateToProps = state => ({
  appLoaded: state.common.appLoaded,
  appName: state.common.appName,
  currentUser: state.common.currentUser,
  redirectTo: state.common.redirectTo,
  apiKey: state.common.apiKey,
})

const mapDispatchToProps = dispatch => ({
  onLoad: (payload, apiKey) => dispatch({
    type: APP_LOAD,
    payload,
    apiKey,
    skipTracking: true,

  }),
  onRedirect: (route) => dispatch({ type: REDIRECT, payload: route }),
  clearReducer: () => dispatch({ type: 'CLEAR' }),
});

class App extends Component{
  constructor(props){
    super(props)
  }
  componentWillMount() {
    const token = window.localStorage.getItem('bearer');
    if (token === null) {
      store.dispatch(push('/login'));
      this.props.onRedirect('/login');
    }
    this.props.onLoad(token ? 1 : null, token);
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.history.location !== nextProps.history.location) {
      this.props.onRedirect(nextProps.history.location)
    }
    if (nextProps.redirectTo && nextProps.redirectTo !== this.props.redirectTo) {
      store.dispatch(push(nextProps.redirectTo));
    }
  }

  render(){
    return(
      <div style={{height:'100%'}}>
          <ToastContainer
            autoClose={2000}
            closeOnClick
            transition={Slide}
            pauseOnFocusLoss={false}
        />
        <ConnectedRouter history={this.props.history}>
        <Switch>
          <Route path="/" component={DataTable} exact />
          <Route path="/login" component={LoginForm} exact />
        </Switch>
        </ConnectedRouter>
      </div>
    );
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
