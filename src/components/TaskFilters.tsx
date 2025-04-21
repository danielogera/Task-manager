import React from 'react';
import { Input, Select, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { PriorityType, TaskStatus } from '../types/task';

const { Search } = Input;

interface TaskFiltersProps {
  onSearchChange: (value: string) => void;
  onStatusChange: (status: TaskStatus | '') => void;
  onPriorityChange: (priority: PriorityType | '') => void;
  onSortChange: (sort: string) => void;
}

const TaskFilters: React.FC<TaskFiltersProps> = ({
  onSearchChange,
  onStatusChange,
  onPriorityChange,
  onSortChange,
}) => {
  return (
    <Space className="w-full justify-between mb-6 flex-wrap gap-4">
      <Space className="flex-wrap gap-4">
        <Search
          placeholder="Search tasks"
          allowClear
          onChange={(e) => onSearchChange(e.target.value)}
          style={{ width: 200 }}
          prefix={<SearchOutlined />}
        />
        
        <Select
          placeholder="Filter by status"
          style={{ width: 150 }}
          allowClear
          onChange={onStatusChange}
        >
          <Select.Option value="TODO">To Do</Select.Option>
          <Select.Option value="IN_PROGRESS">In Progress</Select.Option>
          <Select.Option value="COMPLETED">Completed</Select.Option>
        </Select>

        <Select
          placeholder="Filter by priority"
          style={{ width: 150 }}
          allowClear
          onChange={onPriorityChange}
        >
          <Select.Option value="LOW">Low</Select.Option>
          <Select.Option value="MEDIUM">Medium</Select.Option>
          <Select.Option value="HIGH">High</Select.Option>
        </Select>
      </Space>

      <Select
        placeholder="Sort by"
        style={{ width: 150 }}
        onChange={onSortChange}
        defaultValue="dueDate"
      >
        <Select.Option value="dueDate">Due Date</Select.Option>
        <Select.Option value="priority">Priority</Select.Option>
        <Select.Option value="status">Status</Select.Option>
        <Select.Option value="title">Title</Select.Option>
      </Select>
    </Space>
  );
};

export default TaskFilters; 