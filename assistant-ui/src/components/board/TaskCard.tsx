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
