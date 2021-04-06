import React, { Component } from 'react'

class Words extends Component {
    render() { 
        return (  
                <li className = 'Words_list-item'>
                    <h4 className = 'Words_name'> {this.props.word} </h4>
                        <p> Correct Answers Score: {this.props.correct}</p>
                        <p> Wrong Answers Score: {this.props.incorrectCount}</p>
                </li>
        )
    }
}
 
export default Words