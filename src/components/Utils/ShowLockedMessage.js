import React from 'react'
import { connect } from 'react-redux' 
import {CONNECTION_UNLOCKED} from 'Reducers/connectReducer'
import StandardLightningError from './StandardLightningError'
import PropTypes from 'prop-types'

export const ShowLockedMessage=({connectionStatus, children})=>connectionStatus===CONNECTION_UNLOCKED?children:<StandardLightningError/>

ShowLockedMessage.propTypes={
    connectionStatus:PropTypes.string.isRequired,
    children:PropTypes.node.isRequired
}

const mapStateToProps=({connection})=>({
    connectionStatus:connection.connectionStatus
})

export default connect(
    mapStateToProps
)(ShowLockedMessage)