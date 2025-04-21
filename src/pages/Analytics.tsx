import React, { useEffect, useRef } from 'react';
import { Card, Row, Col, Statistic, Typography } from 'antd';
import * as echarts from 'echarts';
import dayjs from 'dayjs';
import { useTaskContext } from '../contexts/TaskContext';
import { useLanguage } from '../contexts/LanguageContext';

const { Title, Text } = Typography;

const Analytics: React.FC = () => {
  const { tasks } = useTaskContext();
  const { t } = useLanguage();
  const statusChartRef = useRef<HTMLDivElement>(null);
  const priorityChartRef = useRef<HTMLDivElement>(null);
  const timelineChartRef = useRef<HTMLDivElement>(null);

  const getTaskStats = () => {
    const total = tasks.length;
    const completed = tasks.filter(task => task.status === 'COMPLETED').length;
    const inProgress = tasks.filter(task => task.status === 'IN_PROGRESS').length;
    const todo = tasks.filter(task => task.status === 'TODO').length;
    const overdue = tasks.filter(task => 
      task.status !== 'COMPLETED' && 
      dayjs(task.dueDate).isBefore(dayjs(), 'day')
    ).length;

    return { total, completed, inProgress, todo, overdue };
  };

  useEffect(() => {
    if (statusChartRef.current) {
      const chart = echarts.init(statusChartRef.current);
      const stats = getTaskStats();
      
      chart.setOption({
        title: { 
          text: t('analytics'),
          textStyle: {
            color: '#333333',
            fontSize: 16,
            fontWeight: 500
          }
        },
        tooltip: { 
          trigger: 'item',
          backgroundColor: '#ffffff',
          borderColor: '#f0f0f0',
          textStyle: {
            color: '#333333'
          }
        },
        legend: { 
          orient: 'horizontal',
          bottom: 0,
          left: 'center',
          textStyle: {
            color: '#666666'
          }
        },
        series: [{
          type: 'pie',
          radius: ['40%', '70%'],
          center: ['50%', '45%'],
          data: [
            { value: stats.todo, name: 'To Do' },
            { value: stats.inProgress, name: 'In Progress' },
            { value: stats.completed, name: 'Completed' }
          ],
          itemStyle: {
            borderColor: '#ffffff',
            borderWidth: 2
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.1)'
            }
          }
        }]
      });

      const handleResize = () => {
        chart.resize();
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [tasks, t]);

  useEffect(() => {
    if (priorityChartRef.current) {
      const chart = echarts.init(priorityChartRef.current);
      
      const priorityData = {
        HIGH: tasks.filter(task => task.priority === 'HIGH').length,
        MEDIUM: tasks.filter(task => task.priority === 'MEDIUM').length,
        LOW: tasks.filter(task => task.priority === 'LOW').length
      };

      chart.setOption({
        title: { 
          text: 'Tasks by Priority',
          textStyle: {
            color: '#333333',
            fontSize: 16,
            fontWeight: 500
          }
        },
        tooltip: { 
          trigger: 'axis',
          backgroundColor: '#ffffff',
          borderColor: '#f0f0f0',
          textStyle: {
            color: '#333333'
          }
        },
        xAxis: { 
          data: ['High', 'Medium', 'Low'],
          axisLabel: {
            interval: 0,
            rotate: 0,
            color: '#666666'
          },
          axisLine: {
            lineStyle: {
              color: '#f0f0f0'
            }
          }
        },
        yAxis: {
          axisLine: {
            lineStyle: {
              color: '#f0f0f0'
            }
          },
          splitLine: {
            lineStyle: {
              color: '#f5f5f5'
            }
          }
        },
        series: [{
          type: 'bar',
          data: [priorityData.HIGH, priorityData.MEDIUM, priorityData.LOW],
          itemStyle: {
            color: function(params: any) {
              const colors = ['#333333', '#666666', '#999999'];
              return colors[params.dataIndex];
            }
          }
        }]
      });

      const handleResize = () => {
        chart.resize();
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [tasks]);

  useEffect(() => {
    if (timelineChartRef.current) {
      const chart = echarts.init(timelineChartRef.current);
      
      const last7Days = Array.from({ length: 7 }, (_, i) => {
        return dayjs().subtract(i, 'day').format('YYYY-MM-DD');
      }).reverse();

      const completedByDay = last7Days.map(date => {
        return tasks.filter(task => 
          dayjs(task.updatedAt).format('YYYY-MM-DD') === date &&
          task.status === 'COMPLETED'
        ).length;
      });

      chart.setOption({
        title: { 
          text: 'Completed Tasks (Last 7 Days)',
          textStyle: {
            color: '#333333',
            fontSize: 16,
            fontWeight: 500
          }
        },
        tooltip: { 
          trigger: 'axis',
          backgroundColor: '#ffffff',
          borderColor: '#f0f0f0',
          textStyle: {
            color: '#333333'
          }
        },
        xAxis: {
          type: 'category',
          data: last7Days.map(date => dayjs(date).format('MMM D')),
          axisLabel: {
            interval: 0,
            rotate: 0,
            color: '#666666'
          },
          axisLine: {
            lineStyle: {
              color: '#f0f0f0'
            }
          }
        },
        yAxis: { 
          type: 'value',
          axisLine: {
            lineStyle: {
              color: '#f0f0f0'
            }
          },
          splitLine: {
            lineStyle: {
              color: '#f5f5f5'
            }
          }
        },
        series: [{
          data: completedByDay,
          type: 'line',
          smooth: true,
          lineStyle: {
            color: '#333333',
            width: 2
          },
          itemStyle: {
            color: '#333333'
          }
        }]
      });

      const handleResize = () => {
        chart.resize();
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [tasks]);

  const stats = getTaskStats();

  return (
    <div className="analytics-container">
      <div className="analytics-header">
        <Title level={2} className="analytics-title">{t('analytics')}</Title>
        <Text className="analytics-subtitle">Track your task management performance</Text>
      </div>
      
      <div className="analytics-stats">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={6}>
            <Card className="analytics-stat-card">
              <Statistic 
                title={t('totalTasks')} 
                value={stats.total}
                valueStyle={{ color: '#333333' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card className="analytics-stat-card">
              <Statistic 
                title={t('completedTasks')} 
                value={stats.completed}
                suffix={`/ ${stats.total}`}
                valueStyle={{ color: '#333333' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card className="analytics-stat-card">
              <Statistic 
                title={t('inProgress')} 
                value={stats.inProgress}
                valueStyle={{ color: '#333333' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card className="analytics-stat-card">
              <Statistic 
                title={t('overdueTasks')} 
                value={stats.overdue}
                valueStyle={{ color: stats.overdue > 0 ? '#ff4d4f' : '#333333' }}
              />
            </Card>
          </Col>
        </Row>
      </div>

      <div className="analytics-charts">
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={12}>
            <Card className="analytics-chart-card">
              <div ref={statusChartRef} style={{ height: 400, width: '100%' }} />
            </Card>
          </Col>
          <Col xs={24} lg={12}>
            <Card className="analytics-chart-card">
              <div ref={priorityChartRef} style={{ height: 400, width: '100%' }} />
            </Card>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <Card className="analytics-chart-card">
              <div ref={timelineChartRef} style={{ height: 400, width: '100%' }} />
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Analytics; 