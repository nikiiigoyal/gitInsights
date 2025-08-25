import { type Repository } from '@/types';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Cell } from 'recharts';
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { calculateMostStarredRepos } from '@/utils';

const PopularRepos = ({ repositories }: { repositories: Repository[] }) => {
  // Calculate most starred repositories and return array of {repo: string, stars: number}
  const popularRepos = calculateMostStarredRepos(repositories);

  // 🎨 Define different colors for each bar (matching your image)
  const barColors = [
    '#4DD0E1', // Teal (like your first bar)
    '#7E57C2', // Purple (like your second bar)  
    '#FFB74D', // Orange/Yellow (like your third bar)
    '#F06292', // Pink/Red (like your fourth bar)
    '#8D6E63', // Brown (like your fifth bar)
  ];

  // Configuration for the chart's styling and labels
  const chartConfig = {
    repo: {
      label: 'Repository',
      color: '#4DD0E1', // Default color (won't be used with Cell components)
    },
  } satisfies ChartConfig;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      {/* 📝 Custom styled title */}
      <h2 className='text-2xl font-bold text-gray-800 text-center mb-6'>
        Most Popular
      </h2>
      
      {/* 📊 Chart Container with custom height */}
      <ChartContainer config={chartConfig} className='h-80 w-full'>
        <BarChart 
          accessibilityLayer 
          data={popularRepos}
          margin={{ top: 20, right: 30, left: 20, bottom: 40 }} // Reduced bottom margin
          barCategoryGap="20%" // Control spacing between bars (smaller = wider bars, larger = narrower bars)
        >
          {/* 📏 Grid styling - matching your subtle grid lines */}
          <CartesianGrid 
            vertical={false} 
            stroke="#e0e0e0" 
            strokeDasharray="2 2"
            opacity={0.7}
          />

          {/* 📍 X-Axis styling - repository names */}
          <XAxis
            dataKey='repo'
            tickLine={false}
            axisLine={false}  // Remove axis line
            tickMargin={15}   // More space between ticks and labels
            tick={{ 
              fontSize: 12, 
              fill: '#6B7280',  // Gray color for text
              fontWeight: 500 
            }}
            // Custom formatter for better text wrapping
            tickFormatter={(value) => {
              // Split long names and return first part
              return value.length > 12 ? `${value.slice(0, 10)}...` : value;
            }}
            interval={0} // Show all labels
            angle={-45}  // Rotate labels for better fit
            textAnchor="end"
            height={80}
          />

          {/* 📊 Y-Axis styling - star counts */}
          <YAxis 
            tickLine={false}
            axisLine={false}  // Remove axis line
            tick={{ 
              fontSize: 12, 
              fill: '#6B7280',  // Gray color for text
              fontWeight: 500 
            }}
            tickMargin={10}
            domain={[0, 'dataMax + 10']} // Add some padding to top
          />

          {/* 💬 Tooltip with custom styling */}
          <ChartTooltip 
            content={<ChartTooltipContent 
              className="bg-white border border-gray-200 shadow-lg rounded-lg p-3"
              labelStyle={{ color: '#374151', fontWeight: 600 }}
              itemStyle={{ color: '#6B7280' }}
            />} 
          />

          {/* 📊 Bar component with individual colors using Cell */}
          <Bar 
            dataKey='stars' 
            radius={[4, 4, 0, 0]} // Rounded top corners only
            stroke="none"          // Remove border
          >
            {popularRepos.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={barColors[index] || barColors[0]} // Use different color for each bar
              />
            ))}
          </Bar>
        </BarChart>
      </ChartContainer>
      
      {/* 📈 Optional: Add axis label */}
      <div className="text-center mt-4">
        <span className="text-sm text-gray-500 font-medium">Repos</span>
      </div>
    </div>
  );
};

export default PopularRepos;

