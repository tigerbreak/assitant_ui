import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTicket, faClock, faChartBar } from '@fortawesome/free-solid-svg-icons'

export default function StatsCards() {
  const stats = [
    {
      icon: faTicket,
      label: '未解决工单',
      value: '23',
      color: 'text-rose-400',
      bgColor: 'bg-rose-600/10',
      borderColor: 'border-rose-500/20',
    },
    {
      icon: faClock,
      label: 'MTTR (平均修复时间)',
      value: '2.4h',
      color: 'text-amber-400',
      bgColor: 'bg-amber-600/10',
      borderColor: 'border-amber-500/20',
    },
    {
      icon: faChartBar,
      label: '风险分类占比',
      value: '高危 38%',
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-600/10',
      borderColor: 'border-emerald-500/20',
    },
  ]

  return (
    <div className="p-4 bg-slate-900/30 border-b border-slate-800">
      <div className="grid grid-cols-3 gap-4">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className={`p-4 rounded-xl border ${stat.bgColor} ${stat.borderColor}`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-slate-400">{stat.label}</span>
              <FontAwesomeIcon icon={stat.icon} className={`${stat.color} text-sm`} />
            </div>
            <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
            {idx === 2 && (
              <div className="mt-3">
                <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                  <span>高危</span><span>中危</span><span>低危</span>
                </div>
                <div className="flex gap-1 h-2">
                  <div className="bg-rose-500 rounded-l" style={{ width: '38%' }} />
                  <div className="bg-amber-500" style={{ width: '40%' }} />
                  <div className="bg-emerald-500 rounded-r" style={{ width: '22%' }} />
                </div>
              </div>
            )}
            {idx === 0 && (
              <div className="mt-2">
                <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                  <span>本周趋势</span>
                </div>
                <div className="flex gap-1 items-end h-6">
                  <div className="bg-rose-500/60 rounded" style={{ width: '14%', height: '40%' }} />
                  <div className="bg-rose-500/60 rounded" style={{ width: '14%', height: '60%' }} />
                  <div className="bg-rose-500/60 rounded" style={{ width: '14%', height: '45%' }} />
                  <div className="bg-rose-500/60 rounded" style={{ width: '14%', height: '75%' }} />
                  <div className="bg-rose-500/60 rounded" style={{ width: '14%', height: '55%' }} />
                  <div className="bg-rose-500/60 rounded" style={{ width: '14%', height: '85%' }} />
                  <div className="bg-rose-500 rounded" style={{ width: '14%', height: '100%' }} />
                </div>
              </div>
            )}
            {idx === 1 && (
              <div className="mt-2">
                <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                  <span>目标: 1.5h</span>
                </div>
                <div className="w-full bg-slate-800 rounded h-2">
                  <div
                    className="bg-amber-500 rounded h-2"
                    style={{ width: '80%' }}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
