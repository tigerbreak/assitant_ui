// 任务状态——使用 as const 确保类型精确
export const TASK_STATUS = ['todo', 'in_progress', 'done'] as const
export type TaskStatus = (typeof TASK_STATUS)[number]
// 等价于：type TaskStatus = 'todo' | 'in_progress' | 'done'

// 优先级
export const TASK_PRIORITY = ['low', 'medium', 'high'] as const
export type TaskPriority = (typeof TASK_PRIORITY)[number]

// 任务结构
export interface Task {
  id: string
  title: string
  description: string
  status: TaskStatus
  priority: TaskPriority
  assignee?: string  // ? 表示可选字段
}
