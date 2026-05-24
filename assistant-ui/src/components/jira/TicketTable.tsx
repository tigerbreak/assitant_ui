import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWandMagicSparkles } from '@fortawesome/free-solid-svg-icons'
import { JiraTicket } from '../../types/index'

interface TicketTableProps {
  tickets: JiraTicket[]
}

export default function TicketTable({ tickets }: TicketTableProps) {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-slate-300">
          <FontAwesomeIcon icon={faWandMagicSparkles} className="mr-1.5 text-indigo-400" />
          工单列表
        </h3>
        <span className="text-xs text-slate-500 bg-slate-800 px-2 py-0.5 rounded">
          共 {tickets.length} 条
        </span>
      </div>
      <div className="overflow-x-auto rounded-lg border border-slate-800">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-slate-400 uppercase bg-slate-900/50">
            <tr>
              <th className="p-3">工单编号</th>
              <th className="p-3">摘要</th>
              <th className="p-3">负责人</th>
              <th className="p-3 text-center">AI 操作</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket.key} className="hover:bg-slate-800/30 transition-colors border-t border-slate-800/50">
                <td className="p-3 font-mono text-indigo-400">{ticket.key}</td>
                <td className="p-3">{ticket.summary}</td>
                <td className="p-3 text-slate-300">{ticket.assignee}</td>
                <td className="p-3 text-center">
                  <button className="bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 hover:bg-indigo-600 hover:text-white px-2 py-0.5 rounded transition-all text-[11px]">
                    <FontAwesomeIcon icon={faWandMagicSparkles} className="mr-1" />
                    AI 诊断
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
