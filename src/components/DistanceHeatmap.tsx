import { Calendar } from 'lucide-react';
import { RunningActivity } from '../types';
// import { getActivityByDate, getAllDaysInYear } from '../utils/dateUtils';
import { HeatmapLegend } from '../utils/heapmapLegend';
// import { MonthLabels } from './heatmap/MonthLabels';
import { HeatmapGrid } from '../utils/heatmapGrid';



interface Props {
  activities: RunningActivity[];
}

// 获取本年活动的函数
function getActivityByDate(activities: any[], currentYear: number) {
  const activityMap = new Map<string, number>();
  console.log(activityMap)
  
  activities.forEach(activity => {
    const activityDate = new Date(activity.date);
    const activityYear = activityDate.getFullYear();
    
    // 只保留当前年份的活动
    if (activityYear === currentYear) {
      const day = activityDate.toISOString().split('T')[0]; // 获取年月日形式的日期字符串
      const distance = activity.distance || 0; // 假设每个活动都有一个 distance 字段
      activityMap.set(day, (activityMap.get(day) || 0) + distance); // 累加每日的距离
    }
  });
  
  return activityMap;
}

// 获取本年所有日期的函数
function getAllDaysInYear(year: number) {
  const days: string[] = [];
  const firstDay = new Date(year, 0, 1);
  const lastDay = new Date(year + 1, 0, 0);
  
  for (let currentDate = firstDay; currentDate <= lastDay; currentDate.setDate(currentDate.getDate() + 1)) {
    days.push(currentDate.toISOString().split('T')[0]); // 格式化为 YYYY-MM-DD
  }
  
  return days;
}



export function DistanceHeatmap({ activities }: Props) {
  const currentYear = new Date().getFullYear();
  
  // 过滤出本年的活动
  const activityMap = getActivityByDate(activities, currentYear);
  
  // 获取本年所有日期
  const allDays = getAllDaysInYear(currentYear);
  
  const weeks = [];
  let currentWeek: ({ date: string; distance: number; } | null)[] = [];
  
  // 获取本年第一天
  const firstDayOfYear = new Date(currentYear, 0, 1);
  const firstDayOffset = firstDayOfYear.getDay();
  
  // 填充第一周的空白
  for (let i = 0; i < firstDayOffset; i++) {
    currentWeek.push(null);
  }
  
  // 遍历所有日期，按周分配活动
  allDays.forEach(day => {
    const dayOfWeek = new Date(day).getDay(); // 获取当天是星期几
    const distance = activityMap.get(day) || 0; // 获取当天的活动距离，默认 0
    
    currentWeek.push({ date: day, distance });
    
    // 如果是周末（星期六），将当前周推送到 weeks 数组
    if (dayOfWeek === 6) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });
  
  // 如果还有剩余的天数（不满一周），把它加进去
  if (currentWeek.length > 0) {
    weeks.push(currentWeek);
  }

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <h2 className="text-1g font-bold text-gray-800 flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          热力图
        </h2>
        <HeatmapLegend />
      </div>
      
      <div className="w-full">
        {/* 可以解注释这行，如果需要显示月份标签 */}
        {/* <MonthLabels currentYear={currentYear} /> */}
        <HeatmapGrid weeks={weeks} />
      </div>
    </div>
  );
}