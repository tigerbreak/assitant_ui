import { useState } from 'react'
import { Header } from './components/layout/Header'
import { TabNavigation } from './components/layout/TabNavigation'
import { ChatContainer } from './components/chat/ChatContainer'
import { BoardContainer } from './components/board/BoardContainer'

function App() {
  const [activeTab, setActiveTab] = useState<string>('RAG Chat')

  const tabs = ['RAG Chat', 'Jira Board']

  return (
    <div className="min-h-screen bg-gray-100">
      <Header title="Assistant UI" />
      <TabNavigation
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      <main className="max-w-7xl mx-auto px-4 py-6">
        {activeTab === 'RAG Chat' && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <ChatContainer />
          </div>
        )}
        {activeTab === 'Jira Board' && (
          <BoardContainer />
        )}
      </main>
    </div>
  )
}

export default App
