import React, { Component } from 'react'

class FeedBackPage extends Component {
    render() { 
        let newCorrect = this.props.previousCorrectCount
        let newIncorrect = this.props.previousIncorrectCount
        this.props.isCorrect === true ? (newCorrect += 1) : (newIncorrect += 1)
        return (  
            <div className='NextWord'>
              <h2 className='NextWord_header'>
                {this.props.isCorrect
                  ? 'You were correct! :D'
                  : 'Good try, but not quite right :('}
              </h2>
              <span className='NextWord_next-word' >{this.props.previousWord}</span>
              <div className='DisplayFeedback'>
                  <p className='feedback'>
                    The correct translation{' '}
                  <span>
                    for {<span className='current__word'>{this.props.previousWord}</span>} was{' '}
                  </span>
                  <span>{this.props.answer}</span> and you chose{' '}
                  <span
                    className={
                      this.props.isCorrect === true ? 'correct__text' : 'incorrect__text'
                    }
                  >
                    {this.props.guess}!
                  </span>
                </p>
                <button className='NextWord_button' onClick={this.props.handleNextWord}>
                  Try another word!
                </button>
            </div>
    
            <div className='NextWord_scoreboard'>
            <div className='DisplayScore'>
            <p>
              Your total score is:{' '}
              <span>{this.props.totalScore}</span>
            </p>
          </div>
              <p>
                Correct answer: <span>{newCorrect}</span>{' '}
                times.
              </p>
              <p>
                Incorrect answer:
                <span>{newIncorrect}</span> times.
              </p>
            </div>
          </div>
        )
    }
}
 
export default FeedBackPage