import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

export default function ApplicationTrendChart({ data = [] }) {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border rounded shadow-sm small">
          <div className="fw-bold text-dark mb-1">{label} 2026</div>
          {payload.map((entry, index) => (
            <div key={`item-${index}`} className="d-flex align-items-center gap-2">
              <span
                className="d-inline-block rounded-circle"
                style={{ width: 8, height: 8, backgroundColor: entry.color }}
              />
              <span className="text-muted">{entry.name}:</span>
              <span className="fw-semibold text-dark">{entry.value}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ width: '100%', height: 260 }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 15, left: -15, bottom: 0 }}>
          <defs>
            <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2563EB" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#2563EB" stopOpacity={0.0} />
            </linearGradient>
            <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#16845B" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#16845B" stopOpacity={0.0} />
            </linearGradient>
            <linearGradient id="colorPending" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#C62836" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#C62836" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
          <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#98A2B3' }} axisLine={{ stroke: '#E5E7EB' }} />
          <YAxis tick={{ fontSize: 12, fill: '#98A2B3' }} axisLine={{ stroke: '#E5E7EB' }} />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="top"
            align="right"
            iconType="circle"
            wrapperStyle={{ fontSize: '0.75rem', paddingBottom: 10 }}
          />
          <Area
            type="monotone"
            dataKey="total"
            name="Total Received"
            stroke="#2563EB"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorTotal)"
          />
          <Area
            type="monotone"
            dataKey="completed"
            name="Completed / Approved"
            stroke="#16845B"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorCompleted)"
          />
          <Area
            type="monotone"
            dataKey="pending"
            name="In-Progress"
            stroke="#C62836"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorPending)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

