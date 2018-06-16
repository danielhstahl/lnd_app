import React from 'react'
//import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import './App.css'
//import { connect } from 'react-redux' 
import {
  Route,
  Redirect,
  Switch
} from 'react-router-dom'

//import ConnectionAlerts from './Components/ConnectionAlerts'
import Home from './Components/Home'
export default ()=>(
  <Grid container className='app' spacing={16}>
    <Switch>
      <Route path='/:tab' component={Home}/>     
      <Redirect from='/' to='/credentials' exact/>
    </Switch>
  </Grid>
)
