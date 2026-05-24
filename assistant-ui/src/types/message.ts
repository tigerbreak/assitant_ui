// 消息角色类型——限制只能为这三种值
export type MessageRole = 'user' | 'assistant' | 'system'

// 单条消息的结构
export interface Message {
  id: string
  role: MessageRole
  content: string
  timestamp: Date
}
