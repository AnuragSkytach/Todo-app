import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { format, isBefore, parseISO } from 'date-fns';
import '../styles/dashboard.scss';
import API_ENDPOINTS from '../constants/apiConfig';

const Dashboard = () => {
  const { user } = useAuth();
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('token');

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get(API_ENDPOINTS.todoList, axiosConfig);
        const data = response.data.data;
        

        console.log('Fetched Todos:', data);

        // Ensure it's an array
        if (Array.isArray(data)) {
          setTodos(data);
        } else if (Array.isArray(data.results)) {
          setTodos(data.results); // handle paginated structure
        } else {
          setTodos([]); // fallback to empty list
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  console.log('Todos:', todos);

  const addTodo = async (newTodo) => {
    try {
      const response = await axios.post(
        API_ENDPOINTS.todoList,
        {
          title: newTodo.text,
          description: 'Task description',
          start_date: formatDate(newTodo.startDate),
          end_date: formatDate(newTodo.endDate),
          status: 'Pending'
        },
        axiosConfig
      );

      const newItem = {
        id: response.data.id,
        title: response.data.title,
        description: response.data.description,
        status: response.data.status,
        start_date: response.data.start_date,
        end_date: response.data.end_date,
        created_at: response.data.created_at
      };

      setTodos((prev) => [...(Array.isArray(prev) ? prev : []), newItem]);
    } catch (err) {
      setError(err.message);
    }
  };

  const toggleTodo = async (id) => {
    try {
      const todoToUpdate = todos.find((todo) => todo.id === id);
      if (!todoToUpdate) return;

      const newStatus = todoToUpdate.status === 'Completed' ? 'Pending' : 'Completed';

      await axios.post(
        API_ENDPOINTS.updateTodo,
        {
          id,
          title: todoToUpdate.title,
          description: todoToUpdate.description,
          status: newStatus,
          start_date: todoToUpdate.start_date,
          end_date: todoToUpdate.end_date,
        },
        axiosConfig
      );

      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, status: newStatus } : todo
        )
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const markAsDue = async (id) => {
    try {
      await axios.post(
        API_ENDPOINTS.updateTodo,
        {
          id,
          status: 'Due'
        },
        axiosConfig
      );

      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, status: 'Due' } : todo
        )
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.post(API_ENDPOINTS.deleteTodo, { id }, axiosConfig);
      setTodos((prev) => (Array.isArray(prev) ? prev.filter((todo) => todo.id !== id) : []));
    } catch (err) {
      setError(err.message);
    }
  };

  const formatDate = (date) => {
    if (!date) return null;
    return format(date, 'yyyy-MM-dd');
  };

  const filterTodos = () => {
    if (!Array.isArray(todos)) return [];

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return todos.filter((todo) => {
      if (filter === 'completed') return todo.status === 'Completed';
      if (filter === 'pending') return todo.status === 'Pending';
      if (filter === 'due') return todo.status === 'Due';
      return true;
    });
  };

  const filteredTodos = filterTodos();

  const completedCount = Array.isArray(todos)
    ? todos.filter((todo) => todo.status === 'Completed').length
    : 0;

  const pendingCount = Array.isArray(todos)
    ? todos.filter((todo) => todo.status === 'Pending').length
    : 0;

  const dueCount = Array.isArray(todos)
    ? todos.filter((todo) => todo.status === 'Due').length
    : 0;

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="dashboard">
      <div className="dashboard__header">
        <h1>Welcome back, {user?.name || 'User'}!</h1>
        <p>You have {pendingCount} {pendingCount === 1 ? 'task' : 'tasks'} pending</p>
        {dueCount > 0 && (
          <p className="due-warning">{dueCount} {dueCount === 1 ? 'task is' : 'tasks are'} due!</p>
        )}
      </div>

      <div className="dashboard__content">
        <TodoForm addTodo={addTodo} />

        <div className="todo-filters">
          {['all', 'pending', 'completed', 'due'].map((type) => (
            <button
              key={type}
              className={`filter-btn ${filter === type ? 'active' : ''}`}
              onClick={() => setFilter(type)}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)} (
                {{
                  all: todos?.length || 0,
                  pending: pendingCount,
                  completed: completedCount,
                  due: dueCount,
                }[type]}
              )
            </button>
          ))}
        </div>

        <div className="todo-list">
          {filteredTodos.length > 0 ? (
            filteredTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                toggleTodo={toggleTodo}
                markAsDue={markAsDue}
                deleteTodo={deleteTodo}
              />
            ))
          ) : (
            <div className="empty-state">
              <p>No {filter === 'all' ? '' : filter} todos found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;