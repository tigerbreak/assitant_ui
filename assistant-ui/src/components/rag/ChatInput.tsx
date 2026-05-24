import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { useState, KeyboardEvent } from 'react'

interface ChatInputProps {
  onSend: (text: string) => void
}

export default function ChatInput({ onSend }: ChatInputProps) {
  const [input, setInput] = useState('')

  const handleSend = () => {
    if (!input.trim()) return
    onSend(input.trim())
    setInput('')
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend()
    }
  }

  return (
    <div className="p-4 bg-slate-900/30 border-t border-slate-800">
      <div className="max-w-3xl mx-auto relative flex items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="输入运维故障表现、配置命令查询... (如：网关超时504怎么排查？)"
          className="w-full bg-slate-900 border border-slate-800 pl-4 pr-12 py-3 rounded-xl focus:outline-none focus:border-blue-500 text-sm shadow-inner text-slate-200"
        />
        <button
          onClick={handleSend}
          className="absolute right-3 p-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          <FontAwesomeIcon icon={faPaperPlane} className="text-xs" />
        </button>
      </div>
    </div>
  )
}
