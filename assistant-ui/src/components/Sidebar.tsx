import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faBrain } from '@fortawesome/free-solid-svg-icons'

export default function Sidebar() {
  return (
    <div className="w-16 bg-slate-900 border-r border-slate-800 flex flex-col items-center py-4 justify-between shrink-0">
      <div className="flex flex-col items-center gap-6 w-full">
        <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-md">Ops</div>
        <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 cursor-not-allowed text-xs">
          <FontAwesomeIcon icon={faHome} />
        </div>
        <div className="w-10 h-10 rounded-xl bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center text-xs">
          <FontAwesomeIcon icon={faBrain} />
        </div>
      </div>
      <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs text-slate-400">⚡</div>
    </div>
  )
}
