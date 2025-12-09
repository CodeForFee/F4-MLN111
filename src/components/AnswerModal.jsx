import { useEffect } from 'react'
import './AnswerModal.css'

function AnswerModal({ isOpen, isCorrect, meme, explanation, onClose, onContinue }) {
  useEffect(() => {
    if (isOpen) {
      // Auto close after 4 seconds
      const timer = setTimeout(() => {
        onContinue()
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [isOpen, onContinue])

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onContinue}>
      <div className={`modal-content ${isCorrect ? 'modal-correct' : 'modal-incorrect'}`} onClick={(e) => e.stopPropagation()}>
        <div className="modal-meme">
          {meme?.type === 'gif' ? (
            <img 
              src={meme.url} 
              alt={meme.text}
              className="meme-gif"
              loading="eager"
            />
          ) : (
            <div className="meme-emoji-large">{meme?.content}</div>
          )}
          <div className="meme-text-large">{meme?.text}</div>
        </div>
        
        <div className="modal-explanation">
          <p className="explanation-label-modal">Giải thích:</p>
          <p className="explanation-text-modal">{explanation}</p>
        </div>

        <button className="modal-continue-btn" onClick={onContinue}>
          Tiếp tục →
        </button>
      </div>
    </div>
  )
}

export default AnswerModal

