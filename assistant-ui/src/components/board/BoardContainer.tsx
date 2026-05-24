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
