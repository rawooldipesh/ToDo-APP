import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../config/api';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import './Dashboard.css';

function Dashboard({ setAuth }) {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userInitial = user.name?.charAt(0).toUpperCase() || '?';

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    filterTasks();
  }, [tasks, filter]);

  const fetchTasks = async () => {
    try {
      const response = await api.get('/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterTasks = () => {
    if (filter === 'all') {
      setFilteredTasks(tasks);
    } else if (filter === 'pending') {
      setFilteredTasks(tasks.filter(task => task.status === 'pending'));
    } else if (filter === 'completed') {
      setFilteredTasks(tasks.filter(task => task.status === 'completed'));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuth(false);
    navigate('/login');
  };

  const handleAddTask = () => {
    setEditingTask(null);
    setShowForm(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;

    try {
      await api.delete(`/tasks/${taskId}`);
      setTasks(tasks.filter(task => task._id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('Failed to delete task');
    }
  };

  const handleToggleComplete = async (taskId) => {
    try {
      const response = await api.patch(`/tasks/${taskId}/complete`);
      setTasks(tasks.map(task => 
        task._id === taskId ? response.data : task
      ));
    } catch (error) {
      console.error('Error toggling task:', error);
      alert('Failed to update task');
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  const handleFormSuccess = () => {
    fetchTasks();
    handleFormClose();
  };

  const stats = {
    total: tasks.length,
    pending: tasks.filter(t => t.status === 'pending').length,
    completed: tasks.filter(t => t.status === 'completed').length
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        <p>Loading your tasks...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="dashboard-header-content">
          <div className="user-avatar">{userInitial}</div>
          <div>
            <h1>📝 My Tasks</h1>
            <p>Welcome back, <strong>{user.name}</strong>!</p>
          </div>
        </div>
        <div className="user-info">
          <button onClick={handleLogout} className="btn-logout">
            🚪 Logout
          </button>
        </div>
      </header>

      <div className="dashboard-content">
        <div className="dashboard-actions">
          <div className="stats-container">
            <div className="stat-card">
              <div className="stat-icon total">📊</div>
              <div className="stat-info">
                <h3>{stats.total}</h3>
                <p>Total Tasks</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon pending">⏳</div>
              <div className="stat-info">
                <h3>{stats.pending}</h3>
                <p>Pending</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon completed">✅</div>
              <div className="stat-info">
                <h3>{stats.completed}</h3>
                <p>Completed</p>
              </div>
            </div>
          </div>

          <button onClick={handleAddTask} className="btn-add-task">
            <span>➕</span> Add New Task
          </button>
        </div>

        {showForm && (
          <TaskForm
            task={editingTask}
            onClose={handleFormClose}
            onSuccess={handleFormSuccess}
          />
        )}

        <div className="tasks-section">
          <div className="section-header">
            <h2>Your Tasks</h2>
            <div className="filter-buttons">
              <button 
                className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                onClick={() => setFilter('all')}
              >
                All
              </button>
              <button 
                className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
                onClick={() => setFilter('pending')}
              >
                Pending
              </button>
              <button 
                className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
                onClick={() => setFilter('completed')}
              >
                Completed
              </button>
            </div>
          </div>

          <TaskList
            tasks={filteredTasks}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
            onToggleComplete={handleToggleComplete}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;