import React from 'react'
import { Link } from 'react-router-dom'
export default ({classes})=>(
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
)