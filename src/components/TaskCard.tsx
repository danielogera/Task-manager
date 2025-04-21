import React from 'react';
import { Card, Tag, Typography, Space, Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Task, PriorityType, TaskStatus } from '../types/task';
import dayjs from 'dayjs';

const { Text, Paragraph } = Typography;

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

const getPriorityColor = (priority: PriorityType) => {
  const colors = {
    LOW: 'green',
    MEDIUM: 'orange',
    HIGH: 'red'
  };
  return colors[priority];
};

const getStatusColor = (status: TaskStatus) => {
  const colors = {
    TODO: 'default',
    IN_PROGRESS: 'processing',
    COMPLETED: 'success'
  };
  return colors[status];
};

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete }) => {
  return (
    <Card
      className="mb-4 shadow-sm hover:shadow-md transition-shadow"
      actions={[
        <Button 
          type="text" 
          icon={<EditOutlined />} 
          onClick={() => onEdit(task)}
          key="edit"
        >
          Edit
        </Button>,
        <Button 
          type="text" 
          icon={<DeleteOutlined />} 
          danger 
          onClick={() => onDelete(task.id)}
          key="delete"
        >
          Delete
        </Button>
      ]}
    >
      <Space direction="vertical" className="w-full">
        <div className="flex justify-between items-start">
          <Text strong className="text-lg">{task.title}</Text>
          <Space>
            <Tag color={getPriorityColor(task.priority)}>
              {task.priority}
            </Tag>
            <Tag color={getStatusColor(task.status)}>
              {task.status.replace('_', ' ')}
            </Tag>
          </Space>
        </div>
        
        {task.description && (
          <Paragraph className="text-gray-600">
            {task.description}
          </Paragraph>
        )}
        
        <Text type="secondary">
          Due: {dayjs(task.dueDate).format('MMM D, YYYY')}
        </Text>
      </Space>
    </Card>
  );
};

export default TaskCard; 