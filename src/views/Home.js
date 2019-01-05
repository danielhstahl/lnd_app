import React from 'react'
import Sidebar from "components/Sidebar/Sidebar"
import { connect } from 'react-redux' 
import PropTypes from 'prop-types'
import {
    Route,
    Redirect,
    Switch
} from 'react-router-dom'
import ConnectionAlert from './ConnectionAlert'
import ConnectionInfo from './ConnectionInfo'
import image from "assets/img/lightning_australia_small.jpg";
import logo from "assets/img/reactlogo.png"
import appRoutes from 'routes/appRoutes'
import {toggleDrawer} from '../Actions/homeActions'
import { withStyles } from '@material-ui/core/styles'
import Header from 'components/Header/Header'
import homeStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx"
const switchRoutes = (
    <Switch>
      {appRoutes.map((prop, key) =>prop.redirect?
        <Redirect from={prop.path} to={prop.to} key={key} />:
        <Route path={prop.path} component={prop.component} key={key} />
      )}
    </Switch>
)

export const Home=withStyles(homeStyle)(({toggleDrawer, drawer, classes, location, ...rest})=>(
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
            location={location}
            {...rest}
        />
        <div className={classes.mainPanel}>
            <Header
                routes={appRoutes}
                handleDrawerToggle={toggleDrawer}
                location={location}
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
    toggleDrawer:PropTypes.func.isRequired,
    drawer:PropTypes.bool.isRequired,
    location:PropTypes.shape({
        pathname:PropTypes.string.isRequired
    }).isRequired
}

const mapStateToProps=({drawer})=>({
    drawer
})
const mapDispatchToProps=dispatch=>({
    toggleDrawer:toggleDrawer(dispatch)
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)