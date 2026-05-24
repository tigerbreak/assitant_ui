import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileLines, faXmark, faCopy, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import { Reference } from '../../types/index'

interface RefPanelProps {
  activeRef: Reference | null
  onClose: () => void
}

export default function RefPanel({ activeRef, onClose }: RefPanelProps) {
  if (!activeRef) return null

  return (
    <div className="w-80 bg-slate-900 p-4 flex flex-col justify-between border-l border-slate-800 animate-fade-in">
      <div>
        <div className="flex justify-between items-center pb-3 border-b border-slate-800 mb-4">
          <span className="text-xs font-bold text-slate-400">
            <FontAwesomeIcon icon={faFileLines} className="mr-1" /> 原始分块切片 (Chunk)
          </span>
          <button onClick={onClose} className="text-slate-500 hover:text-white text-xs">
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        <h4 className="text-sm font-bold text-blue-400 mb-2">{activeRef.title}</h4>
        <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs text-slate-300 leading-relaxed max-h-[400px] overflow-y-auto">
          {activeRef.text}
        </div>
      </div>
      <div className="flex gap-2 pt-3 border-t border-slate-800 mt-4">
        <button className="flex-1 bg-blue-600/10 border border-blue-500/20 text-blue-400 text-xs py-2 rounded-lg hover:bg-blue-600/20 transition-colors">
          <FontAwesomeIcon icon={faCopy} className="mr-1" /> 复制引用
        </button>
        <button className="flex-1 bg-slate-800 border border-slate-700 text-slate-300 text-xs py-2 rounded-lg hover:bg-slate-700 transition-colors">
          <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="mr-1" /> 查看原文
        </button>
      </div>
    </div>
  )
}
