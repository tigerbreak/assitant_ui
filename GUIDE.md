# React 工程化项目实战 Guide

> 从零基础到完整 React + TypeScript + TailwindCSS 项目  
> 共 **6 个 Phase**，**18 个 Step**，最终产物：从单个 HTML 文件拆分为 11 个独立组件的工程化项目

---

## 目录

- [概述](#概述)
- [先决条件](#先决条件)
- [Phase 1: 项目初始化](#phase-1-项目初始化)
- [Phase 2: 类型定义](#phase-2-类型定义)
- [Phase 3: 主框架 App](#phase-3-主框架-app)
- [Phase 4: RAG 对话组件](#phase-4-rag-对话组件)
- [Phase 5: Jira 看板组件](#phase-5-jira-看板组件)
- [Phase 6: 整合打磨](#phase-6-整合打磨)
- [最终目录结构](#最终目录结构)
- [常见问题](#常见问题)

---

## 概述

本 Guide 带你从零开始，使用 **Vite + React + TypeScript + TailwindCSS** 搭建一个包含 **RAG 对话界面** 和 **Jira 看板** 的完整前端项目。

**技术选型说明：**

| 选择 | 原因 |
|------|------|
| Vite（而非 Next.js） | SPA 架构更直观，学习曲线平缓，无 SSR/路由复杂度 |
| TypeScript | 提前定义数据结构，避免运行时错误，养成良好开发习惯 |
| TailwindCSS | 原子化 CSS，快速构建 UI，无需手写复杂样式表 |

**学习目标：**

- 掌握 React 核心概念：JSX、组件、Props、State、Hooks
- 理解 TypeScript 在前端项目中的实际应用
- 学会工程化项目组织：类型、数据、组件分离
- 从 `test.html` 单文件 → 拆分为 **11 个独立组件文件**

---

## 先决条件

### 需要安装的工具

| 工具 | 最低版本 | 用途 |
|------|----------|------|
| Node.js | 18.x+ | JavaScript 运行时 |
| npm / pnpm | npm 9+ / pnpm 8+ | 包管理器 |
| 编辑器 | VS Code（推荐） | 代码编辑 |
| 浏览器 | Chrome / Edge | 开发调试 |

### 验证安装

```bash
node -v    # 应输出 v18.x 或更高
npm -v     # 应输出 9.x 或更高
```

### VS Code 推荐插件

- **ESLint** — 代码检查
- **Prettier** — 代码格式化
- **Tailwind CSS IntelliSense** — Tailwind 智能提示
- **Auto Rename Tag** — 自动重命名配对标签

### 预估时间

- 零基础：约 4-6 小时
- 有前端基础：约 2-3 小时

---

## Phase 1: 项目初始化

> **目标**：搭建 Vite + React + TypeScript + TailwindCSS 开发环境

### Step 1: 创建 Vite 项目 + 验证开发服务器

**学习点**：理解 Vite 作为现代前端构建工具的作用——快速启动、热更新（HMR）、开箱即用的 TypeScript 支持。HMR 让你在修改代码后无需刷新浏览器即可看到变化。

```bash
# 使用 npm 创建项目
npm create vite@latest assistant-ui -- --template react-ts

# 进入项目目录
cd assistant-ui

# 安装依赖
npm install
```

**预期结果**：项目根目录下生成以下文件结构：
```
assistant-ui/
├── package.json
├── tsconfig.json
├── vite.config.ts
├── index.html
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── App.css
│   └── assets/
```

启动开发服务器：
```bash
npm run dev
```

打开浏览器访问 `http://localhost:5173`，应看到 Vite + React 的默认欢迎页面。

**验证**：修改 `src/App.tsx` 中的文字，保存后浏览器应立即更新，无需手动刷新。

### Step 2: 安装并配置 TailwindCSS

**学习点**：TailwindCSS 是原子化 CSS 框架，通过 class 名直接应用样式，无需编写 CSS 文件。

```bash
# 安装 TailwindCSS 及其依赖
npm install -D tailwindcss @tailwindcss/vite
```

修改 `vite.config.ts`：

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})
```

在 `src/index.css` 中引入 Tailwind（替换原有内容）：

```css
@import "tailwindcss";
```

### Step 3: 清理模板代码

**学习点**：实际项目中需要删除脚手架生成的示例代码，保持项目整洁。

删除以下文件：
```bash
rm src/App.css
rm src/assets/react.svg
```

将 `src/App.tsx` 简化为：

```tsx
function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold text-center p-4">
        Assistant UI
      </h1>
    </div>
  )
}

export default App
```

**预期结果**：浏览器显示居中的 "Assistant UI" 标题，背景为浅灰色。

---

## Phase 2: 类型定义

> **目标**：使用 TypeScript 定义项目中的数据结构，理解类型安全的重要性

### Step 4: 定义消息类型

**学习点**：`interface` 用于定义对象结构；联合类型（`|`）用于限定取值范围；类型与数据分离是工程化的核心思想。

创建 `src/types/message.ts`：

```ts
// 消息角色类型——限制只能为这三种值
export type MessageRole = 'user' | 'assistant' | 'system'

// 单条消息的结构
export interface Message {
  id: string
  role: MessageRole
  content: string
  timestamp: Date
}
```

### Step 5: 定义任务类型（Jira 看板用）

**学习点**：`as const` 让 TypeScript 推断为字面量类型而非宽泛的 `string` 类型，提供更精确的类型检查。`?` 表示可选字段。

创建 `src/types/task.ts`：

```ts
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
```

### Step 6: 创建模拟数据 + 索引文件

**学习点**：将数据与 UI 代码分离，便于后续替换为真实 API 数据，同时方便测试。使用 barrel export（`export * from`）简化导入路径，这是工程化项目的常见做法。

创建 `src/data/mockData.ts`：

```ts
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
```

创建 `src/types/index.ts`：

```ts
export * from './message'
export * from './task'
```

创建 `src/data/index.ts`：

```ts
export * from './mockData'
```

**验证**：确保 TypeScript 编译无错误：
```bash
npx tsc --noEmit
```

---

## Phase 3: 主框架 App

> **目标**：搭建应用整体布局，理解 JSX、Props、State 的基本用法

### Step 7: 创建布局组件

**学习点**：组件是 React 的基本构建块。`interface` 定义 Props 类型是 TypeScript + React 的标准做法。将 UI 拆分为独立组件可以提高代码复用性和可维护性。

创建 `src/components/layout/Header.tsx`：

```tsx
interface HeaderProps {
  title: string
}

export function Header({ title }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
      </div>
    </header>
  )
}
```

创建 `src/components/layout/TabNavigation.tsx`：

```tsx
interface TabNavigationProps {
  tabs: string[]
  activeTab: string
  onTabChange: (tab: string) => void
}

export function TabNavigation({ tabs, activeTab, onTabChange }: TabNavigationProps) {
  return (
    <nav className="flex border-b border-gray-200 bg-white">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`px-4 py-3 text-sm font-medium transition-colors ${
            activeTab === tab
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          {tab}
        </button>
      ))}
    </nav>
  )
}
```

### Step 8: 创建组件索引文件

**学习点**：与 types/data 类似，为组件也创建统一的导出入口（barrel export），简化后续导入路径。

创建 `src/components/layout/index.ts`：

```ts
export { Header } from './Header'
export { TabNavigation } from './TabNavigation'
```

### Step 9: 组装 App 主组件

**学习点**：`useState` 是 React 最常用的 Hook，用于在函数组件中添加状态。状态变化会触发组件重新渲染。`useState<string>` 的泛型标注让 TypeScript 推断出 `activeTab` 是 `string` 类型。

修改 `src/App.tsx`：

```tsx
import { useState } from 'react'
import { Header } from './components/layout/Header'
import { TabNavigation } from './components/layout/TabNavigation'

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
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600">
            当前选中: <span className="font-medium text-blue-600">{activeTab}</span>
          </p>
        </div>
      </main>
    </div>
  )
}

export default App
```

**预期结果**：页面顶部显示 Header，下方有两个可点击的 Tab，点击切换高亮状态，内容区域显示当前选中的 Tab 名称。

---

## Phase 4: RAG 对话组件

> **目标**：实现完整的对话界面，理解受控组件、条件渲染、数组状态更新

### Step 10: 创建消息气泡组件

**学习点**：条件渲染——根据不同角色显示不同的样式。模板字符串动态拼接 className 是 React + Tailwind 中常见的模式。

创建 `src/components/chat/MessageBubble.tsx`：

```tsx
import { Message } from '../../types/message'

interface MessageBubbleProps {
  message: Message
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-[70%] rounded-lg px-4 py-2 ${
          isUser
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-900'
        }`}
      >
        <p className="text-sm">{message.content}</p>
        <p className={`text-xs mt-1 ${isUser ? 'text-blue-100' : 'text-gray-500'}`}>
          {message.timestamp.toLocaleTimeString()}
        </p>
      </div>
    </div>
  )
}
```

### Step 11: 创建输入框组件

**学习点**：受控组件——输入框的值由 React state 控制，而非 DOM 自身。`onSubmit` 中 `e.preventDefault()` 阻止表单默认提交行为。`disabled` 属性控制按钮和输入框的可用状态。

创建 `src/components/chat/ChatInput.tsx`：

```tsx
import { useState } from 'react'

interface ChatInputProps {
  onSend: (content: string) => void
  isLoading?: boolean
}

export function ChatInput({ onSend, isLoading = false }: ChatInputProps) {
  const [input, setInput] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() && !isLoading) {
      onSend(input.trim())
      setInput('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="输入你的问题..."
        disabled={isLoading}
        className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
      />
      <button
        type="submit"
        disabled={isLoading || !input.trim()}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? '思考中...' : '发送'}
      </button>
    </form>
  )
}
```

### Step 12: 创建聊天容器组件 + 索引文件

**学习点**：数组状态更新——使用 `setMessages([...messages, newMessage])` 添加新消息。必须创建新数组而非修改原数组（React 通过引用比较检测变化）。函数式更新 `setMessages((prev) => [...prev, newMessage])` 确保基于最新状态计算。

创建 `src/components/chat/ChatContainer.tsx`：

```tsx
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
          <MessageBubble key={message.id} message={message} />
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
```

创建 `src/components/chat/index.ts`：

```ts
export { MessageBubble } from './MessageBubble'
export { ChatInput } from './ChatInput'
export { ChatContainer } from './ChatContainer'
```

**预期结果**：切换到 "RAG Chat" Tab 时，可以看到对话界面，包含历史消息、输入框和发送按钮。发送消息后，1 秒后会收到模拟的 AI 回复。

---

## Phase 5: Jira 看板组件

> **目标**：实现看板界面，理解 Grid 布局、map 渲染列表、内联样式

### Step 13: 创建任务卡片组件

**学习点**：内联样式 `style` prop——对于动态计算的样式（如优先级颜色），使用内联样式。Tailwind 适合静态样式，内联样式适合动态值。理解两者的适用场景。

创建 `src/components/board/TaskCard.tsx`：

```tsx
import { Task } from '../../types/task'

interface TaskCardProps {
  task: Task
}

const priorityColors: Record<string, string> = {
  high: '#ef4444',    // red-500
  medium: '#f59e0b',  // amber-500
  low: '#22c55e',     // green-500
}

const priorityLabels: Record<string, string> = {
  high: '高',
  medium: '中',
  low: '低',
}

export function TaskCard({ task }: TaskCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
      {/* 标题行 */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <span className="text-xs font-mono text-gray-500">{task.id}</span>
        <span
          className="text-xs px-2 py-0.5 rounded-full text-white"
          style={{ backgroundColor: priorityColors[task.priority] }}
        >
          {priorityLabels[task.priority]}
        </span>
      </div>

      {/* 标题 */}
      <h3 className="text-sm font-medium text-gray-900 mb-1">{task.title}</h3>

      {/* 描述 */}
      {task.description && (
        <p className="text-xs text-gray-500 mb-3 line-clamp-2">{task.description}</p>
      )}

      {/* 负责人 */}
      {task.assignee && (
        <div className="flex items-center gap-1">
          <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-medium">
            {task.assignee.charAt(0)}
          </div>
          <span className="text-xs text-gray-600">{task.assignee}</span>
        </div>
      )}
    </div>
  )
}
```

### Step 14: 创建看板列组件

**学习点**：`Array.prototype.filter` + `map` 组合是 React 中渲染列表的标准模式。先用 `filter` 筛选数据，再用 `map` 生成 JSX。空列表的 fallback 渲染也是常见模式。

创建 `src/components/board/BoardColumn.tsx`：

```tsx
import { Task, TaskStatus } from '../../types/task'
import { TaskCard } from './TaskCard'

interface BoardColumnProps {
  status: TaskStatus
  tasks: Task[]
}

const statusConfig: Record<TaskStatus, { title: string; bgColor: string }> = {
  todo: { title: '待办', bgColor: 'bg-gray-100' },
  in_progress: { title: '进行中', bgColor: 'bg-blue-50' },
  done: { title: '已完成', bgColor: 'bg-green-50' },
}

export function BoardColumn({ status, tasks }: BoardColumnProps) {
  const config = statusConfig[status]
  const filteredTasks = tasks.filter((task) => task.status === status)

  return (
    <div className={`${config.bgColor} rounded-lg p-4`}>
      {/* 列标题 */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-medium text-gray-900">{config.title}</h2>
        <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded-full">
          {filteredTasks.length}
        </span>
      </div>

      {/* 任务列表 */}
      <div className="space-y-3">
        {filteredTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
        {filteredTasks.length === 0 && (
          <p className="text-sm text-gray-400 text-center py-4">暂无任务</p>
        )}
      </div>
    </div>
  )
}
```

### Step 15: 创建看板容器 + 索引文件

**学习点**：Grid 响应式布局——`grid-cols-1 md:grid-cols-3` 表示移动端单列，中屏及以上三列。遍历 `TASK_STATUS` 常量数组生成列，保持数据驱动。

创建 `src/components/board/BoardContainer.tsx`：

```tsx
import { TASK_STATUS } from '../../types/task'
import { mockTasks } from '../../data/mockData'
import { BoardColumn } from './BoardColumn'

export function BoardContainer() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {TASK_STATUS.map((status) => (
        <BoardColumn key={status} status={status} tasks={mockTasks} />
      ))}
    </div>
  )
}
```

创建 `src/components/board/index.ts`：

```ts
export { TaskCard } from './TaskCard'
export { BoardColumn } from './BoardColumn'
export { BoardContainer } from './BoardContainer'
```

**预期结果**：切换到 "Jira Board" Tab 时，可以看到三列看板（待办、进行中、已完成），每列显示对应状态的任务卡片，卡片带有优先级颜色标签。

---

## Phase 6: 整合打磨

> **目标**：将所有组件整合到 App 中，添加动画效果，端到端验证

### Step 16: 整合所有组件到 App

**学习点**：条件渲染——根据 Tab 状态决定显示哪个组件（`&&` 运算符）。这是 SPA 中最基础的路由实现方式。对比 Phase 3 的占位内容，现在替换为真实组件。

修改 `src/App.tsx`：

```tsx
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
```

### Step 17: 添加 CSS 动画

**学习点**：Tailwind 内置了一些动画工具类（如 `animate-bounce`、`animate-pulse`）。复杂动画可以通过自定义 CSS 实现，在 `@keyframes` 中定义动画帧。为消息添加淡入效果提升用户体验。

创建 `src/styles/animations.css`：

```css
/* 淡入动画 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}

/* 滑入动画 */
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-slide-in {
  animation: slideIn 0.2s ease-out;
}
```

在 `src/index.css` 中引入：

```css
@import "tailwindcss";
@import "./styles/animations.css";
```

为聊天消息添加动画：修改 `src/components/chat/ChatContainer.tsx` 中的消息列表部分：

```tsx
{/* 消息列表 */}
<div className="flex-1 overflow-y-auto p-4 space-y-4">
  {messages.map((message) => (
    <div key={message.id} className="animate-fade-in">
      <MessageBubble message={message} />
    </div>
  ))}
  {/* ... */}
</div>
```

为看板任务卡片添加动画，修改 `src/components/board/BoardColumn.tsx`：

```tsx
{filteredTasks.map((task) => (
  <div key={task.id} className="animate-slide-in">
    <TaskCard task={task} />
  </div>
))}
```

### Step 18: 端到端验证

**学习点**：完整的开发流程包括最后的验证环节——确保所有功能正常运行，无 TypeScript 错误，构建产物正常。这是实际项目中必不可少的步骤。

#### 1. 类型检查

```bash
npx tsc --noEmit
```

应无错误输出。

#### 2. 启动开发服务器

```bash
npm run dev
```

#### 3. 功能验证清单

| 功能 | 验证方法 | 预期结果 |
|------|----------|----------|
| Tab 切换 | 点击 "RAG Chat" 和 "Jira Board" | 内容区域正确切换 |
| 发送消息 | 在输入框输入文字并点击发送 | 消息出现在列表中，1秒后收到回复 |
| 输入框清空 | 发送消息后 | 输入框自动清空 |
| 加载状态 | 发送消息后 | 按钮显示"思考中..."，输入框禁用 |
| 打字指示器 | 发送消息等待回复时 | 三个弹跳的点 |
| 消息动画 | 发送新消息时 | 消息淡入出现 |
| 看板列渲染 | 切换到 Jira Board | 三列正确显示，任务数量正确 |
| 优先级颜色 | 查看任务卡片 | 高=红色，中=琥珀色，低=绿色 |
| 卡片动画 | 切换到看板时 | 卡片滑入出现 |
| 响应式布局 | 缩放浏览器窗口 | 看板在窄屏变为单列 |

#### 4. 构建生产版本

```bash
npm run build
```

构建成功后，产物在 `dist/` 目录下。可以用以下方式预览：

```bash
npm run preview
```

---

## 最终目录结构

```
assistant-ui/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── src/
│   ├── main.tsx                    # 入口文件
│   ├── App.tsx                     # 根组件
│   ├── index.css                   # 全局样式
│   ├── types/
│   │   ├── index.ts                # 类型导出
│   │   ├── message.ts              # 消息类型定义
│   │   └── task.ts                 # 任务类型定义
│   ├── data/
│   │   ├── index.ts                # 数据导出
│   │   └── mockData.ts             # 模拟数据
│   ├── components/
│   │   ├── layout/
│   │   │   ├── index.ts
│   │   │   ├── Header.tsx          # 顶部导航
│   │   │   └── TabNavigation.tsx   # Tab 切换
│   │   ├── chat/
│   │   │   ├── index.ts
│   │   │   ├── MessageBubble.tsx   # 消息气泡
│   │   │   ├── ChatInput.tsx       # 输入框
│   │   │   └── ChatContainer.tsx   # 聊天容器
│   │   └── board/
│   │       ├── index.ts
│   │       ├── TaskCard.tsx        # 任务卡片
│   │       ├── BoardColumn.tsx     # 看板列
│   │       └── BoardContainer.tsx  # 看板容器
│   └── styles/
│       └── animations.css          # 自定义动画
└── dist/                           # 构建产物
```

**组件统计**：共 **11 个独立组件文件**，与 chatbot-ui/ragflow 的工程化组织方式一致。

---

## 常见问题

### Q1: `npm create vite` 报错 "command not found"

**解决**：确保 Node.js 已正确安装。如果使用的是旧版 npm，可以尝试：

```bash
npx create-vite@latest assistant-ui -- --template react-ts
```

### Q2: TailwindCSS 样式不生效

**排查步骤**：
1. 确认 `vite.config.ts` 中已添加 `tailwindcss()` 插件
2. 确认 `src/index.css` 中包含 `@import "tailwindcss";`
3. 确认组件使用了 `className`（不是 `class`）
4. 重启开发服务器：`Ctrl+C` 后重新 `npm run dev`

### Q3: TypeScript 报错 "找不到模块"

**排查步骤**：
1. 检查文件路径是否正确（区分大小写）
2. 确认已创建对应的 `index.ts` 导出文件
3. 运行 `npx tsc --noEmit` 查看详细错误信息

### Q4: 状态更新后 UI 没有刷新

**原因**：React 通过引用比较检测状态变化。直接修改数组/对象不会触发重新渲染。

**错误示例**：
```tsx
messages.push(newMessage)  // ❌ 直接修改原数组
setMessages(messages)
```

**正确示例**：
```tsx
setMessages([...messages, newMessage])  // ✅ 创建新数组
```

### Q5: 热更新（HMR）不工作

**解决**：
1. 检查终端是否有编译错误
2. 确保文件扩展名正确（`.tsx` 而非 `.ts`）
3. 尝试重启开发服务器

### Q6: 如何接入真实 API？

**扩展方向**：将 `ChatContainer` 中的 `setTimeout` 替换为 `fetch` 调用：

```tsx
const handleSend = async (content: string) => {
  // ...添加用户消息逻辑...
  
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: content }),
    })
    const data = await response.json()
    // ...处理响应...
  } catch (error) {
    // ...处理错误...
  }
}
```

---

## 下一步学习建议

完成本 Guide 后，可以继续探索：

| 方向 | 推荐内容 |
|------|----------|
| 状态管理 | Zustand / Redux Toolkit |
| 路由 | React Router v6 |
| 表单处理 | React Hook Form + Zod |
| API 调用 | TanStack Query (React Query) |
| 测试 | Vitest + React Testing Library |
| 拖拽交互 | dnd-kit（用于看板拖拽） |
| 流式响应 | ReadableStream + SSE（用于 RAG 流式输出） |
