import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

export default function RegionalPendencyChart({ data = [] }) {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border rounded shadow-sm small">
          <div className="fw-bold text-dark mb-1">{label} Region</div>
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
        <BarChart data={data} margin={{ top: 10, right: 15, left: -15, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
          <XAxis dataKey="region" tick={{ fontSize: 11, fill: '#98A2B3' }} axisLine={{ stroke: '#E5E7EB' }} />
          <YAxis tick={{ fontSize: 12, fill: '#98A2B3' }} axisLine={{ stroke: '#E5E7EB' }} />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="top"
            align="right"
            iconType="circle"
            wrapperStyle={{ fontSize: '0.75rem', paddingBottom: 10 }}
          />
          <Bar dataKey="compliant" name="Compliant / Cleared" fill="#16845B" radius={[4, 4, 0, 0]} barSize={14} />
          <Bar dataKey="pending" name="Within SLA Pending" fill="#2563EB" radius={[4, 4, 0, 0]} barSize={14} />
          <Bar dataKey="overdue" name="SLA Overdue" fill="#C62836" radius={[4, 4, 0, 0]} barSize={14} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

