import React, { Component } from 'react'
import LearnContext from '../../contexts/LearnContext'
import LanguageApiService from '../../services/language-api-service'
import NextWord from '../../components/NextWord/NextWord'
import ScorePage from '../../components/ScorePage/ScorePage'
import './LearningRoute.css'

class LearningRoute extends Component {
  static contextType = LearnContext

  state = {
    userResponse: '',
    feedback: false,
    previousIncorrectCount: 0,
    previousCorrectCount: 0,
  }

  componentDidMount() {
    this.context.clearError()
    LanguageApiService.getNextWord()
      .then(res => {
        this.context.setNextWord(res.nextWord)
        this.context.setTotalScore(res.totalScore)
        this.context.setWordCorrectCount(res.wordCorrectCount)
        this.context.setWordIncorrectCount(res.wordIncorrectCount)
      })
      .catch(this.context.setError)
  }

  handleChange = evt => {
    evt.preventDefault()
    let userInput = evt.target.value
    this.setState({ userResponse: userInput })
  }

  handleSubmitAnswer = evt => {
    evt.preventDefault()
    const guess = { guess: this.state.userResponse }
    LanguageApiService.getNextWord()
      .then(res => {
        this.context.setPreviousWord(res.nextWord)
        this.setState({ previousCorrectCount: res.wordCorrectCount })
        this.setState({ previousIncorrectCount: res.wordIncorrectCount })
      })
      .catch(this.context.setError)
      .then(
        LanguageApiService.postGuess(guess)
          .then(res => {
            this.context.clearError()
            this.setState({ feedback: true })
            this.context.setIsCorrect(res.isCorrect)
            this.context.setNextWord(res.nextWord)
            this.context.setTotalScore(res.totalScore)
            this.context.setWordCorrectCount(res.wordCorrectCount)
            this.context.setWordIncorrectCount(res.wordIncorrectCount)
            this.context.setAnswer(res.answer)
            this.context.setGuess(this.state.userResponse)
          })
          .catch(this.context.errror)
      )
  }

  handleNextWord = evt => {
    evt.preventDefault()
    this.setState({ feedback: false })
    this.setState({ userResponse: '' })
  }

  renderNextWord() {
    if (this.state.feedback === true) {
      return (
        <ScorePage
          guess={this.context.guess}
          answer={this.context.answer}
          totalScore={this.context.totalScore}
          previousCorrectCount={this.state.previousCorrectCount}
          previousIncorrectCount={this.state.previousIncorrectCount}
          isCorrect={this.context.isCorrect}
          previousWord={this.context.previousWord}
          handleNextWord={this.handleNextWord}
        />
      )
    } else {
      return (
        <NextWord
          previousWord={this.context.previousWord}
          nextWord={this.context.nextWord}
          userResponse={this.state.userResponse}
          totalScore={this.context.totalScore}
          wordCorrectCount={this.context.wordCorrectCount}
          wordIncorrectCount={this.context.wordIncorrectCount}
          handleSubmitAnswer={this.handleSubmitAnswer}
          handleChange={this.handleChange}
        />
      )
    }
  }
  render() {
    return (
      <section className='LearningRoute'>{this.renderNextWord()}</section>
    )
  }
}

export default LearningRoute
