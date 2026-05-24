import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import RagAssistantView from './components/rag/RagAssistantView'
import JiraInsightView from './components/jira/JiraInsightView'
import { Reference } from './types/index'

export default function App() {
  const [currentAssistant, setCurrentAssistant] = useState('rag')
  const [activeRef, setActiveRef] = useState<Reference | null>(null)

  return (
    <div className="flex h-screen w-screen bg-slate-950 text-slate-100 overflow-hidden">
      {/* 左侧固定极简导航 */}
      <Sidebar />

      {/* 右侧整体大工作台 */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* 顶部 Header + Tab 切换 */}
        <Header currentAssistant={currentAssistant} onSwitch={setCurrentAssistant} />

        {/* 动态内容 */}
        {currentAssistant === 'rag' ? (
          <RagAssistantView activeRef={activeRef} setActiveRef={setActiveRef} />
        ) : (
          <JiraInsightView />
        )}
      </div>
    </div>
  )
}
