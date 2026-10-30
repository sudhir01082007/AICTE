import React from 'react';
import Badge from 'react-bootstrap/Badge';

export default function StatusBadge({ status }) {
  if (!status) return null;

  const normalized = status.toString().toUpperCase().replace(/[\s-]/g, '_');

  let bg = 'secondary';
  let label = status;
  let textClass = '';

  switch (normalized) {
    case 'SUBMITTED':
      bg = 'info';
      label = 'Submitted';
      break;
    case 'UNDER_SCRUTINY':
    case 'SCRUTINY':
      bg = 'primary';
      label = 'Scrutiny Committee';
      break;
    case 'RE_SCRUTINY':
    case 'UNDER_RE_SCRUTINY':
      bg = 'warning';
      textClass = 'text-dark';
      label = 'Re-Scrutiny';
      break;
    case 'DEFICIENT':
    case 'DEFICIENCY_FOUND':
    case 'DEFICIENCY_ISSUED':
      bg = 'warning';
      textClass = 'text-dark';
      label = 'Deficiency Issued';
      break;
    case 'RETURNED_TO_INSTITUTION':
    case 'RETURNED':
      bg = 'warning';
      textClass = 'text-dark';
      label = 'Returned to Inst.';
      break;
    case 'UNDER_EVC':
    case 'EVC_SCHEDULED':
    case 'EVC':
      bg = 'info';
      label = 'EVC Inspection';
      break;
    case 'REGIONAL_COMMITTEE':
    case 'RC_REVIEW':
      bg = 'primary';
      label = 'Regional Committee';
      break;
    case 'SAC_SHC':
    case 'SAC_REVIEW':
      bg = 'dark';
      label = 'SAC / SHC';
      break;
    case 'APPROVED':
    case 'RECOMMENDED':
      bg = 'success';
      label = 'Approved';
      break;
    case 'REJECTED':
      bg = 'danger';
      label = 'Rejected';
      break;
    case 'OVERDUE':
    case 'SLA_BREACHED':
      bg = 'danger';
      label = 'SLA Overdue';
      break;
    case 'COMPLIANT':
    case 'VERIFIED':
      bg = 'success';
      label = 'Verified';
      break;
    case 'PENDING':
      bg = 'secondary';
      label = 'Pending Review';
      break;
    default:
      bg = 'secondary';
      label = status;
  }

  return (
    <Badge
      bg={bg}
      className={`px-2 py-1 text-uppercase font-monospace ${textClass}`}
      style={{ fontSize: '0.725rem', letterSpacing: '0.03em' }}
    >
      {label}
    </Badge>
  );
}
