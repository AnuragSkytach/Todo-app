import React, { useState } from 'react';
import { format, isAfter, isBefore } from 'date-fns';

const TodoItem = ({ todo, toggleTodo, deleteTodo, editTodo }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const isDue = todo.end_date && !todo.completed && isBefore(new Date(todo.end_date), today);
  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [editedDescription, setEditedDescription] = useState(todo.description);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    editTodo(todo.id, {
      title: editedTitle,
      description: editedDescription
    });
    setIsEditing(false);
  };

  return (
    <div 
      className={`todo-item ${todo.completed ? 'completed' : ''} ${isDue ? 'due' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isEditing ? (
        <form className="edit-form" onSubmit={handleEditSubmit}>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="edit-input"
            autoFocus
            required
          />
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            className="edit-textarea"
            placeholder="Add description (optional)"
          />
          <div className="edit-buttons">
            <button type="submit" className="save-button">Save</button>
            <button 
              type="button" 
              className="cancel-button"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="todo-content">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              id={`todo-${todo.id}`}
              className="todo-checkbox"
            />
            <div className="todo-details" onClick={() => setIsEditing(true)}>
              <label htmlFor={`todo-${todo.id}`} className="todo-text">
                {todo.title}
                {todo.description && (
                  <span className="todo-description">{todo.description}</span>
                )}
              </label>
              {todo.end_date && (
                <div className="todo-dates">
                  <span className={`date ${isDue ? 'due-date' : ''}`}>
                    {format(new Date(todo.end_date), 'MMM dd, yyyy')}
                    {isDue && <span className="due-label"> (Due)</span>}
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className={`action-buttons ${isHovered ? 'visible' : ''}`}>
            <button
              onClick={() => setIsEditing(true)}
              className="edit-button"
              aria-label="Edit todo"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
            </button>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="delete-button"
              aria-label="Delete todo"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                <line x1="10" y1="11" x2="10" y2="17"></line>
                <line x1="14" y1="11" x2="14" y2="17"></line>
              </svg>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TodoItem;