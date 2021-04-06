import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import LanguageContext from '../../contexts/LanguageContext'
import LanguageApiService from '../../services/language-api-service'

import Words from '../../components/Words/Words'
import './DashboardRoute.css'

class DashboardRoute extends Component {
  static contextType = LanguageContext

  componentDidMount() {
    this.context.clearError()
    
    LanguageApiService.getWords()
      .then((res) => {
        this.context.setLanguage(res.language)
        this.context.setWords(res.words)
      })
      .catch(this.context.setError)
  }

  renderWords(){
    const { words = [] } = this.context

    if (words.length === 0) {
      return <p> No Words To Practice </p>;
    }

    return words.map((word) => (
      <Words
        key = {word.id}
        word = {word.original}
        correct = {word.correct_count}
        incorrectCount = {word.incorrect_count}
      />
    ));
  }

  render() {
    console.log(this.context)
    return (
      <section className = 'Dashboard'>
        <h2> Let's Practice {this.context.language.name} </h2>
        <Link to="/learn">
          <button className="start__practicing">Start practicing</button>
        </Link>
        <p> Total Correct Answers: {this.context.language.total_score} </p>
        <h3> Words To Practice: </h3>
          <ul> {this.renderWords()} </ul>
      </section>
    );
  }
}

export default DashboardRoute


