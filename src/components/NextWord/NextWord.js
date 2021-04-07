import React, { Component } from 'react'
import LearnContext from '../../contexts/LearnContext'

class NextWord extends Component {
    static contextType = LearnContext
    
    render() {
        return (
          <div className='NextWord_page'>
             <h2 className='NextWord_header'>Translate the word:</h2>
             <span className="NextWord_next-word">{this.props.nextWord}</span>
              <form className='NextWord_form' onSubmit={this.props.handleSubmitAnswer}>
                <label htmlFor='learn-guess-input'>
                  What's the translation for this word?
                </label> <br/>
                <input
                  name='guess'
                  id='learn-guess-input'
                  className='learn-guess-input'
                  type='text'
                  placeholder='Translation'
                  value={this.props.userResponse}
                  onChange={this.props.handleChange}
                  required
                />
                <button type='submit' className='NextWord_button'>
                  Submit your answer
                </button>
              </form>
              <div className='NextWord_scoreboard'>
                <p>
                  Your total score is:{' '}
                  <span>{this.props.totalScore}</span>
                </p>
                <p>
                  You have answered this word correctly{' '}
                  <span>{this.props.wordCorrectCount}</span> times.
                </p>
                <p>
                  You have answered this word incorrectly{' '}
                  <span>{this.props.wordIncorrectCount}</span> times.
                </p>
              </div>
            </div>
        );
      }
}
 
export default NextWord