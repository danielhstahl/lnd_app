import React from 'react'
import { connect } from 'react-redux' 
import StandardLightningError from './StandardLightningError'
import PropTypes from 'prop-types'
import {
    CONNECT_UNLOCKED
} from 'Actions/actionDefinitions'
export const ShowLockedMessage=({connectStatus, children})=>connectStatus===CONNECT_UNLOCKED?children:<StandardLightningError/>

ShowLockedMessage.propTypes={
    connectStatus:PropTypes.string.isRequired,
    children:PropTypes.node.isRequired
}

const mapStateToProps=({connection})=>({
    connectStatus:connection.connectStatus
})

export default connect(
    mapStateToProps
)(ShowLockedMessage)