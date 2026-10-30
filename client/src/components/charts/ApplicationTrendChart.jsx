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
              <stop offset="5%" stopColor="#0f62fe" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#0f62fe" stopOpacity={0.0} />
            </linearGradient>
            <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#198754" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#198754" stopOpacity={0.0} />
            </linearGradient>
            <linearGradient id="colorPending" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#da1e28" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#da1e28" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
          <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={{ stroke: '#e2e8f0' }} />
          <YAxis tick={{ fontSize: 12, fill: '#64748b' }} axisLine={{ stroke: '#e2e8f0' }} />
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
            stroke="#0f62fe"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorTotal)"
          />
          <Area
            type="monotone"
            dataKey="completed"
            name="Completed / Approved"
            stroke="#198754"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorCompleted)"
          />
          <Area
            type="monotone"
            dataKey="pending"
            name="In-Progress"
            stroke="#da1e28"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorPending)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

