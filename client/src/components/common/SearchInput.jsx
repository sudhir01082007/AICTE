import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { Search, X } from 'lucide-react';

export default function SearchInput({ value, onChange, onClear, placeholder = 'Search records...', className = '' }) {
  return (
    <InputGroup size="sm" className={`shadow-sm ${className}`} style={{ maxWidth: 320 }}>
      <InputGroup.Text className="bg-white border-end-0 text-muted">
        <Search size={15} />
      </InputGroup.Text>
      <Form.Control
        type="text"
        placeholder={placeholder}
        className="border-start-0 border-end-0 ps-0"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <InputGroup.Text
          className="bg-white border-start-0 text-muted cursor-pointer"
          onClick={onClear || (() => onChange(''))}
          title="Clear search"
        >
          <X size={14} />
        </InputGroup.Text>
      )}
    </InputGroup>
  );
}

