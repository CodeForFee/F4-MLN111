import { useState, useEffect } from 'react'
import Quiz from './components/Quiz'
import StartScreen from './components/StartScreen'
import ResultScreen from './components/ResultScreen'
import { API_ENDPOINTS } from './config/api'
import './App.css'

function App() {
  const [gameState, setGameState] = useState('start') // 'start', 'playing', 'finished'
  const [playerName, setPlayerName] = useState('')
  const [questions, setQuestions] = useState([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState([])
  const [score, setScore] = useState(0)
  const [result, setResult] = useState(null)

  const startGame = (name) => {
    setPlayerName(name)
    setGameState('playing')
    setCurrentQuestionIndex(0)
    setAnswers([])
    setScore(0)
    fetchQuestions()
  }

  const fetchQuestions = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.QUIZ_QUESTIONS)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      if (data.success) {
        setQuestions(data.questions)
      } else {
        console.error('Failed to fetch questions:', data)
        alert('Không thể tải câu hỏi. Vui lòng kiểm tra backend server.')
      }
    } catch (error) {
      console.error('Error fetching questions:', error)
      alert(`Lỗi kết nối đến server: ${error.message}\n\nVui lòng kiểm tra kết nối mạng và backend server.`)
      setGameState('start')
    }
  }

  const handleAnswer = (selectedAnswer) => {
    const currentQuestion = questions[currentQuestionIndex]
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer
    
    const newAnswer = {
      questionId: currentQuestion.id,
      selectedAnswer: selectedAnswer,
      isCorrect: isCorrect
    }

    const newAnswers = [...answers, newAnswer]
    const newScore = isCorrect ? score + 1 : score
    
    setAnswers(newAnswers)
    setScore(newScore)

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      finishGame(newAnswers, newScore)
    }
  }

  const finishGame = async (finalAnswers, finalScore) => {
    const percentage = Math.round((finalScore / questions.length) * 100)
    const resultData = {
      playerName,
      answers: finalAnswers,
      score: finalScore,
      totalQuestions: questions.length,
      percentage
    }

    try {
      const response = await fetch(API_ENDPOINTS.SAVE_RESULT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(resultData)
      })
      const data = await response.json()
      if (data.success) {
        setResult(resultData)
        setGameState('finished')
      }
    } catch (error) {
      console.error('Error saving result:', error)
      // Still show result even if save fails
      setResult(resultData)
      setGameState('finished')
    }
  }

  const resetGame = () => {
    setGameState('start')
    setPlayerName('')
    setQuestions([])
    setCurrentQuestionIndex(0)
    setAnswers([])
    setScore(0)
    setResult(null)
  }

  return (
    <div className="app">
      {gameState === 'start' && (
        <StartScreen onStart={startGame} />
      )}
      {gameState === 'playing' && questions.length === 0 && (
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          height: '100vh',
          color: 'white',
          fontSize: '1.2rem'
        }}>
          Đang tải câu hỏi...
        </div>
      )}
      {gameState === 'playing' && questions.length > 0 && (
        <Quiz
          question={questions[currentQuestionIndex]}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={questions.length}
          onAnswer={handleAnswer}
        />
      )}
      {gameState === 'finished' && result && (
        <ResultScreen
          result={result}
          questions={questions}
          onRestart={resetGame}
        />
      )}
    </div>
  )
}

export default App

