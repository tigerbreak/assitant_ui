import { useState } from 'react'
import { Message } from '../../types/message'
import { mockMessages } from '../../data/mockData'
import { MessageBubble } from './MessageBubble'
import { ChatInput } from './ChatInput'

export function ChatContainer() {
  const [messages, setMessages] = useState<Message[]>(mockMessages)
  const [isLoading, setIsLoading] = useState(false)

  const handleSend = (content: string) => {
    // 添加用户消息
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    }
    setMessages([...messages, userMessage])

    // 模拟 AI 回复
    setIsLoading(true)
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `这是对"${content}"的模拟回复。在实际项目中，这里会调用 RAG API。`,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiMessage])
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="flex flex-col h-[calc(100vh-200px)]">
      {/* 消息列表 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className="animate-fade-in">
            <MessageBubble message={message} />
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-200 rounded-lg px-4 py-2">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 输入区域 */}
      <div className="border-t border-gray-200 p-4 bg-white">
        <ChatInput onSend={handleSend} isLoading={isLoading} />
      </div>
    </div>
  )
}
