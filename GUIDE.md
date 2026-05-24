# 运维 AI 助手工作台 — React 工程化项目实战 Guide

> 从 `test.html` 单文件原型到完整 React + TypeScript + TailwindCSS 工程化项目
> 共 **6 个 Phase**，**18 个 Step**，严格还原原型的暗色主题、侧边导航、RAG 对话+引用抽屉、Jira 数据看板等全部视觉细节

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
- [测试验证清单](#测试验证清单)
- [常见问题](#常见问题)
- [下一步学习建议](#下一步学习建议)

---

## 概述

本 Guide 带你将 `test.html` 单文件 HTML 原型转化为基于 **Vite + React + TypeScript + TailwindCSS** 的工程化项目。原型是一个运维 AI 助手工作台，包含两个核心视图：

| 视图 | 功能 |
|------|------|
| **运维知识库 (RAG Flow)** | 对话界面 + 知识库引用召回 + 右侧引用详情抽屉 |
| **Jira 数据 Insight** | AI Summary 三栏 + 统计柱状图/进度条 + 工单表格 + AI 提问面板 |

**技术选型说明：**

| 选择 | 原因 |
|------|------|
| Vite（非 Next.js） | SPA 架构更直观，无 SSR/路由复杂度，与 `test.html` 浏览器渲染模式更接近 |
| TypeScript | 提前定义数据结构（Message、Reference、JiraTicket），避免运行时错误 |
| TailwindCSS v4 | 原子化 CSS，原型本身就用 Tailwind 类名，迁移成本最低 |
| Font Awesome 6 | 原型中大量使用 FA 图标，迁移需保持一致 |

**学习目标：**

- 掌握 React 核心概念：JSX、组件、Props、State、Hooks（`useState`）
- 理解 TypeScript 在前端项目中的实际应用（interface、可选属性、联合类型）
- 学会工程化项目组织：类型、数据、组件分层
- 从 `test.html` 单文件 → 拆分为 **14 个独立组件文件**
- 理解 HTML `class` → React `className` 的转换
- 理解受控组件（Controlled Component）和事件处理

---

## 先决条件

### 需要安装的工具

| 工具 | 最低版本 | 用途 |
|------|----------|------|
| Node.js | 18.x+ | JavaScript 运行时 |
| npm | 9+ | 包管理器 |
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

> **目标**：搭建 Vite + React + TypeScript + TailwindCSS + Font Awesome 开发环境

### Step 1.1: 创建 Vite 项目

**学习点**：`npm create vite` 使用脚手架快速生成项目骨架。`--template react-ts` 选择 React + TypeScript 模板。

```bash
npm create vite@latest assistant-ui --template react-ts
cd assistant-ui
npm install
```

> **⚠️ PowerShell 注意事项**：在 PowerShell 中 `--` 参数分隔符可能不会被正确识别。如果进入交互式选择界面，手动选择 **React** → **TypeScript** 即可。也可以用一行命令避免交互：`npm create vite@latest assistant-ui --template react-ts`（去掉 `--` 分隔符）。

> **⚠️ 工作目录注意事项**：确保所有 `npm install` 命令都在 `assistant-ui/` 目录内执行。不要在父目录重复执行 `npm install`，否则会产生两套 `node_modules` 导致 React 版本冲突（报错："Invalid hook call"）。

生成文件结构：
```
assistant-ui/
├── package.json          # 依赖管理、npm 脚本
├── tsconfig.json         # TypeScript 编译配置
├── vite.config.ts        # Vite 构建配置
├── index.html            # SPA HTML 入口
└── src/
    ├── main.tsx          # React 入口
    ├── App.tsx           # 根组件
    ├── App.css           # （后续删除）
    └── assets/           # （后续删除）
```

**验证**：运行 `npm run dev`，打开 `http://localhost:5173`，应看到 Vite 默认欢迎页。修改 `src/App.tsx` 的文字，保存后浏览器应即时更新（HMR 热更新）。

### Step 1.2: 安装并配置 TailwindCSS

**学习点**：TailwindCSS 是原子化 CSS 框架，通过 class 名直接应用样式。v4 版本通过 Vite 插件集成，无需 postcss 配置。

```bash
npm install -D tailwindcss @tailwindcss/vite
```

修改 `vite.config.ts`：

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

### Step 1.3: 安装 Font Awesome 图标库

**学习点**：在 React 中使用 Font Awesome 需要安装 React 封装包 + 图标包。

```bash
npm install @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons
```

### Step 1.4: 清理模板 + 配置全局样式

**学习点**：删除脚手架示例代码，保持项目整洁。`index.css` 是全局样式入口，`@import "tailwindcss"` 启用 Tailwind 工具类。

删除 `src/App.css` 和 `src/assets/`。

修改 `src/index.css`，**仅保留 Tailwind 入口和布局基础样式**，删除 Vite 模板自带的 `:root` 变量、`#root` 居中限制等冲突样式：

```css
@import "tailwindcss";

#root {
  width: 100%;
  height: 100vh;
  display: flex;
}

body {
  margin: 0;
  overflow: hidden;
}
```

> **⚠️ `@import` 必须位于文件最顶部**：CSS 规范要求所有 `@import` 语句必须放在任何其他样式声明之前（除了 `@charset` 和 `@layer`）。

> **⚠️ 必须清除 Vite 模板的 `#root` 默认样式**：Vite 生成的 `#root { width: 1126px; margin: 0 auto; }` 会限制布局宽度并居中，导致全屏布局（如 Sidebar 贴左、RefPanel 右侧抽屉）无法正常渲染。必须替换为 `width: 100%; height: 100vh;`。

修改 `index.html`：

```html
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>运维 AI 助手工作台</title>
  </head>
  <body class="bg-slate-950 text-slate-100 overflow-hidden">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

> **关键差异**：注意 `class` 在 HTML 中使用，而 JSX 中要改用 `className`。

**验证**：修改 `src/App.tsx` 为 `<div className="bg-slate-950 text-white p-4">Hello Ops</div>`，应看到深色背景上的白色文字。

---

## Phase 2: 类型定义

> **目标**：使用 TypeScript 定义项目中的数据结构，养成"先定义数据，再写组件"的好习惯

### Step 2.1: 定义核心类型

**学习点**：`interface` 用于定义对象结构；`?` 表示可选属性；联合类型（`|`）用于限定取值范围。将类型与 UI 代码分离，是工程化的核心思想。

创建 `src/types/index.ts`：

```ts
export interface Reference {
  title: string    // 引用文档标题
  score: string    // RAG 召回重合度（如 "0.94"）
  text: string     // 分块切片内容
}

export interface Message {
  id: number
  role: 'user' | 'assistant'
  content: string
  refs?: Reference[]   // 可选：仅 assistant 消息有引用
}

export interface JiraTicket {
  key: string      // 工单编号（如 "OPS-1024"）
  summary: string  // 摘要
  assignee: string // 负责人
}
```

### Step 2.2: 提取 Mock 数据

**学习点**：数据与 UI 分离，后续替换为真实 API 时只需改数据源，不影响组件代码。

创建 `src/data/mockData.ts`：

```ts
import { Message, JiraTicket } from '../types/index'

export const initialMessages: Message[] = [
  {
    id: 1,
    role: 'user',
    content: '今天K8s集群节点报错 0/3 nodes are available: 3 Insufficient cpu. 怎么处理？',
  },
  {
    id: 2,
    role: 'assistant',
    content: '该错误表明您的 K8s 集群中没有任何节点具备足够的空闲 CPU 来调度新的 Pod。',
    refs: [
      {
        title: '📄 核心集群故障排查预案.md',
        score: '0.94',
        text: '当集群出现 Insufficient cpu 时，优先排查高能耗非核心 Pod，或触发 HPA 与集群节点自动扩容策略。生产环境需紧急核对 Resource Request 配置...',
      },
      {
        title: '📄 K8s资源调优规范_v2.pdf',
        score: '0.81',
        text: '过大的 Request CPU 会导致调度器拒绝排产。生产环境建议将 limit 与 request 的比例保持在 2:1 到 4:1 之间，避免资源超卖引发瘫痪。',
      },
    ],
  },
]

export const jiraTickets: JiraTicket[] = [
  {
    key: 'OPS-1024',
    summary: '核心产线 MySQL 读写分离集群从库同步延迟严重',
    assignee: '张大宝 (DBA)',
  },
  {
    key: 'OPS-1192',
    summary: '北京二区 VPC 网络安全组规则同步执行失败',
    assignee: '李小强 (网络组)',
  },
]
```

**验证**：运行 `npx tsc --noEmit`，应无类型错误。

> **⚠️ `verbatimModuleSyntax` 规则**：Vite 默认生成的 `tsconfig.app.json` 中启用了 `"verbatimModuleSyntax": true`，这意味着**纯类型导入必须使用 `import type`**。例如：
> ```ts
> // ✅ 正确
> import type { Message, JiraTicket } from '../types/index'
> 
> // ❌ 错误 — 会报 "does not provide an export"
> import { Message, JiraTicket } from '../types/index'
> ```
> 本 Guide 中的代码均使用正确的 `import type` 语法，请注意保持一致。

---

## Phase 3: 主框架 App 组件

> **目标**：迁移 `test.html` 的 App 主布局（左侧导航 + 顶部 Header + Tab 切换），理解组件拆分和 Props 传递

### Step 3.1: 创建 Sidebar 组件

**学习点**：从 `test.html` 提取左侧 `w-16 bg-slate-900` 导航栏。`class` 改为 `className`，这是 JSX 语法要求。使用 `@fortawesome/react-fontawesome` 替代 `<i class="fa-solid fa-...">`。

创建 `src/components/Sidebar.tsx`：

```tsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faBrain } from '@fortawesome/free-solid-svg-icons'

export default function Sidebar() {
  return (
    <div className="w-16 bg-slate-900 border-r border-slate-800 flex flex-col items-center py-4 justify-between shrink-0">
      <div className="flex flex-col items-center gap-6 w-full">
        <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-md">Ops</div>
        <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 cursor-not-allowed text-xs">
          <FontAwesomeIcon icon={faHome} />
        </div>
        <div className="w-10 h-10 rounded-xl bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center text-xs">
          <FontAwesomeIcon icon={faBrain} />
        </div>
      </div>
      <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs text-slate-400">⚡</div>
    </div>
  )
}
```

> **关键转换**：HTML 中的 `<i class="fa-solid fa-home"></i>` → React 中的 `<FontAwesomeIcon icon={faHome} />`

### Step 3.2: 创建 Header 组件

**学习点**：Props 类型定义 + 事件回调函数 props。Header 接收 `currentAssistant` 和 `onSwitch` 两个 props，实现受控的 Tab 切换。

创建 `src/components/Header.tsx`：

```tsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSliders, faRobot, faChartPie } from '@fortawesome/free-solid-svg-icons'

interface HeaderProps {
  currentAssistant: string
  onSwitch: (mode: string) => void
}

export default function Header({ currentAssistant, onSwitch }: HeaderProps) {
  return (
    <header className="h-16 bg-slate-900/60 border-b border-slate-800 px-6 flex items-center justify-between shadow-sm shrink-0">
      <div className="flex items-center gap-4">
        <span className="text-xs text-slate-400 font-medium">
          <FontAwesomeIcon icon={faSliders} className="mr-1" /> 场景助手切换:
        </span>
        <div className="bg-slate-950 p-1 rounded-xl flex gap-1 border border-slate-800/80">
          <button
            onClick={() => onSwitch('rag')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              currentAssistant === 'rag'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FontAwesomeIcon icon={faRobot} className="text-[10px]" /> 运维知识库 (RAG Flow)
          </button>
          <button
            onClick={() => onSwitch('jira')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              currentAssistant === 'jira'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FontAwesomeIcon icon={faChartPie} className="text-[10px]" /> Jira 数据 Insight
          </button>
        </div>
      </div>
      <div className="flex items-center gap-3 text-xs text-slate-400">
        <span className="flex items-center gap-1.5 bg-slate-950 px-2 py-1 rounded border border-slate-800">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> RAG 引擎已连
        </span>
        <span className="flex items-center gap-1.5 bg-slate-950 px-2 py-1 rounded border border-slate-800">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Jira API 正常
        </span>
      </div>
    </header>
  )
}
```

### Step 3.3: 组装 App 主组件

**学习点**：`useState` Hook 管理 `currentAssistant` 和 `activeRef` 状态。条件渲染：`currentAssistant === 'rag' ? <RagAssistantView/> : <JiraInsightView/>`。

修改 `src/App.tsx`：

```tsx
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
      <Sidebar />
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <Header currentAssistant={currentAssistant} onSwitch={setCurrentAssistant} />
        {currentAssistant === 'rag' ? (
          <RagAssistantView activeRef={activeRef} setActiveRef={setActiveRef} />
        ) : (
          <JiraInsightView />
        )}
      </div>
    </div>
  )
}
```

**验证**：需完成 Phase 4 和 Phase 5 创建所有子组件后才能看到完整页面。在此之前可临时注释掉尚未创建的组件导入和 JSX 引用来预览 Sidebar + Header：

```tsx
// 注释尚未创建的组件导入
// import RagAssistantView from './components/rag/RagAssistantView'
// import JiraInsightView from './components/jira/JiraInsightView'

// 用 {/* */} 注释 JSX 中的组件引用（仅注释 import 不够，JSX 引用也会报错）
{/*currentAssistant === 'rag' ? (
  <RagAssistantView ... />
) : (
  <JiraInsightView />
)*/}
```

> **关键概念**：JSX 中的 `{/* */}` 是 React 特有的注释语法——`{}` 表示 JS 表达式插值，`/* */` 是内部的块级注释。不要误写成 `<!-- -->` 或仅用 `/* */`。

---

## Phase 4: RagAssistantView 组件

> **目标**：完整迁移 RAG 知识库对话组件，学习 State 管理、受控组件、条件渲染

### Step 4.1: 创建 MessageBubble 组件

**学习点**：条件样式渲染（用户蓝色气泡 vs AI 暗色气泡）、Props 传递深度、`.map()` 渲染引用标签。

创建 `src/components/rag/MessageBubble.tsx`：

```tsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookOpen } from '@fortawesome/free-solid-svg-icons'
import { Message, Reference } from '../../types/index'

interface MessageBubbleProps {
  message: Message
  onRefClick: (ref: Reference) => void
}

export default function MessageBubble({ message, onRefClick }: MessageBubbleProps) {
  return (
    <div className={`flex gap-4 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
      {message.role === 'assistant' && (
        <div className="w-8 h-8 rounded-full bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center text-sm shrink-0">🤖</div>
      )}
      <div className={`p-4 rounded-xl max-w-2xl text-sm leading-relaxed ${
        message.role === 'user'
          ? 'bg-blue-600 text-white rounded-tr-none'
          : 'bg-slate-900 border border-slate-800 rounded-tl-none'
      }`}>
        <p className="whitespace-pre-line">{message.content}</p>
        {message.refs && (
          <div className="mt-4 pt-3 border-t border-slate-800">
            <div className="text-xs text-slate-500 font-semibold mb-2">
              <FontAwesomeIcon icon={faBookOpen} className="mr-1" /> 知识库参考来源 (RAG 召回明细)：
            </div>
            <div className="flex flex-wrap gap-2">
              {message.refs.map((ref, idx) => (
                <button
                  key={idx}
                  onClick={() => onRefClick(ref)}
                  className="text-xs bg-slate-800 hover:bg-slate-700 text-blue-400 border border-slate-700 px-2 py-1 rounded transition-colors flex items-center gap-1.5"
                >
                  {ref.title}
                  <span className="bg-blue-500/20 text-[10px] px-1 rounded text-blue-300">重合度: {ref.score}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
```

> **关键概念**：`onRefClick` 是一个回调函数 prop，从深层子组件向上传递事件，这是 React "数据流向下、事件流向上" 的核心模式。

### Step 4.2: 创建 ChatInput 组件

**学习点**：受控组件（`value` + `onChange` 绑定 state）、键盘事件处理（`onKeyDown` 检测 Enter 键）。

创建 `src/components/rag/ChatInput.tsx`：

```tsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { useState, KeyboardEvent } from 'react'

interface ChatInputProps {
  onSend: (text: string) => void
}

export default function ChatInput({ onSend }: ChatInputProps) {
  const [input, setInput] = useState('')

  const handleSend = () => {
    if (!input.trim()) return
    onSend(input.trim())
    setInput('')
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSend()
  }

  return (
    <div className="p-4 bg-slate-900/30 border-t border-slate-800">
      <div className="max-w-3xl mx-auto relative flex items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="输入运维故障表现、配置命令查询... (如：网关超时504怎么排查？)"
          className="w-full bg-slate-900 border border-slate-800 pl-4 pr-12 py-3 rounded-xl focus:outline-none focus:border-blue-500 text-sm shadow-inner text-slate-200"
        />
        <button
          onClick={handleSend}
          className="absolute right-3 p-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          <FontAwesomeIcon icon={faPaperPlane} className="text-xs" />
        </button>
      </div>
    </div>
  )
}
```

> **关键概念**：受控组件中 `<input>` 的 `value` 绑定到 `input` state，`onChange` 更新 state。这使 React 完全掌控输入框的值。

### Step 4.3: 创建 RefPanel 组件（右侧引用抽屉）

**学习点**：联合类型 Props（`Reference | null`）、条件渲染（`if (!activeRef) return null`）。

创建 `src/components/rag/RefPanel.tsx`：

```tsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileLines, faXmark, faCopy, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import { Reference } from '../../types/index'

interface RefPanelProps {
  activeRef: Reference | null
  onClose: () => void
}

export default function RefPanel({ activeRef, onClose }: RefPanelProps) {
  if (!activeRef) return null

  return (
    <div className="w-80 bg-slate-900 p-4 flex flex-col justify-between border-l border-slate-800 animate-fade-in">
      <div>
        <div className="flex justify-between items-center pb-3 border-b border-slate-800 mb-4">
          <span className="text-xs font-bold text-slate-400">
            <FontAwesomeIcon icon={faFileLines} className="mr-1" /> 原始分块切片 (Chunk)
          </span>
          <button onClick={onClose} className="text-slate-500 hover:text-white text-xs">
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        <h4 className="text-sm font-bold text-blue-400 mb-2">{activeRef.title}</h4>
        <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs text-slate-300 leading-relaxed max-h-[400px] overflow-y-auto">
          {activeRef.text}
        </div>
      </div>
      <div className="flex gap-2 pt-3 border-t border-slate-800 mt-4">
        <button className="flex-1 bg-blue-600/10 border border-blue-500/20 text-blue-400 text-xs py-2 rounded-lg hover:bg-blue-600/20 transition-colors">
          <FontAwesomeIcon icon={faCopy} className="mr-1" /> 复制引用
        </button>
        <button className="flex-1 bg-slate-800 border border-slate-700 text-slate-300 text-xs py-2 rounded-lg hover:bg-slate-700 transition-colors">
          <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="mr-1" /> 查看原文
        </button>
      </div>
    </div>
  )
}
```

### Step 4.4: 创建 RagAssistantView 组装

**学习点**：数组状态更新（`setMessages([...messages, newMsg])` 创建新数组触发重新渲染）、`setTimeout` 异步模拟 AI 响应。

创建 `src/components/rag/RagAssistantView.tsx`：

```tsx
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
          content: `正在检索企业运维知识库...\n针对您询问的 "${text}"，已定位到相关网络和安全组配置。`,
          refs: [
            {
              title: '📄 生产网络拓扑与策略配置指南.docx',
              score: '0.89',
              text: '区域网络突发无法连接时，需核对核心交换机 ACL 规则...',
            },
          ],
        },
      ])
    }, 800)
  }

  return (
    <div className="flex-1 flex h-full animate-fade-in">
      <div className="flex-1 flex flex-col h-full border-r border-slate-800">
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} onRefClick={setActiveRef} />
          ))}
        </div>
        <ChatInput onSend={handleSend} />
      </div>
      <RefPanel activeRef={activeRef} onClose={() => setActiveRef(null)} />
    </div>
  )
}
```

**验证**：切换到 RAG 视图，应看到初始对话消息。输入文字发送后，用户消息立即出现，800ms 后 AI 回复出现。点击引用标签，右侧抽屉展开。

---

## Phase 5: JiraInsightView 组件

> **目标**：迁移 Jira 数据看板，学习组件化展示静态数据、内联样式与 Tailwind 混合使用

### Step 5.1: 创建 AISummary 组件

**学习点**：网格布局（`grid grid-cols-3`）、组件内数据展示、数据驱动渲染。

创建 `src/components/jira/AISummary.tsx`：

```tsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTriangleExclamation, faStopwatch, faShieldHalved } from '@fortawesome/free-solid-svg-icons'

export default function AISummary() {
  const cards = [
    { icon: faTriangleExclamation, color: 'text-red-400', bg: 'bg-red-600/10 border-red-500/20', title: '趋势预警', content: '本周工单激增 38%，主要集中在数据库同步延迟与 VPC 策略下发。' },
    { icon: faStopwatch, color: 'text-amber-400', bg: 'bg-amber-600/10 border-amber-500/20', title: '效能瓶颈', content: '平均 MTTR 由 1.2h 上升至 2.4h，瓶颈在于跨部门协同审批流程过长。' },
    { icon: faShieldHalved, color: 'text-emerald-400', bg: 'bg-emerald-600/10 border-emerald-500/20', title: '风险规避', content: '建议开启变更冻结窗口：禁止非核心变更上线，直至 OPS-1024 和 OPS-1192 闭环。' },
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
```

### Step 5.2: 创建 StatsCards 组件

**学习点**：内联样式（`style={{ width: '40%' }}`）与 Tailwind 类名混合使用。纯 CSS 柱状图/进度条替代图表库。

创建 `src/components/jira/StatsCards.tsx`：

```tsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTicket, faClock, faChartBar } from '@fortawesome/free-solid-svg-icons'

export default function StatsCards() {
  const stats = [
    { icon: faTicket, label: '未解决工单', value: '23', color: 'text-rose-400', bgColor: 'bg-rose-600/10', borderColor: 'border-rose-500/20' },
    { icon: faClock, label: 'MTTR (平均修复时间)', value: '2.4h', color: 'text-amber-400', bgColor: 'bg-amber-600/10', borderColor: 'border-amber-500/20' },
    { icon: faChartBar, label: '风险分类占比', value: '高危 38%', color: 'text-emerald-400', bgColor: 'bg-emerald-600/10', borderColor: 'border-emerald-500/20' },
  ]

  return (
    <div className="p-4 bg-slate-900/30 border-b border-slate-800">
      <div className="grid grid-cols-3 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className={`p-4 rounded-xl border ${stat.bgColor} ${stat.borderColor}`}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-slate-400">{stat.label}</span>
              <FontAwesomeIcon icon={stat.icon} className={`${stat.color} text-sm`} />
            </div>
            <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
            {idx === 2 && (
              <div className="mt-3">
                <div className="flex justify-between text-[10px] text-slate-500 mb-1"><span>高危</span><span>中危</span><span>低危</span></div>
                <div className="flex gap-1 h-2">
                  <div className="bg-rose-500 rounded-l" style={{ width: '38%' }} />
                  <div className="bg-amber-500" style={{ width: '40%' }} />
                  <div className="bg-emerald-500 rounded-r" style={{ width: '22%' }} />
                </div>
              </div>
            )}
            {idx === 0 && (
              <div className="mt-2">
                <div className="flex justify-between text-[10px] text-slate-500 mb-1"><span>本周趋势</span></div>
                <div className="flex gap-1 items-end h-6">
                  <div className="bg-rose-500/60 rounded" style={{ width: '14%', height: '40%' }} />
                  <div className="bg-rose-500/60 rounded" style={{ width: '14%', height: '60%' }} />
                  <div className="bg-rose-500/60 rounded" style={{ width: '14%', height: '45%' }} />
                  <div className="bg-rose-500/60 rounded" style={{ width: '14%', height: '75%' }} />
                  <div className="bg-rose-500/60 rounded" style={{ width: '14%', height: '55%' }} />
                  <div className="bg-rose-500/60 rounded" style={{ width: '14%', height: '85%' }} />
                  <div className="bg-rose-500 rounded" style={{ width: '14%', height: '100%' }} />
                </div>
              </div>
            )}
            {idx === 1 && (
              <div className="mt-2">
                <div className="flex justify-between text-[10px] text-slate-500 mb-1"><span>目标: 1.5h</span></div>
                <div className="w-full bg-slate-800 rounded h-2">
                  <div className="bg-amber-500 rounded h-2" style={{ width: '80%' }} />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
```

### Step 5.3: 创建 TicketTable 组件

**学习点**：`map()` 渲染表格行、`key` prop 的重要性（每个 `<tr>` 必须有唯一的 `key`）。

创建 `src/components/jira/TicketTable.tsx`：

```tsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWandMagicSparkles } from '@fortawesome/free-solid-svg-icons'
import { JiraTicket } from '../../types/index'

interface TicketTableProps {
  tickets: JiraTicket[]
}

export default function TicketTable({ tickets }: TicketTableProps) {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-slate-300">
          <FontAwesomeIcon icon={faWandMagicSparkles} className="mr-1.5 text-indigo-400" /> 工单列表
        </h3>
        <span className="text-xs text-slate-500 bg-slate-800 px-2 py-0.5 rounded">共 {tickets.length} 条</span>
      </div>
      <div className="overflow-x-auto rounded-lg border border-slate-800">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-slate-400 uppercase bg-slate-900/50">
            <tr><th className="p-3">工单编号</th><th className="p-3">摘要</th><th className="p-3">负责人</th><th className="p-3 text-center">AI 操作</th></tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket.key} className="hover:bg-slate-800/30 transition-colors border-t border-slate-800/50">
                <td className="p-3 font-mono text-indigo-400">{ticket.key}</td>
                <td className="p-3">{ticket.summary}</td>
                <td className="p-3 text-slate-300">{ticket.assignee}</td>
                <td className="p-3 text-center">
                  <button className="bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 hover:bg-indigo-600 hover:text-white px-2 py-0.5 rounded transition-all text-[11px]">
                    <FontAwesomeIcon icon={faWandMagicSparkles} className="mr-1" /> AI 诊断
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
```

### Step 5.4: 创建 JiraQuestionPanel 组件

**学习点**：组件复用思想——该组件与 `ChatInput` 结构相似（输入框 + 发送按钮），但使用 indigo 主题色。

创建 `src/components/jira/JiraQuestionPanel.tsx`：

```tsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faNetworkWired, faLink } from '@fortawesome/free-solid-svg-icons'

export default function JiraQuestionPanel() {
  return (
    <div className="w-80 bg-slate-900 border-l border-slate-800 flex flex-col justify-between">
      <div className="p-4 space-y-4">
        <div className="text-xs font-bold text-slate-400 pb-2 border-b border-slate-800">
          <FontAwesomeIcon icon={faNetworkWired} className="mr-1" /> Jira 提问上下文
        </div>
        <div className="bg-slate-950 p-3 rounded-lg border border-indigo-500/10 text-xs text-slate-400 leading-relaxed">
          <span className="text-emerald-400"><FontAwesomeIcon icon={faLink} className="mr-1" /> 已自动绑定：</span>当前看板所关联的 142 项迭代效能数据流与 Jira REST API。
        </div>
        <div className="text-xs text-slate-500">
          <span className="text-slate-400 font-semibold block mb-1">💡 快捷输入提示：</span>
          尝试输入："分析 OPS-1024 为什么超时？"
        </div>
      </div>
      <div className="p-4 bg-slate-950/40 border-t border-slate-800">
        <div className="relative flex items-center">
          <input type="text" placeholder="对当前 Jira 看板数据继续追问..."
            className="w-full bg-slate-950 border border-slate-800 pl-3 pr-10 py-2.5 rounded-lg focus:outline-none focus:border-indigo-500 text-xs text-slate-200" />
          <button className="absolute right-2.5 p-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded transition-colors text-xs">➔</button>
        </div>
      </div>
    </div>
  )
}
```

### Step 5.5: 创建 JiraInsightView 组装

**学习点**：组件嵌套、Flex 布局组合（左侧 flex-1 数据看板 + 右侧 w-80 提问面板）。

创建 `src/components/jira/JiraInsightView.tsx`：

```tsx
import { jiraTickets } from '../../data/mockData'
import AISummary from './AISummary'
import StatsCards from './StatsCards'
import TicketTable from './TicketTable'
import JiraQuestionPanel from './JiraQuestionPanel'

export default function JiraInsightView() {
  return (
    <div className="flex-1 flex h-full animate-fade-in">
      <div className="flex-1 flex flex-col h-full overflow-y-auto border-r border-slate-800">
        <AISummary />
        <StatsCards />
        <TicketTable tickets={jiraTickets} />
      </div>
      <JiraQuestionPanel />
    </div>
  )
}
```

**验证**：切换到 Jira 视图，应看到 AI Summary 三栏卡片、统计柱状图/进度条、工单表格（OPS-1024 + OPS-1192）、右侧提问面板。

---

## Phase 6: 整合打磨

> **目标**：整合所有组件，添加动画，端到端验证完整功能

### Step 6.1: 添加 CSS 自定义动画

**学习点**：Tailwind 内置动画（`animate-pulse`、`animate-bounce`）满足部分场景。复杂动画通过 `@keyframes` 自定义。

修改 `src/index.css`：

```css
@import "tailwindcss";

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-out forwards;
}
```

> RagAssistantView 和 JiraInsightView 的根 div 都已添加 `animate-fade-in` 类，切换视图时会有淡入效果。

### Step 6.2: 更新 `src/main.tsx` 入口

**学习点**：React 18 使用 `createRoot` API（替代 React 17 的 `ReactDOM.render`）。`StrictMode` 在开发模式下会双重渲染，帮助发现副作用问题。

修改 `src/main.tsx`：

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

### Step 6.3: 端到端验证

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
| 暗色主题 | 打开页面 | 整体 `slate-950` 深色背景 |
| 左侧导航 | 查看左侧 | `w-16` 固定栏，"Ops" 图标 + 功能图标 |
| Tab 切换 | 点击两个 Tab | blue/indigo 胶囊切换，内容区域无闪烁 |
| 状态指示 | 查看右上角 | 两个绿色圆点脉冲动画 + "已连/正常" 文字 |
| RAG 初始消息 | 进入 RAG 视图 | 显示 K8s CPU 问题对话 |
| RAG 引用标签 | 查看 AI 回复下方 | 两个引用按钮 + 重合度分数（0.94, 0.81） |
| RAG 发送消息 | 输入文字 + 回车 | 用户消息立即追加（蓝色气泡） |
| RAG AI 回复 | 发送后等待 | 800ms 后 AI 回复出现 + 新引用 |
| RAG 引用抽屉 | 点击引用标签 | 右侧 w-80 抽屉展开，显示 chunk 文本 |
| RAG 关闭抽屉 | 点击抽屉 ✕ | 抽屉消失 |
| Jira AI Summary | 切换到 Jira | 三栏卡片（趋势预警/效能瓶颈/风险规避） |
| Jira 统计卡片 | 查看统计区域 | 未解决工单柱状图 + MTTR 进度条 + 风险占比条形图 |
| Jira 工单表格 | 查看表格 | OPS-1024 + OPS-1192 两行数据 + AI 诊断按钮 |
| Jira 提问面板 | 查看右侧 | 上下文信息 + 输入框（indigo 主题色） |

#### 4. 构建生产版本

```bash
npm run build
```

成功后产物在 `dist/` 目录下。预览：

```bash
npm run preview
```

---

## 最终目录结构

```
assistant-ui/
├── index.html                      # SPA HTML 入口
├── package.json                    # 依赖管理
├── vite.config.ts                  # Vite + React + TailwindCSS 配置
├── tsconfig.json                   # TypeScript 配置
├── src/
│   ├── main.tsx                    # React 入口 (createRoot + StrictMode)
│   ├── App.tsx                     # 根组件 (Sidebar + Header + 条件渲染)
│   ├── index.css                   # 全局样式 + Tailwind + 自定义动画
│   ├── types/
│   │   └── index.ts                # Message / Reference / JiraTicket 类型
│   ├── data/
│   │   └── mockData.ts             # 初始对话消息 + Jira 工单数据
│   └── components/
│       ├── Sidebar.tsx             # 左侧 w-16 极简导航栏
│       ├── Header.tsx              # 顶部 Header + Tab 切换 + 状态指示
│       ├── rag/
│       │   ├── RagAssistantView.tsx  # RAG 对话主组件 (state + 模拟 API)
│       │   ├── MessageBubble.tsx     # 消息气泡 (用户/assistant + 引用)
│       │   ├── ChatInput.tsx         # 输入框 (受控组件 + Enter 键)
│       │   └── RefPanel.tsx          # 知识库引用详情抽屉
│       └── jira/
│           ├── JiraInsightView.tsx   # Jira 看板主组件
│           ├── AISummary.tsx         # AI 总结三栏卡片
│           ├── StatsCards.tsx        # 统计卡片 (柱状图/进度条)
│           ├── TicketTable.tsx       # 工单表格
│           └── JiraQuestionPanel.tsx # 右侧 AI 提问面板
└── test.html                       # 原始 HTML 原型（保留参考）
```

**组件统计**：共 **14 个独立组件文件**（2 布局 + 4 RAG + 5 Jira + App），严格还原 `test.html` 的视觉效果和交互逻辑。

---

## 常见问题

### Q1: `npm create vite` 报错 "command not found"

**解决**：确保 Node.js 已正确安装。

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

### Q4: Font Awesome 图标不显示

**排查步骤**：
1. 确认已安装 `@fortawesome/react-fontawesome` 和 `@fortawesome/free-solid-svg-icons`
2. 检查 import 路径是否正确：`import { faHome } from '@fortawesome/free-solid-svg-icons'`
3. 确认使用 `<FontAwesomeIcon icon={faHome} />` 而非 `<i class="fa-solid fa-home">`

### Q5: 状态更新后 UI 没有刷新

**原因**：React 通过引用比较检测状态变化。直接修改数组/对象不会触发重新渲染。

**错误示例**：
```tsx
messages.push(newMessage)  // ❌ 直接修改原数组
setMessages(messages)
```

**正确示例**：
```tsx
setMessages([...messages, newMessage])  // ✅ 创建新数组
// 或使用函数式更新
setMessages((prev) => [...prev, newMessage])
```

### Q6: 如何接入真实 API？

将 `RagAssistantView` 中的 `setTimeout` 替换为 `fetch` 调用：

```tsx
const handleSend = async (text: string) => {
  setMessages([...messages, { id: Date.now(), role: 'user', content: text }])
  try {
    const response = await fetch('/api/rag/query', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: text }),
    })
    const data = await response.json()
    setMessages((prev) => [...prev, {
      id: Date.now() + 1,
      role: 'assistant',
      content: data.answer,
      refs: data.references,
    }])
  } catch (error) {
    // 处理错误
  }
}
```

---

### Q7: 多层级 `node_modules` 冲突导致 "Invalid hook call"

**现象**：页面报错 `Invalid hook call. Hooks can only be called inside of the body of a function component.`，同时控制台出现 `Cannot read properties of null (reading 'useId')`。

**原因**：在项目目录**之外**（如父目录）也执行了 `npm install`，导致系统中存在两套 React。Vite 解析时可能加载了错误的 React 版本，Hook 内部状态不一致。

**解决方案**：
```bash
# 1. 删除父目录多余的 node_modules 和 package.json
Remove-Item -Recurse -Force ../node_modules
Remove-Item -Force ../package.json
Remove-Item -Force ../package-lock.json

# 2. 在项目目录内重新安装
cd assistant-ui
npm install
```

**预防**：所有 `npm install` 操作始终在 `assistant-ui/` 目录内进行。

### Q8: 导入类型时报错 "does not provide an export named 'X'"

**现象**：`The requested module '...' does not provide an export named 'Reference'`。

**原因**：`tsconfig.app.json` 中启用了 `"verbatimModuleSyntax": true`，要求纯类型（interface、type）必须用 `import type` 导入。

**修复**：
```tsx
// ❌ 错误
import { Reference } from './types/index'

// ✅ 正确
import type { Reference } from './types/index'
```

### Q9: 组件已注释导入但仍报错

**现象**：注释了 `import` 语句后，页面仍然空白，控制台报 `ReferenceError: X is not defined`。

**原因**：只注释了 `import`，但 JSX 中仍在使用该组件变量。JavaScript 模块加载失败或变量未定义时，**整个组件函数抛出异常**，导致已成功导入的组件也无法渲染。

**修复**：JSX 中的组件引用也需要注释掉。JSX 注释使用 `{/* */}` 语法：

```tsx
// ✅ 正确：import 和 JSX 都注释
// import MyComponent from './MyComponent'

return (
  <div>
    <ExistingComponent />
    {/*<MyComponent /> 同时也注释掉 JSX 引用*/}
  </div>
)
```

### Q10: 文件夹名拼写错误导致导入失败

**现象**：`Cannot find module './components/Header'` 或类似错误，但文件明明存在。

**排查**：用 `ls` 或文件管理器对比**实际文件夹名**与代码中的导入路径是否完全一致（区分大小写）。

**示例**：
```
src/
├── compoents/       ← ❌ 拼写错误（少了个 n）
└── components/      ← ✅ 正确的拼写
```

### Q11: `npm create vite` 进入交互界面而非静默创建

**现象**：运行 `npm create vite@latest assistant-ui -- --template react-ts` 后仍然弹出选择菜单。

**原因**：PowerShell 中 `--` 参数分隔符可能不被正确识别。Vite 的 `create` 命令有多种写法：

```bash
# ✅ 方案一（推荐 PowerShell）：去掉 -- 分隔符
npm create vite@latest assistant-ui --template react-ts

# ✅ 方案二：使用 npx
npx create-vite@latest assistant-ui --template react-ts

# ✅ 方案三：手动选择（同样有效）
npm create vite@latest
# → 输入项目名: assistant-ui
# → 选择框架: React
# → 选择变体: TypeScript
```

### Q12: 页面左侧有空隙或 RefPanel 右侧抽屉不显示

**现象**：页面整体居中，左侧 Sidebar 和左边缘之间有空白；点击引用标签后右侧 RefPanel 不弹出。

**原因**：Vite 模板默认的 `index.css` 中 `#root` 设置了固定宽度和居中：

```css
/* ❌ Vite 默认样式 — 限制了全屏布局 */
#root {
  width: 1126px;          /* 固定宽度 */
  margin: 0 auto;         /* 水平居中 */
  text-align: center;     /* 文本居中 */
  border-inline: 1px solid var(--border);
}
```

当 App 需要全屏布局（`w-screen` / `h-screen`）时，`#root` 的宽度限制导致：
- Sidebar 无法贴左（被居中布局推开）
- RefPanel（w-80 = 320px）在聊天区域外没有渲染空间

**修复**：将 `index.css` 的 `#root` 样式替换为全宽布局：

```css
/* ✅ 全屏布局 */
#root {
  width: 100%;
  height: 100vh;
  display: flex;
}

body {
  margin: 0;
  overflow: hidden;
}
```

同时建议删除 `:root` 中 Vite 模板的 CSS 变量和 `h1`/`h2`/`code` 等多余样式，它们与 TailwindCSS 冲突且不会被使用。

---

## 下一步学习建议

完成本 Guide 后，可以继续探索：

| 方向 | 推荐内容 |
|------|----------|
| 状态管理 | Zustand / Redux Toolkit（跨组件状态共享） |
| 路由 | React Router v6（多页面导航） |
| 表单处理 | React Hook Form + Zod（表单验证） |
| API 调用 | TanStack Query / SWR（缓存 + 自动重试） |
| 测试 | Vitest + React Testing Library（组件单元测试） |
| Markdown 渲染 | react-markdown（AI 回复支持 Markdown） |
| 流式响应 | ReadableStream + SSE（RAG 流式输出） |
| 拖拽交互 | dnd-kit（工单卡片拖拽） |
| 代码编辑器 | CodeMirror / Monaco（运维命令输入场景） |
