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
          <div key={task.id} className="animate-slide-in">
            <TaskCard task={task} />
          </div>
        ))}
        {filteredTasks.length === 0 && (
          <p className="text-sm text-gray-400 text-center py-4">暂无任务</p>
        )}
      </div>
    </div>
  )
}
