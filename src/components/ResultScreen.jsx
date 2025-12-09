import { useState, useEffect } from 'react'
import LeaderboardModal from './LeaderboardModal'
import { API_ENDPOINTS } from '../config/api'
import './ResultScreen.css'

function ResultScreen({ result, questions, onRestart }) {
  const [topResults, setTopResults] = useState([])
  const [showLeaderboard, setShowLeaderboard] = useState(false)

  useEffect(() => {
    fetchTopResults()
  }, [])

  const fetchTopResults = async () => {
    try {
      const response = await fetch(`${API_ENDPOINTS.TOP_RESULTS}?limit=5`)
      const data = await response.json()
      if (data.success) {
        setTopResults(data.data)
      }
    } catch (error) {
      console.error('Error fetching top results:', error)
    }
  }

  const getScoreColor = (percentage) => {
    if (percentage >= 80) return '#28a745'
    if (percentage >= 60) return '#ffc107'
    return '#dc3545'
  }

  const getScoreMessage = (percentage) => {
    if (percentage >= 90) return 'Xuất sắc! Bạn đã hiểu rất sâu về triết học Mác-Lênin!'
    if (percentage >= 80) return 'Tuyệt vời! Kiến thức của bạn rất tốt!'
    if (percentage >= 60) return 'Khá tốt! Hãy tiếp tục học hỏi thêm!'
    return 'Cần cố gắng thêm! Hãy đọc lại lý thuyết và thử lại!'
  }

  return (
    <div className="result-container">
      <div className="result-card">
        <div className="result-header">
          <h1 className="result-title">Kết quả Quiz</h1>
        </div>

        <div className="score-section">
          <div className="score-circle" style={{ borderColor: getScoreColor(result.percentage) }}>
            <div className="score-details-large">
              {result.score} / {result.totalQuestions}
            </div>
            <div className="score-label">Số câu</div>
          </div>
        </div>

        <div className="answers-review">
          <div className="answers-list-container">
            <div className="answers-list">
            {result.answers.map((answer, index) => {
              const question = questions.find(q => q.id === answer.questionId)
              if (!question) return null

              return (
                <div key={index} className={`answer-item ${answer.isCorrect ? 'correct' : 'incorrect'}`}>
                  <div className="answer-header">
                    <span className="answer-number">Câu {index + 1}</span>
                    <span className={`answer-status ${answer.isCorrect ? 'correct' : 'incorrect'}`}>
                      {answer.isCorrect ? '✓ ĐÚNG' : '✗ SAI'}
                    </span>
                  </div>
                  <p className="answer-question">{question.question}</p>
                  <div className="answer-details">
                    <p className="answer-your">
                      <strong>Đáp án của bạn:</strong> {question.options[answer.selectedAnswer]}
                    </p>
                    {!answer.isCorrect && (
                      <p className="answer-correct">
                        <strong>Đáp án đúng:</strong> {question.options[question.correctAnswer]}
                      </p>
                    )}
                  </div>
                </div>
              )
            })}
            </div>
          </div>
        </div>

        <div className="result-actions">
          <button onClick={() => setShowLeaderboard(true)} className="leaderboard-button">
            Bảng xếp hạng
          </button>
          <button onClick={onRestart} className="restart-button">
            Chơi lại
          </button>
        </div>
      </div>

      <LeaderboardModal
        isOpen={showLeaderboard}
        topResults={topResults}
        currentPlayerName={result.playerName}
        onClose={() => setShowLeaderboard(false)}
      />
    </div>
  )
}

export default ResultScreen

