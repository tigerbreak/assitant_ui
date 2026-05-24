import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSliders, faRobot, faChartPie } from '@fortawesome/free-solid-svg-icons'

interface HeaderProps {
  currentAssistant: string
  onSwitch: (mode: string) => void
}

export default function Header({ currentAssistant, onSwitch }: HeaderProps) {
  return (
    <header className="h-16 bg-slate-900/60 border-b border-slate-800 px-6 flex items-center justify-between shadow-sm shrink-0">
      <div className="flex items-center gap-4">
        <span className="text-xs text-slate-400 font-medium">
          <FontAwesomeIcon icon={faSliders} className="mr-1" /> 场景助手切换:
        </span>
        <div className="bg-slate-950 p-1 rounded-xl flex gap-1 border border-slate-800/80">
          <button
            onClick={() => onSwitch('rag')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              currentAssistant === 'rag'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FontAwesomeIcon icon={faRobot} className="text-[10px]" /> 运维知识库 (RAG Flow)
          </button>
          <button
            onClick={() => onSwitch('jira')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              currentAssistant === 'jira'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FontAwesomeIcon icon={faChartPie} className="text-[10px]" /> Jira 数据 Insight
          </button>
        </div>
      </div>
      <div className="flex items-center gap-3 text-xs text-slate-400">
        <span className="flex items-center gap-1.5 bg-slate-950 px-2 py-1 rounded border border-slate-800">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> RAG 引擎已连
        </span>
        <span className="flex items-center gap-1.5 bg-slate-950 px-2 py-1 rounded border border-slate-800">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Jira API 正常
        </span>
      </div>
    </header>
  )
}
