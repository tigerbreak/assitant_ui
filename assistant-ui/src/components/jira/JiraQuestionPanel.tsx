import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faNetworkWired, faLink } from '@fortawesome/free-solid-svg-icons'

export default function JiraQuestionPanel() {
  return (
    <div className="w-80 bg-slate-900 border-l border-slate-800 flex flex-col justify-between">
      <div className="p-4 space-y-4">
        <div className="text-xs font-bold text-slate-400 pb-2 border-b border-slate-800">
          <FontAwesomeIcon icon={faNetworkWired} className="mr-1" /> Jira 提问上下文
        </div>
        <div className="bg-slate-950 p-3 rounded-lg border border-indigo-500/10 text-xs text-slate-400 leading-relaxed">
          <span className="text-emerald-400"><FontAwesomeIcon icon={faLink} className="mr-1" /> 已自动绑定：</span>当前看板所关联的 142 项迭代效能数据流与 Jira REST API。
        </div>
        <div className="text-xs text-slate-500">
          <span className="text-slate-400 font-semibold block mb-1">💡 快捷输入提示：</span>
          尝试在下方输入："分析 OPS-1024 为什么超时？" 或 "哪个模块的 Bug 堆积最严重？"
        </div>
      </div>
      <div className="p-4 bg-slate-950/40 border-t border-slate-800">
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="对当前 Jira 看板数据继续追问..."
            className="w-full bg-slate-950 border border-slate-800 pl-3 pr-10 py-2.5 rounded-lg focus:outline-none focus:border-indigo-500 text-xs text-slate-200"
          />
          <button className="absolute right-2.5 p-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded transition-colors text-xs">➔</button>
        </div>
      </div>
    </div>
  )
}
