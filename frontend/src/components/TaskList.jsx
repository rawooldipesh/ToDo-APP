import './TaskList.css';

function TaskList({ tasks, onEdit, onDelete, onToggleComplete }) {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">📭</div>
        <p>No tasks yet. Let's create your first one!</p>
        <p className="empty-state-hint">Click the "Add New Task" button above to get started</p>
      </div>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'No due date';
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const isOverdue = (dateString) => {
    if (!dateString) return false;
    return new Date(dateString) < new Date();
  };

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div 
          key={task._id} 
          className={`task-card ${task.status === 'completed' ? 'completed' : ''} ${isOverdue(task.dueDate) && task.status === 'pending' ? 'overdue' : ''}`}
        >
          <div className="task-checkbox">
            <input
              type="checkbox"
              checked={task.status === 'completed'}
              onChange={() => onToggleComplete(task._id)}
            />
          </div>

          <div className="task-content">
            <h3>{task.title}</h3>
            {task.description && <p className="task-description">{task.description}</p>}
            
            <div className="task-meta">
              {task.dueDate && (
                <span className={`due-date ${isOverdue(task.dueDate) && task.status === 'pending' ? 'overdue' : ''}`}>
                  🕒 {formatDate(task.dueDate)}
                  {isOverdue(task.dueDate) && task.status === 'pending' && ' (Overdue)'}
                </span>
              )}
              <span className={`status status-${task.status}`}>
                {task.status === 'completed' ? '✓ Completed' : '○ Pending'}
              </span>
              {task.reminderSent && task.status === 'pending' && (
                <span className="reminder-badge" title="Email reminder was sent 30 minutes before due time">
                  ✅ Reminder sent
                </span>
              )}
            </div>
          </div>

          <div className="task-actions">
            <button onClick={() => onEdit(task)} className="btn-edit" title="Edit">
              ✏️
            </button>
            <button onClick={() => onDelete(task._id)} className="btn-delete" title="Delete">
              🗑️
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TaskList;