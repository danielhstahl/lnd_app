import React from 'react'
import Button from '@material-ui/core/Button'
import './App.css'
import {
  Route
} from 'react-router-dom'
import SignIn from './Components/SignIn'
//import ConnectionAlerts from './Components/ConnectionAlerts'

export default ()=>(
  <div className="App">
    <Route exact path="/" render={({history})=><Button onClick={()=>history.push('/signin')}>Sign in</Button>}/>
    <Route path="/signin" component={SignIn}/>
  </div>
)
