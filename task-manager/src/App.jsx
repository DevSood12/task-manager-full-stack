import React, { useState, useEffect } from 'react';
import { Search, Plus, Filter, Calendar, Tag, AlertCircle, CheckCircle, Clock, Trash2, Edit2, X, BarChart3, LogOut, User } from 'lucide-react';

import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:5000/api",
  baseURL: "https://task-manager-full-stack-dcau.onrender.com/api",
  
});

// ✅ Auth + Task API wrapper
const API = {
  async register(username, email, password) {
    const res = await api.post("/auth/register", { username, email, password });
    return res.data; // { user, token }
  },

  async login(email, password) {
    const res = await api.post("/auth/login", { email, password });
    return res.data; // { user, token }
  },

  async profile(token) {
    const res = await api.get("/auth/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  async getTasks(token) {
    const res = await api.get("/tasks", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  async createTask(token, task) {
    const res = await api.post("/tasks", task, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  async updateTask(token, taskId, updates) {
    const res = await api.put(`/tasks/${taskId}`, updates, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  async deleteTask(token, taskId) {
    const res = await api.delete(`/tasks/${taskId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  async getStats(token) {
    const res = await api.get("/tasks/stats", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },
};


// const API = {
//   async register(username, email, password) {
//     const users = JSON.parse(localStorage.getItem('users') || '[]');
//     if (users.find(u => u.email === email)) {
//       throw new Error('User already exists');
//     }
//     const newUser = { id: Date.now(), username, email, password };
//     users.push(newUser);
//     localStorage.setItem('users', JSON.stringify(users));
//     return { user: { id: newUser.id, username, email }, token: 'mock-jwt-token' };
//   },

//   async login(email, password) {
//     const users = JSON.parse(localStorage.getItem('users') || '[]');
//     const user = users.find(u => u.email === email && u.password === password);
//     if (!user) throw new Error('Invalid credentials');
//     return { user: { id: user.id, username: user.username, email }, token: 'mock-jwt-token' };
//   },

//   async getTasks(userId) {
//     const tasks = JSON.parse(localStorage.getItem(`tasks_${userId}`) || '[]');
//     return tasks;
//   },

//   async createTask(userId, task) {
//     const tasks = JSON.parse(localStorage.getItem(`tasks_${userId}`) || '[]');
//     const newTask = {
//       ...task,
//       id: Date.now(),
//       userId,
//       createdAt: new Date().toISOString(),
//       updatedAt: new Date().toISOString()
//     };
//     tasks.push(newTask);
//     localStorage.setItem(`tasks_${userId}`, JSON.stringify(tasks));
//     return newTask;
//   },

//   async updateTask(userId, taskId, updates) {
//     const tasks = JSON.parse(localStorage.getItem(`tasks_${userId}`) || '[]');
//     const index = tasks.findIndex(t => t.id === taskId);
//     if (index === -1) throw new Error('Task not found');
//     tasks[index] = { ...tasks[index], ...updates, updatedAt: new Date().toISOString() };
//     localStorage.setItem(`tasks_${userId}`, JSON.stringify(tasks));
//     return tasks[index];
//   },

//   async deleteTask(userId, taskId) {
//     const tasks = JSON.parse(localStorage.getItem(`tasks_${userId}`) || '[]');
//     const filtered = tasks.filter(t => t.id !== taskId);
//     localStorage.setItem(`tasks_${userId}`, JSON.stringify(filtered));
//     return { success: true };
//   }
// };

// Authentication Component
const AuthForm = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError('');
    
    if (!formData.email || !formData.password) {
      setError('Email and password are required');
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        const result = await API.login(formData.email, formData.password);
        onLogin(result.user, result.token);
      } else {
        if (!formData.username) {
          setError('Username is required');
          setLoading(false);
          return;
        }
        const result = await API.register(formData.username, formData.email, formData.password);
        onLogin(result.user, result.token);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Task Manager</h1>
          <p className="text-gray-600">Organize your tasks efficiently</p>
        </div>

        <div className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
              <AlertCircle size={16} />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
          >
            {loading ? 'Loading...' : isLogin ? 'Login' : 'Register'}
          </button>
        </div>

        <div className="mt-4 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 hover:underline text-sm"
          >
            {isLogin ? "Don't have an account? Register" : 'Already have an account? Login'}
          </button>
        </div>
      </div>
    </div>
  );
};

// Task Form Component
const TaskForm = ({ onSubmit, onCancel, initialTask = null }) => {
  const [task, setTask] = useState(initialTask || {
    title: '',
    description: '',
    category: '',
    priority: 'Medium',
    status: 'Pending',
    dueDate: ''
  });

  const handleSubmit = () => {
    if (!task.title.trim()) {
      alert('Task title is required');
      return;
    }
    onSubmit(task);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {initialTask ? 'Edit Task' : 'Create New Task'}
          </h2>
          <button onClick={onCancel} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
            <input
              type="text"
              value={task.title}
              onChange={(e) => setTask({ ...task, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={task.description}
              onChange={(e) => setTask({ ...task, description: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              rows="3"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <input
                type="text"
                value={task.category}
                onChange={(e) => setTask({ ...task, category: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Work, Personal"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
              <input
                type="date"
                value={task.dueDate}
                onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
              <select
                value={task.priority}
                onChange={(e) => setTask({ ...task, priority: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={task.status}
                onChange={(e) => setTask({ ...task, status: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={handleSubmit}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              {initialTask ? 'Update Task' : 'Create Task'}
            </button>
            <button
              onClick={onCancel}
              className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Dashboard Component
const Dashboard = ({ user, token, onLogout }) => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterPriority, setFilterPriority] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  if (token) loadTasks();
}, [token]);


  useEffect(() => {
    applyFilters();
  }, [tasks, searchQuery, filterStatus, filterPriority]);

  const loadTasks = async () => {
    setLoading(true);
    try {
      // const data = await API.getTasks(user.id);
      const data = await API.getTasks(token);
      setTasks(data);
    } catch (error) {
      console.error('Error loading tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...tasks];

    if (searchQuery) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filterStatus !== 'All') {
      filtered = filtered.filter(task => task.status === filterStatus);
    }

    if (filterPriority !== 'All') {
      filtered = filtered.filter(task => task.priority === filterPriority);
    }

    setFilteredTasks(filtered);
  };

  const handleCreateTask = async (taskData) => {
    try {
      // const newTask = await API.createTask(user.id, taskData);
      const newTask = await API.createTask(token, taskData);
      // setTasks([...tasks, newTask]);
      setTasks(prev => [...prev, newTask]);
      setShowTaskForm(false);
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleUpdateTask = async (taskData) => {
    try {
      // const updated = await API.updateTask(user.id, editingTask.id, taskData);
      const updated = await API.updateTask(token, editingTask._id || editingTask.id, taskData);
      setTasks(tasks.map(t => (t._id === updated._id ? updated : t)));
      // setTasks(tasks.map(t => t._id === updated._id ? updated : t));
      setEditingTask(null);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    try {
      // await API.deleteTask(user.id, taskId);
      await API.deleteTask(token, taskId);
      setTasks(tasks.filter(t => t._id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const stats = {
    total: tasks.length,
    pending: tasks.filter(t => t.status === 'Pending').length,
    inProgress: tasks.filter(t => t.status === 'In Progress').length,
    completed: tasks.filter(t => t.status === 'Completed').length,
    high: tasks.filter(t => t.priority === 'High').length
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-700 border-red-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Completed': return <CheckCircle size={16} className="text-green-600" />;
      case 'In Progress': return <Clock size={16} className="text-blue-600" />;
      default: return <AlertCircle size={16} className="text-orange-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Task Manager</h1>
              <p className="text-sm text-gray-600">Welcome back, {user.username}!</p>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Tasks</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <BarChart3 className="text-blue-500" size={24} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-orange-600">{stats.pending}</p>
              </div>
              <AlertCircle className="text-orange-500" size={24} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-blue-600">{stats.inProgress}</p>
              </div>
              <Clock className="text-blue-500" size={24} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
              </div>
              <CheckCircle className="text-green-500" size={24} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">High Priority</p>
                <p className="text-2xl font-bold text-red-600">{stats.high}</p>
              </div>
              <AlertCircle className="text-red-500" size={24} />
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>

            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>

            <button
              onClick={() => setShowTaskForm(true)}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus size={20} />
              New Task
            </button>
          </div>
        </div>

        {/* Task List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {loading ? (
            <div className="p-8 text-center text-gray-500">Loading tasks...</div>
          ) : filteredTasks.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No tasks found. Create your first task to get started!
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredTasks.map(task => (
                <div key={task._id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {getStatusIcon(task.status)}
                        <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded border ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                      </div>
                      
                      {task.description && (
                        <p className="text-gray-600 mb-2">{task.description}</p>
                      )}
                      
                      <div className="flex flex-wrap gap-3 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Tag size={14} />
                          {task.status}
                        </span>
                        {task.category && (
                          <span className="flex items-center gap-1">
                            <Filter size={14} />
                            {task.category}
                          </span>
                        )}
                        {task.dueDate && (
                          <span className="flex items-center gap-1">
                            <Calendar size={14} />
                            {new Date(task.dueDate).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => setEditingTask(task)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteTask(task._id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Task Forms */}
      {showTaskForm && (
        <TaskForm
          onSubmit={handleCreateTask}
          onCancel={() => setShowTaskForm(false)}
        />
      )}

      {editingTask && (
        <TaskForm
          initialTask={editingTask}
          onSubmit={handleUpdateTask}
          onCancel={() => setEditingTask(null)}
        />
      )}
    </div>
  );
};

// Main App Component
export default function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    const savedToken = localStorage.getItem('authToken');
    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      setToken(savedToken);
    }
  }, []);

  const handleLogin = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem('currentUser', JSON.stringify(userData));
    localStorage.setItem('authToken', authToken);
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('authToken');
  };

  if (!user) {
    return <AuthForm onLogin={handleLogin} />;
  }

  // return <Dashboard user={user} onLogout={handleLogout} />;
  return <Dashboard user={user} token={token} onLogout={handleLogout} />;
}