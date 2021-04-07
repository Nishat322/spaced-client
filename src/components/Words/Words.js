import React, { Component } from 'react'

class Words extends Component {
    render() { 
        return (  
                <li className = 'Words_list-item'>
                    <h4 className = 'Words_name'>{this.props.word}</h4>
                        <p> correct answer count: {this.props.correct}</p>
                        <p> incorrect answer count: {this.props.incorrectCount}</p>
                </li>
        )
    }
}
 
export default Words 