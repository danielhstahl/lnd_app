import React from 'react'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import './App.css'
import { connect } from 'react-redux' 
import {
  Route,
  Redirect
} from 'react-router-dom'
import SignIn from './Components/SignIn'
//import ConnectionAlerts from './Components/ConnectionAlerts'
import {signInKeys} from './Components/signInDefinitions'
import Home from './Components/Home'
const ip=localStorage.getItem(signInKeys.IP_KEY)
const filterLogin=(ip, password)=>{
  if(ip&&!password){
    return <Redirect to='/signin/password' />
  }
  if(!ip&&!password){
    return <Redirect to='/signin/firsttime' />
  }
  else {
    return <Redirect to='/home' />
  }
}
/*{filterLogin(ip, signin.password)}*/
const App=({...signin})=>(
  <Grid container className='app' spacing={16}>
    
    <Route path='/signin/:signintype' exact component={SignIn}/>    
    <Route path='/home' component={Home}/>    
  </Grid>
)
const mapStateToProps=({signin})=>signin
export default connect(
    mapStateToProps,
)(App)
/*<Route exact path="/" render={({history})=><Button onClick={()=>history.push('/signin')}>Sign in</Button>}/>*/