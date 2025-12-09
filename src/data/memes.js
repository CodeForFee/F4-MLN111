// Import GIF từ thư mục assets
import correct1 from '../assets/memes/correct1.gif'
import correct2 from '../assets/memes/correct2.gif'
import correct3 from '../assets/memes/correct3.gif'

import incorrect1 from '../assets/memes/incorrect.gif'
import incorrect2 from '../assets/memes/wrong.gif'
import incorrect3 from '../assets/memes/keepitup.gif'

// Danh sách meme đúng
export const correctMemes = [
  { type: 'gif', url: correct1, text: 'Tuyệt vời!' },
  { type: 'gif', url: correct2, text: 'Chính xác!' },
  { type: 'gif', url: correct3, text: 'Xuất sắc!' },
]

// Danh sách meme sai
export const incorrectMemes = [
  { type: 'gif', url: incorrect1, text: 'Sai rồi!' },
  { type: 'gif', url: incorrect2, text: 'Không đúng!' },
  { type: 'gif', url: incorrect3, text: 'Cần cố gắng!' },
]

// Hàm lấy ngẫu nhiên
export const getRandomCorrectMeme = () => {
  return correctMemes[Math.floor(Math.random() * correctMemes.length)]
}

export const getRandomIncorrectMeme = () => {
  return incorrectMemes[Math.floor(Math.random() * incorrectMemes.length)]
}
