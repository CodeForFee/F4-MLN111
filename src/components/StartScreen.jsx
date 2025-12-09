import { useState } from 'react'
import './StartScreen.css'

function StartScreen({ onStart }) {
  const [name, setName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (name.trim()) {
      onStart(name.trim())
    }
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
      </div>
    </div>
  )
}

export default StartScreen

