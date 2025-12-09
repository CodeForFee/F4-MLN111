import { useState } from 'react'
import LeaderboardModal from './LeaderboardModal'
import AIUsageModal from './AIUsageModal'
import { API_ENDPOINTS } from '../config/api'
import './StartScreen.css'

function StartScreen({ onStart }) {
  const [name, setName] = useState('')
  const [showAIUsage, setShowAIUsage] = useState(false)
  const [showLeaderboard, setShowLeaderboard] = useState(false)
  const [topResults, setTopResults] = useState([])
  const [loadingLeaderboard, setLoadingLeaderboard] = useState(false)
  const [leaderboardError, setLeaderboardError] = useState('')

  const fetchTopResults = async () => {
    try {
      setLoadingLeaderboard(true)
      setLeaderboardError('')
      const response = await fetch(`${API_ENDPOINTS.TOP_RESULTS}?limit=5`)
      const data = await response.json()
      if (data.success) {
        setTopResults(data.data)
      } else {
        setLeaderboardError('Không tải được bảng xếp hạng')
      }
    } catch (error) {
      setLeaderboardError('Không kết nối được server')
    } finally {
      setLoadingLeaderboard(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (name.trim()) {
      onStart(name.trim())
    }
  }

  const openLeaderboard = () => {
    setShowLeaderboard(true)
    fetchTopResults()
  }

  return (
    <div className="start-screen">
      <div className="start-card">
        <h1 className="title">Quiz Game</h1>
        <h2 className="subtitle">Triết học Mác-Lênin</h2>
        <div className="theme-box">
          <p className="theme-title">Chủ đề:</p>
          <p className="theme-text">
            "Chúng ta kiếm tiền để sống, hay chỉ tồn tại để kiếm ăn qua ngày?"
          </p>
          <p className="theme-description">
            Khám phá bản chất con người và lao động trong triết học Mác-Lênin, 
            phân tích sự khác biệt giữa "sống" và "tồn tại", và tìm hiểu về 
            giải phóng con người khỏi sự tha hóa.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="start-form">
          <input
            type="text"
            placeholder="Nhập tên của bạn"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="name-input"
            required
          />
          <button type="submit" className="start-button">
            Bắt đầu Quiz
          </button>
        </form>
        <button 
          type="button" 
          className="leaderboard-open-button" 
          onClick={openLeaderboard}
        >
          Xem bảng xếp hạng
        </button>
      </div>
      <button 
        onClick={() => setShowAIUsage(true)} 
        className="ai-usage-button"
      >
        AI Usage
      </button>
      <AIUsageModal 
        isOpen={showAIUsage} 
        onClose={() => setShowAIUsage(false)} 
      />
      <LeaderboardModal 
        isOpen={showLeaderboard}
        topResults={topResults}
        loading={loadingLeaderboard}
        error={leaderboardError}
        currentPlayerName={name.trim()}
        onRefresh={fetchTopResults}
        onClose={() => setShowLeaderboard(false)}
      />
    </div>
  )
}

export default StartScreen

