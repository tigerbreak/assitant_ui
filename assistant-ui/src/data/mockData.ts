import { Message } from '../types/message'
import { Task } from '../types/task'

export const mockMessages: Message[] = [
  {
    id: '1',
    role: 'system',
    content: '你好！我是 RAG 助手，可以回答你的问题。',
    timestamp: new Date('2024-01-01T10:00:00'),
  },
  {
    id: '2',
    role: 'user',
    content: '请解释什么是 React Hooks？',
    timestamp: new Date('2024-01-01T10:01:00'),
  },
  {
    id: '3',
    role: 'assistant',
    content: 'React Hooks 是 React 16.8 引入的特性，让你可以在函数组件中使用 state 和其他 React 特性，而无需编写 class。常用的 Hooks 包括 useState、useEffect、useContext 等。',
    timestamp: new Date('2024-01-01T10:01:30'),
  },
]

export const mockTasks: Task[] = [
  {
    id: 'TASK-1',
    title: '设计数据库 Schema',
    description: '设计用户表和任务表的结构',
    status: 'done',
    priority: 'high',
    assignee: 'Alice',
  },
  {
    id: 'TASK-2',
    title: '实现 API 接口',
    description: '使用 Express 实现 RESTful API',
    status: 'in_progress',
    priority: 'high',
    assignee: 'Bob',
  },
  {
    id: 'TASK-3',
    title: '编写单元测试',
    description: '为核心业务逻辑编写测试用例',
    status: 'todo',
    priority: 'medium',
    assignee: 'Charlie',
  },
  {
    id: 'TASK-4',
    title: '部署到生产环境',
    description: '配置 CI/CD 流水线',
    status: 'todo',
    priority: 'low',
  },
]
