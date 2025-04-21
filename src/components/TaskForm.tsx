import React from 'react';
import { Form, Input, DatePicker, Select, Button } from 'antd';
import { PriorityType, TaskStatus } from '../types/task';

const { TextArea } = Input;

interface TaskFormProps {
  onSubmit: (values: any) => void;
  initialValues?: any;
  submitText?: string;
}

const TaskForm: React.FC<TaskFormProps> = ({
  onSubmit,
  initialValues,
  submitText = 'Add Task'
}) => {
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onSubmit}
      initialValues={initialValues}
    >
      <Form.Item
        name="title"
        label="Task Title"
        rules={[{ required: true, message: 'Please enter task title' }]}
      >
        <Input placeholder="Enter task title" />
      </Form.Item>

      <Form.Item
        name="description"
        label="Description"
      >
        <TextArea rows={4} placeholder="Enter task description" />
      </Form.Item>

      <Form.Item
        name="dueDate"
        label="Due Date"
        rules={[{ required: true, message: 'Please select due date' }]}
      >
        <DatePicker className="w-full" />
      </Form.Item>

      <Form.Item
        name="priority"
        label="Priority"
        rules={[{ required: true, message: 'Please select priority' }]}
      >
        <Select>
          <Select.Option value="LOW">Low</Select.Option>
          <Select.Option value="MEDIUM">Medium</Select.Option>
          <Select.Option value="HIGH">High</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="status"
        label="Status"
        rules={[{ required: true, message: 'Please select status' }]}
      >
        <Select>
          <Select.Option value="TODO">To Do</Select.Option>
          <Select.Option value="IN_PROGRESS">In Progress</Select.Option>
          <Select.Option value="COMPLETED">Completed</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="w-full">
          {submitText}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TaskForm; 