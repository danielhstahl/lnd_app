import React from 'react'
import Sidebar from "components/Sidebar/Sidebar"
import Grid from '@material-ui/core/Grid'
import { connect } from 'react-redux' 
import PropTypes from 'prop-types'
import {
    Route,
    Redirect,
    Switch
} from 'react-router-dom'
import SignIn from './SignIn'
import ConnectionAlert from './ConnectionAlert'
import ConnectionInfo from './ConnectionInfo'
import image from "assets/img/lightning_australia.jpg";
import logo from "assets/img/reactlogo.png"
import appRoutes from 'routes/appRoutes'
import {toggleDrawer} from '../Actions/homeActions'
import { withStyles } from '@material-ui/core/styles'
import Header from 'components/Header/Header'

//import {encryptedMacaroon} from '../utils/localStorage'
//const pushChange=history=>(_, value)=>history.push('/'+value)
import homeStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx"
const switchRoutes = (
    <Switch>
      {appRoutes.map((prop, key) =>prop.redirect?
        <Redirect from={prop.path} to={prop.to} key={key} />:
        <Route path={prop.path} component={prop.component} key={key} />
      )}
    </Switch>
)

export const Home=withStyles(homeStyle)(({toggleDrawer, drawer, classes, ...rest})=>(
    <div>
        <Sidebar
            routes={appRoutes}
            logoText='Lightning App'
            logo={logo}
            image={image}
            handleDrawerToggle={toggleDrawer}
            open={drawer}
            color="blue"
            ExtraInfo={ConnectionInfo}
            {...rest}
        />
        <div className={classes.mainPanel}>
            <Header
                routes={appRoutes}
                handleDrawerToggle={toggleDrawer}
                {...rest}
            />
            <div className={classes.content}>
                <div className={classes.container}>{switchRoutes}</div>
            </div>
        </div>
        <ConnectionAlert/> 
     </div>
))

Home.propTypes={
    //handleConnect:PropTypes.func.isRequired //
}

const mapStateToProps=({drawer})=>({
    //isConnecting:connection.isConnecting,
    drawer
})
const mapDispatchToProps=dispatch=>({
    toggleDrawer:toggleDrawer(dispatch)
    //handleConnect:getConnectionInformation(dispatch)
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)