import './LeaderboardModal.css'

function LeaderboardModal({ isOpen, topResults, loading, error, currentPlayerName, onClose, onRefresh }) {
  if (!isOpen) return null

  return (
    <div className="leaderboard-modal-overlay" onClick={onClose}>
      <div className="leaderboard-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="leaderboard-modal-header">
          <h2 className="leaderboard-modal-title">Bảng xếp hạng Top 5</h2>
          <div className="leaderboard-modal-actions">
            <button 
              className="leaderboard-modal-refresh" 
              onClick={onRefresh} 
              disabled={loading}
              title="Tải lại dữ liệu"
            >
              ↻
            </button>
            <button className="leaderboard-modal-close" onClick={onClose}>×</button>
          </div>
        </div>
        
        <div className="leaderboard-modal-list">
          {loading && (
            <div className="leaderboard-modal-empty">Đang tải...</div>
          )}
          {!loading && error && (
            <div className="leaderboard-modal-empty error">{error}</div>
          )}
          {!loading && !error && topResults.length > 0 && (
            topResults.map((result, index) => (
              <div 
                key={index} 
                className={`leaderboard-modal-item ${result.playerName === currentPlayerName ? 'current-player' : ''}`}
              >
                <span className="leaderboard-modal-rank">#{index + 1}</span>
                <span className="leaderboard-modal-name">{result.playerName}</span>
                <span className="leaderboard-modal-score">{result.percentage}%</span>
                <span className="leaderboard-modal-details">
                  {result.score}/{result.totalQuestions}
                </span>
              </div>
            ))
          )}
          {!loading && !error && topResults.length === 0 && (
            <div className="leaderboard-modal-empty">
              Chưa có kết quả nào
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default LeaderboardModal



