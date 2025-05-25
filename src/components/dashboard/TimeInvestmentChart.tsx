import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import * as d3 from 'd3';
import { User } from 'models/User';

interface TimeInvestmentChartProps {
  user: User;
}

const ChartContainer = styled.div`
  width: 100%;
  height: 250px;
  margin-bottom: 1rem;
`;

const Legend = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 1rem;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
`;

const LegendColor = styled.div<{ color: string }>`
  width: 12px;
  height: 12px;
  border-radius: 2px;
  background-color: ${props => props.color};
`;

const TimeInvestmentChart: React.FC<TimeInvestmentChartProps> = ({ user }) => {
  const chartRef = useRef<SVGSVGElement | null>(null);
  
  useEffect(() => {
    if (!chartRef.current) return;
    
    // Clear previous chart
    d3.select(chartRef.current).selectAll('*').remove();
    
    // Chart dimensions
    const width = chartRef.current.clientWidth;
    const height = chartRef.current.clientHeight;
    const margin = { top: 20, right: 20, bottom: 40, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    
    // Data preparation
    const currentAge = user.age;
    const startingAge = user.startingAge;
    const upperLimit = user.upperAgeLimit;
    
    const totalTimePercentage = 100;
    const usedTimePercentage = ((currentAge - startingAge) / (upperLimit - startingAge)) * 100;
    const remainingTimePercentage = totalTimePercentage - usedTimePercentage;
    
    const data = [
      { label: 'Used', value: usedTimePercentage, color: '#FF9800' },
      { label: 'Remaining', value: remainingTimePercentage, color: '#4CAF50' },
    ];
    
    // Create SVG element
    const svg = d3.select(chartRef.current)
      .attr('width', width)
      .attr('height', height);
    
    // Create a group for the chart
    const chart = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);
    
    // Create pie chart
    const pie = d3.pie<any>()
      .value(d => d.value)
      .sort(null);
    
    const arc = d3.arc<any>()
      .innerRadius(innerHeight / 3)
      .outerRadius(innerHeight / 2);
    
    // Create a group for the pie chart
    const pieGroup = chart.append('g')
      .attr('transform', `translate(${innerWidth / 2}, ${innerHeight / 2})`);
    
    // Draw arcs
    pieGroup.selectAll('path')
      .data(pie(data))
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', d => d.data.color)
      .attr('stroke', 'white')
      .attr('stroke-width', 2);
    
    // Add center text
    pieGroup.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em')
      .attr('font-size', '20px')
      .attr('fill', '#333')
      .text(`${Math.round(usedTimePercentage)}%`);
    
    pieGroup.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '1.5em')
      .attr('font-size', '12px')
      .attr('fill', '#666')
      .text('Used');
    
    // Add age labels
    chart.append('text')
      .attr('x', 0)
      .attr('y', innerHeight + 30)
      .attr('fill', '#666')
      .attr('font-size', '12px')
      .text(`Started: Age ${startingAge}`);
    
    chart.append('text')
      .attr('x', innerWidth)
      .attr('y', innerHeight + 30)
      .attr('text-anchor', 'end')
      .attr('fill', '#666')
      .attr('font-size', '12px')
      .text(`Goal: Age ${upperLimit}`);
    
    chart.append('text')
      .attr('x', innerWidth / 2)
      .attr('y', innerHeight + 30)
      .attr('text-anchor', 'middle')
      .attr('fill', '#333')
      .attr('font-size', '12px')
      .attr('font-weight', 'bold')
      .text(`Now: Age ${currentAge}`);
    
  }, [user]);
  
  // Calculate years info
  const totalYears = user.upperAgeLimit - user.startingAge;
  const usedYears = user.age - user.startingAge;
  const remainingYears = totalYears - usedYears;
  
  return (
    <>
      <ChartContainer>
        <svg ref={chartRef} width="100%" height="100%"></svg>
      </ChartContainer>
      
      <Legend>
        <LegendItem>
          <LegendColor color="#FF9800" />
          <span>{usedYears} years used</span>
        </LegendItem>
        <LegendItem>
          <LegendColor color="#4CAF50" />
          <span>{remainingYears} years remaining</span>
        </LegendItem>
      </Legend>
    </>
  );
};

export default TimeInvestmentChart;
