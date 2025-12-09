import { useState } from 'react'
import AnswerModal from './AnswerModal'
import { getRandomCorrectMeme, getRandomIncorrectMeme } from '../data/memes'
import './Quiz.css'

function Quiz({ question, questionNumber, totalQuestions, onAnswer }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [meme, setMeme] = useState(null)
  const [isCorrect, setIsCorrect] = useState(false)

  const handleOptionClick = (index) => {
    if (selectedAnswer !== null) return // Prevent multiple selections
    
    const correct = index === question.correctAnswer
    const memeData = correct ? getRandomCorrectMeme() : getRandomIncorrectMeme()
    
    setSelectedAnswer(index)
    setIsCorrect(correct)
    setMeme(memeData)
    setShowModal(true)
  }

  const handleContinue = () => {
    setShowModal(false)
    onAnswer(selectedAnswer)
    // Reset for next question
    setTimeout(() => {
      setSelectedAnswer(null)
      setMeme(null)
      setIsCorrect(false)
    }, 300)
  }

  const progress = (questionNumber / totalQuestions) * 100

  return (
    <>
      <div className="quiz-container">
        <div className="quiz-card">
          <div className="quiz-header">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }}></div>
            </div>
            <div className="question-counter">
              Câu {questionNumber} / {totalQuestions}
            </div>
          </div>

          <div className="question-section">
            <h2 className="question-text">{question.question}</h2>
          </div>

          <div className="options-section">
            {question.options.map((option, index) => {
              let optionClass = 'option'
              if (selectedAnswer === index) {
                optionClass += question.correctAnswer === index 
                  ? ' option-correct' 
                  : ' option-incorrect'
              } else if (selectedAnswer !== null && question.correctAnswer === index) {
                optionClass += ' option-correct'
              }

              return (
                <button
                  key={index}
                  className={optionClass}
                  onClick={() => handleOptionClick(index)}
                  disabled={selectedAnswer !== null}
                >
                  <span className="option-letter">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="option-text">{option}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <AnswerModal
        isOpen={showModal}
        isCorrect={isCorrect}
        meme={meme}
        explanation={question.explanation}
        onClose={() => setShowModal(false)}
        onContinue={handleContinue}
      />
    </>
  )
}

export default Quiz

