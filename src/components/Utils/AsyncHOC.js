import React, {Component, Fragment} from 'react'

export default class AsyncHOC extends Component{
    componentDidMount() {
        this.props.onLoad(this.props)
    }
    render(){
        return <Fragment>
            {this.props.children}
        </Fragment>
       //return React.cloneElement(this.props.children, this.props)
    }
}