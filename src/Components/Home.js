import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { connect } from 'react-redux' 
import PropTypes from 'prop-types'
import {
    Route,
    Redirect,
    Switch
} from 'react-router-dom'
import SignIn from './SignIn'
import ConnectionAlert from './ConnectionAlert'
import {signInKeys} from '../Components/signInDefinitions'
const {MACAROON_KEY}=signInKeys
const pushChange=history=>(_, value)=>history.push('/'+value)
const encryptedMacaroon=localStorage.getItem(MACAROON_KEY)
export const Home=({match, history})=>[
    <AppBar position="static" key='appbar'>
        <Tabs value={match.params.tab} onChange={pushChange(history)}>
            <Tab label="Transaction History" value='transaction' />
            <Tab label="Make/Receive a Payment" value='payment' />
            <Tab label="Credentials" value='credentials'/>
        </Tabs>
    </AppBar>,
    <Switch key='switchroutes'>    
        <Route path='/credentials/:type' component={SignIn} key='routecred'/>
        {encryptedMacaroon?
            <Redirect from='/credentials' to='/credentials/password' key='redirectcred'/>:
            <Redirect from='/credentials' to='/credentials/firsttime' key='redirectcred'/>
        }
    </Switch>,
    <ConnectionAlert/>

    
]
Home.propTypes={
    //handleConnect:PropTypes.func.isRequired //
}

const mapStateToProps=({signin, connection})=>({
    //isConnecting:connection.isConnecting,
    ...signin
})
const mapDispatchToProps=dispatch=>({
    //handleConnect:getConnectionInformation(dispatch)
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)