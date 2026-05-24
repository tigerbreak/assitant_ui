# 1. OBJECTIVE

将 `test.html` 单文件 HTML 原型（运维 AI 助手工作台）转化为基于 React 框架的工程化项目。**必须严格还原 test.html 的视觉效果和交互逻辑**，包括暗色主题、左侧导航栏、RAG 对话+引用抽屉、Jira 数据看板+统计图表等全部细节。采用 **Vite + React + TypeScript + TailwindCSS** 技术栈，参考 chatbot-ui 和 RAGFlow 的前端架构理念，通过分步实施帮助开发者系统学习 React 开发流程。

# 2. CONTEXT SUMMARY

* **源文件**: `test.html` - 单个 HTML 文件，通过 CDN 引入 React/Babel/Tailwind，包含三个核心组件：
  - `RagAssistantView` - RAG 知识库对话界面（消息列表 + 知识库引用抽屉）
  - `JiraInsightView` - Jira 数据看板界面（统计图表 + 工单表格 + AI 提问）
  - `App` - 主框架（左侧导航栏 + 顶部 Header + Tab 切换）
* **参考项目**:
  - `chatbot-ui` (mckaywrigley): Next.js + Tailwind 架构，组件化组织方式
  - `ragflow` (infiniflow): React 前端 + 文档管理与对话界面
* **技术选型**: Vite + React + TypeScript + TailwindCSS（轻量易学，适合从 HTML 渐进迁移）
* **状态管理**: React Hooks (`useState`, `useContext`)，保持简单
* **样式**: 严格保持 test.html 原有的 Tailwind 暗色主题（slate-950 背景），使用 CSS 动画

# 3. APPROACH OVERVIEW

采用"自下而上"的渐进式迁移策略：先搭建工程基础 → 再逐个组件迁移 → 最后集成联调。每步都是独立可验证的，便于学习者理解每个 React 概念（组件、Props、State、Hook、TypeScript 类型）的作用。

选择 Vite 而非 Next.js 的原因：对于初学者，Vite 的 SPA 架构更直观，没有 SSR/路由的额外复杂度，与 test.html 的浏览器渲染模式更接近，学习曲线更平缓。

# 4. IMPLEMENTATION STEPS

## Phase 1: 项目初始化 —— "Hello World" 跑起来
*目标*: 搭建 Vite + React + TypeScript 项目骨架，理解现代前端工程化基础

- **Step 1.1**: 使用 `npm create vite@latest` 创建项目，选择 React + TypeScript 模板
  - 方法: 运行 `npm create vite@latest . -- --template react-ts`
  - 参考: chatbot-ui 项目根目录结构 (`package.json`, `tsconfig.json`, `vite.config.ts`)
  - **学习点**: `package.json` 依赖管理、`tsconfig.json` TypeScript 配置、Vite 构建工具

- **Step 1.2**: 安装并配置 TailwindCSS
  - 方法: `npm install -D tailwindcss @tailwindcss/vite`，在 `vite.config.ts` 中添加 Tailwind 插件
  - 创建 `src/index.css`，引入 `@import "tailwindcss"`
  - **学习点**: CSS 工具类框架如何与 Vite 集成

- **Step 1.3**: 安装 Font Awesome 图标库
  - 方法: `npm install @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons`
  - **学习点**: React 生态中的图标使用方式

- **Step 1.4**: 清理模板文件，创建最小可运行的 App
  - 方法: 删除 Vite 默认模板中的示例代码，创建最简单的 `<div>Hello</div>`
  - 运行 `npm run dev`，验证开发服务器启动成功
  - **学习点**: Vite 热更新（HMR）机制、`index.html` 与 `main.tsx` 的入口关系

## Phase 2: 类型定义 —— "先定义数据，再写组件"
*目标*: 为测试数据创建 TypeScript 接口，理解类型系统在 React 中的价值

- **Step 2.1**: 创建 `src/types/index.ts`，定义以下接口：
  ```typescript
  export interface Message {
    id: number;
    role: 'user' | 'assistant';
    content: string;
    refs?: Reference[];
  }
  
  export interface Reference {
    title: string;
    score: string;
    text: string;
  }
  
  export interface JiraTicket {
    key: string;
    summary: string;
    assignee: string;
  }
  ```
  - **学习点**: TypeScript `interface`、可选属性 `?`、联合类型

- **Step 2.2**: 创建 `src/data/mockData.ts`，将 test.html 中的硬编码数据提取为常量
  - 包含初始对话消息（OPS-1024 K8s 问题）、引用数据、Jira 工单数据（OPS-1024, OPS-1192）
  - **学习点**: 数据与 UI 分离、模块化导出 (`export`)

## Phase 3: 主框架 App 组件 —— "搭建页面骨架"
*目标*: 迁移 test.html 中的 `App` 主布局，理解组件拆分和 Props 传递

- **Step 3.1**: 创建 `src/components/Sidebar.tsx`（左侧极简导航栏）
  - 方法: 从 test.html 提取左侧 `w-16 bg-slate-900` 区域
  - 将 `class` 改为 `className`（React JSX 语法要求）
  - **学习点**: React JSX 语法、`className` vs HTML `class`

- **Step 3.2**: 创建 `src/components/Header.tsx`
  - Props 接口: `{ currentAssistant: string; onSwitch: (mode: string) => void }`
  - 包含顶部 Header 和 Tab 切换按钮（运维知识库 / Jira 数据）
  - **学习点**: React Props 类型定义、事件回调函数 props

- **Step 3.3**: 创建 `src/App.tsx` 组装框架
  - 使用 `useState` 管理 `currentAssistant` 和 `activeRef` 状态
  - 条件渲染: `currentAssistant === 'rag' ? <RagAssistantView/> : <JiraInsightView/>`
  - **学习点**: `useState` Hook 使用、条件渲染、组件组合

## Phase 4: RagAssistantView 组件 —— "对话界面迁移"
*目标*: 完整迁移 RAG 知识库对话组件，学习 State 管理

- **Step 4.1**: 创建 `src/components/rag/MessageBubble.tsx`
  - Props: `{ message: Message; onRefClick: (ref: Reference) => void }`
  - 区分 user/assistant 气泡样式，渲染消息内容和引用标签
  - **学习点**: 条件样式渲染、Props 传递深度、数组 `.map()` 渲染

- **Step 4.2**: 创建 `src/components/rag/ChatInput.tsx`
  - Props: `{ onSend: (text: string) => void }`
  - 包含输入框和发送按钮，处理 Enter 键和点击发送
  - **学习点**: 受控组件（Controlled Component）、事件处理 (`onChange`, `onKeyDown`)

- **Step 4.3**: 创建 `src/components/rag/RefPanel.tsx`（右侧知识库引用抽屉）
  - Props: `{ activeRef: Reference | null; onClose: () => void }`
  - 包含有/无选中引用时的两种展示状态
  - **学习点**: 条件渲染、联合类型 Props (`Reference | null`)

- **Step 4.4**: 创建 `src/components/rag/RagAssistantView.tsx` 组装
  - 使用 `useState` 管理 messages 列表和 input 值
  - `handleSend` 函数模拟 AI 响应（setTimeout）
  - **学习点**: 数组状态更新（展开运算符 `...prev`）、`setTimeout` 异步模拟

## Phase 5: JiraInsightView 组件 —— "数据看板迁移"
*目标*: 迁移 Jira 数据看板，学习组件化展示静态数据

- **Step 5.1**: 创建 `src/components/jira/AISummary.tsx`
  - 顶部 AI 生成的 Summary 区域（趋势预警、效能瓶颈、风险规避三栏）
  - **学习点**: 网格布局（Grid）、组件内数据展示

- **Step 5.2**: 创建 `src/components/jira/StatsCards.tsx`
  - 三个统计卡片：未解决工单、MTTR、风险分类占比
  - 纯 CSS 柱状图/进度条（保持原 test.html 样式）
  - **学习点**: 内联样式（`style={{width: '40%'}}`）与 Tailwind 混合使用

- **Step 5.3**: 创建 `src/components/jira/TicketTable.tsx`
  - Props: `{ tickets: JiraTicket[] }`
  - 表格渲染 + "AI 诊断"按钮
  - **学习点**: `map()` 渲染列表、`key` prop 的重要性

- **Step 5.4**: 创建 `src/components/jira/JiraQuestionPanel.tsx`
  - 右侧 AI 提问栏（上下文信息 + 输入框）
  - **学习点**: 组件复用（与 ChatInput 的结构相似性）

- **Step 5.5**: 创建 `src/components/jira/JiraInsightView.tsx` 组装
  - 左侧数据看板 + 右侧提问面板的 Flex 布局
  - **学习点**: 组件嵌套、Flex 布局组合

## Phase 6: 全局整合与打磨
*目标*: 整合所有组件，添加动画和全局配置，验证完整功能

- **Step 6.1**: 在 `src/index.css` 中添加自定义动画（`@keyframes fadeIn`）
  - 定义 `.animate-fade-in` 类，保持与 test.html 一致的淡入动画
  - **学习点**: Tailwind 自定义 CSS 扩展

- **Step 6.2**: 更新 `src/main.tsx` 入口文件
  - 导入 `index.css`、挂载 React Root
  - **学习点**: React 18 `createRoot` API、严格模式 (`StrictMode`)

- **Step 6.3**: 更新 `index.html`
  - 设置正确的 `<title>` 为 "运维 AI 助手工作台"
  - 设置正确的 meta 标签
  - **学习点**: SPA 单页应用的 HTML 入口

- **Step 6.4**: 运行 `npm run dev` 完整验证
  - 测试 Tab 切换（RAG ↔ Jira）
  - 测试消息发送、引用点击展开
  - 测试窗口响应式表现
  - **学习点**: 端到端功能验证流程

## 最终项目目录结构
```
assitant_ui/
├── index.html                  # SPA 入口
├── package.json                # 依赖管理
├── vite.config.ts              # Vite 构建配置
├── tsconfig.json               # TypeScript 配置
├── src/
│   ├── main.tsx                # React 入口
│   ├── index.css               # 全局样式 + Tailwind
│   ├── App.tsx                 # 主应用组件
│   ├── types/
│   │   └── index.ts            # TypeScript 类型定义
│   ├── data/
│   │   └── mockData.ts         # Mock 数据
│   ├── components/
│   │   ├── Sidebar.tsx         # 左侧导航栏
│   │   ├── Header.tsx          # 顶部 Header + Tab 切换
│   │   ├── rag/
│   │   │   ├── RagAssistantView.tsx  # RAG 对话主组件
│   │   │   ├── MessageBubble.tsx     # 消息气泡
│   │   │   ├── ChatInput.tsx         # 输入框
│   │   │   └── RefPanel.tsx          # 引用详情抽屉
│   │   └── jira/
│   │       ├── JiraInsightView.tsx   # Jira 看板主组件
│   │       ├── AISummary.tsx         # AI 总结区域
│   │       ├── StatsCards.tsx        # 统计卡片
│   │       ├── TicketTable.tsx       # 工单表格
│   │       └── JiraQuestionPanel.tsx # 提问面板
└── test.html                   # 原始原型文件（保留）
```

# 5. TESTING AND VALIDATION

* **开发阶段验证**: 每个 Phase 完成后运行 `npm run dev`，确认页面正常渲染，无 TypeScript 编译错误和运行时错误
* **视觉一致性验证** (关键!):
  - **暗色主题**: 背景必须是 `slate-950`（深灰近黑），不能是白色或浅灰色
  - **左侧导航栏**: 必须有 `w-16` 宽度的左侧固定导航栏，包含 "Ops" 图标和功能图标
  - **RAG 对话**: 消息气泡必须是暗色（`bg-slate-900`），用户气泡是蓝色（`bg-blue-600`）
  - **知识库引用**: 消息下方必须有引用标签（含 `重合度` 分数），点击后右侧抽屉展开
  - **Jira 看板**: 必须包含 AI Summary 三栏、统计柱状图/进度条、工单表格（OPS-1024, OPS-1192）
  - **Tab 切换**: 必须是蓝色/靛蓝色胶囊式切换器（`bg-blue-600` / `bg-indigo-600`）
* **RAG 视图验证**:
  - 默认显示初始对话消息（用户提问 + AI 回复含引用）
  - 输入新消息并发送，UI 立即追加用户消息
  - 800ms 后 AI 模拟回复出现
  - 点击知识库引用标签，右侧抽屉展开显示详情
  - 点击关闭按钮或新引用，抽屉状态正确更新
* **Jira 视图验证**:
  - Tab 切换到 Jira，显示 AI Summary 三栏卡片
  - 三个统计卡片数据正确展示，CSS 柱状图/进度条渲染正常
  - 工单表格渲染完整，包含 OPS-1024 和 OPS-1192 两条数据
  - 右侧提问面板展示上下文信息
* **通用验证**:
  - 左侧导航栏固定显示
  - 顶部 Tab 切换无闪烁，内容正确切换
  - 深色主题（slate-950 背景）完整渲染
  - 所有 Font Awesome 图标正常显示
