import React from 'react';
import Form from 'react-bootstrap/Form';

export default function FilterDropdown({ label, value, onChange, options = [], size = 'sm', className = '' }) {
  return (
    <div className={`d-flex align-items-center gap-2 ${className}`}>
      {label && <span className="small text-muted fw-semibold text-nowrap">{label}:</span>}
      <Form.Select
        size={size}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="shadow-sm"
        style={{ minWidth: 140 }}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </Form.Select>
    </div>
  );
}

