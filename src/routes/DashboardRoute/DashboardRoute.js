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
    return (
      <section className='Dashboard'>
        <h2>
          Let's practice {this.context.language.name}!
        </h2>
        <Link to='/learn'>
          <button className='Dashboard_button'>Start practicing</button>
        </Link>
        <p>
          Total correct answers: {this.context.language.total_score}
        </p>
        <h3 className='Dashboard_h'>Words to practice</h3>
        <ul className='Dashboard_list'>{this.renderWords()}</ul>
      </section>
    );
  }
}

export default DashboardRoute

