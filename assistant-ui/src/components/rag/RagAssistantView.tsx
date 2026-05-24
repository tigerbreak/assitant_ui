import { useState } from 'react'
import { Message, Reference } from '../../types/index'
import { initialMessages } from '../../data/mockData'
import MessageBubble from './MessageBubble'
import ChatInput from './ChatInput'
import RefPanel from './RefPanel'

interface RagAssistantViewProps {
  activeRef: Reference | null
  setActiveRef: (ref: Reference | null) => void
}

export default function RagAssistantView({ activeRef, setActiveRef }: RagAssistantViewProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages)

  const handleSend = (text: string) => {
    setMessages([...messages, { id: Date.now(), role: 'user', content: text }])
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: 'assistant',
          content: `正在检索企业运维知识库...\n针对您询问的 "${text}"，已定位到相关网络和安全组配置。请优先检查内网交换机安全组策略的 80/443 端口放行状态，并比对网关路由表。`,
          refs: [
            {
              title: '📄 生产网络拓扑与策略配置指南.docx',
              score: '0.89',
              text: '区域网络突发无法连接时，需核对核心交换机 ACL 规则。若涉及跨区通信，重点排查大流量导致的云企业网（CEN）带宽限流。',
            },
          ],
        },
      ])
    }, 800)
  }

  const handleRefClick = (ref: Reference) => {
    setActiveRef(ref)
  }

  return (
    <div className="flex-1 flex h-full animate-fade-in">
      {/* 对话主画布 */}
      <div className="flex-1 flex flex-col h-full border-r border-slate-800">
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} onRefClick={handleRefClick} />
          ))}
        </div>
        <ChatInput onSend={handleSend} />
      </div>

      {/* 右侧：RAG 详情抽屉 */}
      <RefPanel activeRef={activeRef} onClose={() => setActiveRef(null)} />
    </div>
  )
}
