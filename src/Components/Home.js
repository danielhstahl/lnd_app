import React from 'react'

import { connect } from 'react-redux' 
import PropTypes from 'prop-types'
export const Home=({

})=><div>home</div>

Home.propTypes={
    //handleConnect:PropTypes.func.isRequired //
}

const mapStateToProps=({signin, connection})=>({
    isConnecting:connection.isConnecting,
    ...signin
})
const mapDispatchToProps=dispatch=>({
    //handleConnect:getConnectionInformation(dispatch)
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)