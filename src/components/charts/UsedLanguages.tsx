import { type Repository } from '@/types';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { calculatePopularLanguages } from '@/utils';

const UsedLanguages = ({ repositories }: { repositories: Repository[] }) => {
  // Calculate popular languages
  //  [{language: string, count: number}]
  const popularLanguages = calculatePopularLanguages(repositories);

  // Configuration for the chart's styling and labels
  const chartConfig = {
    language: {
      label: 'Language',
    },
  } satisfies ChartConfig;

  // Define colors for pie slices
  const COLORS = ['#2caeba', '#5d62b5', '#ffc533', '#f2726f', '#8d6e63'];

  return (
    <div>
      <h3 className='text-center text-xl font-normal'>Languages</h3>
      <ChartContainer config={chartConfig} className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie 
              data={popularLanguages}
              dataKey="count"
              nameKey="language"
              cx="50%"
              cy="50%"
              outerRadius={80}
              labelLine={{ stroke: 'rgb(97 131 165)' }}
              label={({ name, value }) => (
                <text fill="rgb(97 131 165)">{`${name}, ${value}`}</text>
              )}
            >
              {popularLanguages.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <ChartTooltip content={<ChartTooltipContent />} />
          </PieChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
};

export default UsedLanguages;