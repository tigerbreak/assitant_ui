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
