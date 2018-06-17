import React, {Component} from 'react'

export default class AsyncHOC extends Component{
    componentDidMount() {
        this.props.onLoad(this.props)
    }
    render(){
       return React.cloneElement(this.props.children, this.props)
    }
}