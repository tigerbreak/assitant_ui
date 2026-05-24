import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTriangleExclamation, faStopwatch, faShieldHalved } from '@fortawesome/free-solid-svg-icons'

export default function AISummary() {
  const cards = [
    {
      icon: faTriangleExclamation,
      color: 'text-red-400',
      bg: 'bg-red-600/10 border-red-500/20',
      title: '趋势预警',
      content: '本周工单激增 38%，主要集中在 数据库同步延迟 与 VPC 策略下发 两大模块，需紧急扩容研发资源。',
    },
    {
      icon: faStopwatch,
      color: 'text-amber-400',
      bg: 'bg-amber-600/10 border-amber-500/20',
      title: '效能瓶颈',
      content: '平均 MTTR 由 1.2h 上升至 2.4h，瓶颈在于 跨部门协同审批 流程过长（DBA→网络组→安全组）。',
    },
    {
      icon: faShieldHalved,
      color: 'text-emerald-400',
      bg: 'bg-emerald-600/10 border-emerald-500/20',
      title: '风险规避',
      content: '建议开启 变更冻结窗口：禁止非核心变更上线，直至 OPS-1024 和 OPS-1192 闭环，避免雪崩效应。',
    },
  ]

  return (
    <div className="p-4 bg-slate-900/30 border-b border-slate-800">
      <div className="grid grid-cols-3 gap-4">
        {cards.map((card, idx) => (
          <div key={idx} className={`p-4 rounded-xl border ${card.bg}`}>
            <div className={`text-sm font-bold mb-2 ${card.color}`}>
              <FontAwesomeIcon icon={card.icon} className="mr-1.5" /> {card.title}
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">{card.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
