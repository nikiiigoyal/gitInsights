import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Cell } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

const ForkedRepos = ({ repositories }) => {
  // Calculate most forked repositories dynamically
  const mostForkedRepos = repositories.map(repo => ({
    repo: repo.name,
    count: repo.forks,
  })).sort((a, b) => b.count - a.count).slice(0, 5); // Top 5 for consistency with the image

  
  const barColors = [
    '#4DD0E1', // Teal
    '#7E57C2', // Purple
    '#FFB74D', // Orange/Yellow
    '#F06292', // Pink/Red
    '#8D6E63', // Brown
  ];

  // Chart configuration
  const chartConfig = {
    count: {
      label: 'Forks',
      color: '#4DD0E1',
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-center text-xl font-normal text-gray-700 mb-6">Most Forked</h2>
      <ChartContainer config={chartConfig} className="h-80 w-full">
        <BarChart layout="horizontal" data={mostForkedRepos} margin={{ top: 20, right: 60, left: 120, bottom: 20 }}>
          <CartesianGrid horizontal={true} vertical={false} stroke="#e5e7eb" strokeDasharray="3 3" opacity={0.6} />
          <XAxis
            type="number"
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12, fill: '#9CA3AF', fontWeight: 400 }}
            tickMargin={8}
            domain={[0, 'dataMax + 5']} // Dynamic max with padding
          />
          <YAxis
            type="category"
            dataKey="repo"
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12, fill: '#9CA3AF', fontWeight: 400, textAnchor: 'end' }}
            tickMargin={8}
            width={100}
            tickFormatter={(value) => (value.length > 25 ? `${value.slice(0, 23)}...` : value)}
          />
          <ChartTooltip content={<ChartTooltipContent className="bg-white border border-gray-200 shadow-lg rounded-lg p-3" labelStyle={{ color: '#374151', fontWeight: 600 }} itemStyle={{ color: '#6B7280' }} />} />
          <Bar dataKey="count" radius={[0, 4, 4, 0]} stroke="none">
            {mostForkedRepos.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={barColors[index % barColors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ChartContainer>
      <div className="text-center mt-4">
        <span className="text-sm text-gray-500 font-medium">Forks</span>
      </div>
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 -rotate-90">
        <span className="text-sm text-gray-500 font-medium">Repos</span>
      </div>
    </div>
  );
};

export default ForkedRepos;