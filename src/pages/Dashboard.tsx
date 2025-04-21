import React, { useState } from 'react';
import { Button, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import TaskFilters from '../components/TaskFilters';
import { Task, TaskStatus, PriorityType } from '../types/task';
import { useTaskContext } from '../contexts/TaskContext';

const Dashboard: React.FC = () => {
  const { tasks, addTask, updateTask, deleteTask } = useTaskContext();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<TaskStatus | ''>('');
  const [priorityFilter, setPriorityFilter] = useState<PriorityType | ''>('');
  const [sortBy, setSortBy] = useState<string>('dueDate');

  const handleAddTask = (values: any) => {
    addTask(values);
    setIsModalVisible(false);
    message.success('Task added successfully');
  };

  const handleEditTask = (values: any) => {
    if (editingTask) {
      updateTask(editingTask.id, values);
      setEditingTask(null);
      setIsModalVisible(false);
      message.success('Task updated successfully');
    }
  };

  const handleDeleteTask = (taskId: string) => {
    deleteTask(taskId);
    message.success('Task deleted successfully');
  };

  const filteredTasks = tasks
    .filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = !statusFilter || task.status === statusFilter;
      const matchesPriority = !priorityFilter || task.priority === priorityFilter;
      return matchesSearch && matchesStatus && matchesPriority;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'dueDate':
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        case 'priority':
          const priorityOrder = { HIGH: 0, MEDIUM: 1, LOW: 2 };
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        case 'status':
          const statusOrder = { TODO: 0, IN_PROGRESS: 1, COMPLETED: 2 };
          return statusOrder[a.status] - statusOrder[b.status];
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2 className="dashboard-title">Tasks</h2>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsModalVisible(true)}
          className="add-task-button"
        >
          Add Task
        </Button>
      </div>

      <div className="dashboard-filters">
        <TaskFilters
          onSearchChange={setSearchQuery}
          onStatusChange={setStatusFilter}
          onPriorityChange={setPriorityFilter}
          onSortChange={setSortBy}
        />
      </div>

      <div className="dashboard-content">
        <TaskList
          tasks={filteredTasks}
          onEditTask={(task) => {
            setEditingTask(task);
            setIsModalVisible(true);
          }}
          onDeleteTask={handleDeleteTask}
        />
      </div>

      <Modal
        title={editingTask ? 'Edit Task' : 'Add Task'}
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setEditingTask(null);
        }}
        footer={null}
        className="task-modal"
      >
        <TaskForm
          onSubmit={editingTask ? handleEditTask : handleAddTask}
          initialValues={editingTask}
          submitText={editingTask ? 'Update Task' : 'Add Task'}
        />
      </Modal>
    </div>
  );
};

export default Dashboard; 