import { jiraTickets } from '../../data/mockData'
import AISummary from './AISummary'
import StatsCards from './StatsCards'
import TicketTable from './TicketTable'
import JiraQuestionPanel from './JiraQuestionPanel'

export default function JiraInsightView() {
  return (
    <div className="flex-1 flex h-full animate-fade-in">
      {/* 左侧数据看板 */}
      <div className="flex-1 flex flex-col h-full overflow-y-auto border-r border-slate-800">
        <AISummary />
        <StatsCards />
        <TicketTable tickets={jiraTickets} />
      </div>

      {/* 右侧：AI 提问面板 */}
      <JiraQuestionPanel />
    </div>
  )
}
