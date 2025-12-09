import './AIUsageModal.css'
import chatgptIcon from '@/assets/icon/chatgpt.png'
import geminiIcon from '@/assets/icon/gemini.jpg'
import claudeIcon from '@/assets/icon/claude.png'

function AIUsageModal({ isOpen, onClose }) {
  if (!isOpen) return null

  return (
    <div className="ai-modal-overlay" onClick={onClose}> 
      <div className="ai-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="ai-modal-header">
          <h2 className="ai-modal-title">AI Usage</h2>
          <button className="ai-modal-close" onClick={onClose}>×</button>
        </div>
        
        <div className="ai-modal-body">
          <div className="ai-usage-item">
            <div className="ai-usage-icon">
              <img src={chatgptIcon} alt="ChatGPT" />
            </div>
            <div className="ai-usage-info">
              <h3 className="ai-usage-name">ChatGPT</h3>
              <p className="ai-usage-description">Tìm hiểu thông tin thuyết trình</p>
            </div>
          </div>

          <div className="ai-usage-item">
            <div className="ai-usage-icon">
              <img src={geminiIcon} alt="Gemini" />
            </div>
            <div className="ai-usage-info">
              <h3 className="ai-usage-name">Gemini</h3>
              <p className="ai-usage-description">Tạo hình ảnh</p>
            </div>
          </div>

          <div className="ai-usage-item">
            <div className="ai-usage-icon">
              <img src={claudeIcon} alt="Claude" />
            </div>
            <div className="ai-usage-info">
              <h3 className="ai-usage-name">Claude</h3>
              <p className="ai-usage-description">UI/UX và Code</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AIUsageModal

