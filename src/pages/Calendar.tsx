import React from 'react';
import { Calendar as AntCalendar, Badge } from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { useTaskContext } from '../contexts/TaskContext';

const Calendar: React.FC = () => {
  const { tasks } = useTaskContext();

  const getListData = (value: Dayjs) => {
    const dateStr = value.format('YYYY-MM-DD');
    return tasks.filter(task => 
      dayjs(task.dueDate).format('YYYY-MM-DD') === dateStr
    );
  };

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value);
    
    return (
      <ul className="events p-0 m-0">
        {listData.map((task) => (
          <li key={task.id} className="list-none mb-1">
            <Badge
              status={
                task.status === 'COMPLETED'
                  ? 'success'
                  : task.status === 'IN_PROGRESS'
                  ? 'processing'
                  : 'default'
              }
              text={
                <span className="text-xs">
                  {task.title}
                </span>
              }
            />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Task Calendar</h2>
      <AntCalendar
        className="bg-white p-6 rounded-lg"
        cellRender={dateCellRender}
      />
    </div>
  );
};

export default Calendar; 