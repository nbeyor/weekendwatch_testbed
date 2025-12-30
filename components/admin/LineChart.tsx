import React from 'react';

interface DataPoint {
  label: string;
  value: number;
}

interface Series {
  name: string;
  data: DataPoint[];
  style: 'solid' | 'dashed' | 'dotted';
}

interface LineChartProps {
  series: Series[];
  width?: number;
  height?: number;
  yAxisLabel?: string;
}

export function LineChart({
  series,
  width = 600,
  height = 300,
  yAxisLabel,
}: LineChartProps) {
  const padding = { top: 20, right: 20, bottom: 40, left: 50 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  // Calculate bounds
  const allValues = series.flatMap((s) => s.data.map((d) => d.value));
  const minValue = Math.min(...allValues);
  const maxValue = Math.max(...allValues);
  const valueRange = maxValue - minValue || 1;

  // Get all unique labels
  const labels = series[0]?.data.map((d) => d.label) || [];

  // Scale functions
  const scaleX = (index: number) => {
    return (index / (labels.length - 1)) * chartWidth;
  };

  const scaleY = (value: number) => {
    return chartHeight - ((value - minValue) / valueRange) * chartHeight;
  };

  // Generate path for a series
  const generatePath = (data: DataPoint[]) => {
    return data
      .map((point, index) => {
        const x = scaleX(index);
        const y = scaleY(point.value);
        return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
      })
      .join(' ');
  };

  const getStrokeDashArray = (style: Series['style']) => {
    switch (style) {
      case 'dashed':
        return '5,5';
      case 'dotted':
        return '2,3';
      default:
        return 'none';
    }
  };

  return (
    <div className="border-2 border-black p-4">
      <svg width={width} height={height} className="overflow-visible">
        <g transform={`translate(${padding.left}, ${padding.top})`}>
          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
            const y = chartHeight * ratio;
            return (
              <line
                key={ratio}
                x1={0}
                y1={y}
                x2={chartWidth}
                y2={y}
                stroke="black"
                strokeWidth="0.5"
                opacity="0.2"
              />
            );
          })}

          {/* Y-axis labels */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
            const y = chartHeight * (1 - ratio);
            const value = minValue + valueRange * ratio;
            return (
              <text
                key={ratio}
                x={-10}
                y={y}
                textAnchor="end"
                dominantBaseline="middle"
                fontSize="10"
                fill="black"
              >
                {value.toFixed(0)}
              </text>
            );
          })}

          {/* X-axis labels */}
          {labels.map((label, index) => {
            const x = scaleX(index);
            return (
              <text
                key={index}
                x={x}
                y={chartHeight + 20}
                textAnchor="middle"
                fontSize="10"
                fill="black"
              >
                {label}
              </text>
            );
          })}

          {/* Axes */}
          <line
            x1={0}
            y1={0}
            x2={0}
            y2={chartHeight}
            stroke="black"
            strokeWidth="2"
          />
          <line
            x1={0}
            y1={chartHeight}
            x2={chartWidth}
            y2={chartHeight}
            stroke="black"
            strokeWidth="2"
          />

          {/* Data series */}
          {series.map((s, seriesIndex) => (
            <g key={seriesIndex}>
              {/* Line */}
              <path
                d={generatePath(s.data)}
                fill="none"
                stroke="black"
                strokeWidth="2"
                strokeDasharray={getStrokeDashArray(s.style)}
              />

              {/* Points */}
              {s.data.map((point, pointIndex) => {
                const x = scaleX(pointIndex);
                const y = scaleY(point.value);

                // Different marker shapes for different series
                if (seriesIndex === 0) {
                  return (
                    <circle
                      key={pointIndex}
                      cx={x}
                      cy={y}
                      r={3}
                      fill="white"
                      stroke="black"
                      strokeWidth="2"
                    />
                  );
                } else if (seriesIndex === 1) {
                  return (
                    <rect
                      key={pointIndex}
                      x={x - 3}
                      y={y - 3}
                      width={6}
                      height={6}
                      fill="white"
                      stroke="black"
                      strokeWidth="2"
                    />
                  );
                } else {
                  return (
                    <polygon
                      key={pointIndex}
                      points={`${x},${y - 4} ${x + 3},${y + 2} ${x - 3},${y + 2}`}
                      fill="white"
                      stroke="black"
                      strokeWidth="2"
                    />
                  );
                }
              })}
            </g>
          ))}

          {/* Y-axis label */}
          {yAxisLabel && (
            <text
              x={-chartHeight / 2}
              y={-35}
              textAnchor="middle"
              fontSize="12"
              fill="black"
              transform={`rotate(-90, -${chartHeight / 2}, -35)`}
            >
              {yAxisLabel}
            </text>
          )}
        </g>
      </svg>

      {/* Legend */}
      {series.length > 1 && (
        <div className="flex gap-4 mt-3 justify-center">
          {series.map((s, index) => (
            <div key={index} className="flex items-center gap-2">
              <svg width="20" height="2">
                <line
                  x1="0"
                  y1="1"
                  x2="20"
                  y2="1"
                  stroke="black"
                  strokeWidth="2"
                  strokeDasharray={getStrokeDashArray(s.style)}
                />
              </svg>
              <span className="text-xs">{s.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
