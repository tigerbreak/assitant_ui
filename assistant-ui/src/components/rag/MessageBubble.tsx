import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookOpen } from '@fortawesome/free-solid-svg-icons'
import { Message, Reference } from '../../types/index'

interface MessageBubbleProps {
  message: Message
  onRefClick: (ref: Reference) => void
}

export default function MessageBubble({ message, onRefClick }: MessageBubbleProps) {
  return (
    <div className={`flex gap-4 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
      {message.role === 'assistant' && (
        <div className="w-8 h-8 rounded-full bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center text-sm shrink-0">🤖</div>
      )}
      <div className={`p-4 rounded-xl max-w-2xl text-sm leading-relaxed ${
        message.role === 'user'
          ? 'bg-blue-600 text-white rounded-tr-none'
          : 'bg-slate-900 border border-slate-800 rounded-tl-none'
      }`}>
        <p className="whitespace-pre-line">{message.content}</p>

        {message.refs && (
          <div className="mt-4 pt-3 border-t border-slate-800">
            <div className="text-xs text-slate-500 font-semibold mb-2">
              <FontAwesomeIcon icon={faBookOpen} className="mr-1" /> 知识库参考来源 (RAG 召回明细)：
            </div>
            <div className="flex flex-wrap gap-2">
              {message.refs.map((ref, idx) => (
                <button
                  key={idx}
                  onClick={() => onRefClick(ref)}
                  className="text-xs bg-slate-800 hover:bg-slate-700 text-blue-400 border border-slate-700 px-2 py-1 rounded transition-colors flex items-center gap-1.5"
                >
                  {ref.title}
                  <span className="bg-blue-500/20 text-[10px] px-1 rounded text-blue-300">重合度: {ref.score}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
