import React from 'react'
import Button from "components/CustomButtons/Button"
import Grid from "@material-ui/core/Grid"
import GridItem from "components/Grid/GridItem.jsx"
import { Link } from 'react-router-dom'
import CardBody from "components/Card/CardBody.jsx"
import Card from "components/Card/Card.jsx"
import { withStyles } from '@material-ui/core/styles'

const styles={
    description:{
        textAlign:'left'
    }
}


export default withStyles(styles)(({classes})=>(
<Grid container>
    <GridItem xs={12} sm={12} md={4}>
        <Card profile>
            <CardBody profile>
            <p className={classes.description}>
                Not connected to the Lightning Network!  Go to settings to connect to update connection settings.
            </p>
            <Button color="primary" component={Link} to='/settings' >
                Settings
            </Button>
            </CardBody>
        </Card>
    </GridItem>
</Grid>
))