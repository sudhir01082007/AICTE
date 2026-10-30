import React from 'react';
import BsPagination from 'react-bootstrap/Pagination';

export default function Pagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
}) {
  if (totalPages <= 1) return null;

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  // Generate page numbers with ellipsis window
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      let start = Math.max(1, currentPage - 2);
      let end = Math.min(totalPages, currentPage + 2);

      if (currentPage <= 3) {
        start = 1;
        end = maxVisible;
      } else if (currentPage >= totalPages - 2) {
        start = totalPages - maxVisible + 1;
        end = totalPages;
      }

      for (let i = start; i <= end; i++) pages.push(i);
    }
    return pages;
  };

  return (
    <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center gap-3 py-2 px-1">
      <div className="small text-muted">
        Showing <span className="fw-semibold text-dark">{startItem}</span> to{' '}
        <span className="fw-semibold text-dark">{endItem}</span> of{' '}
        <span className="fw-semibold text-dark">{totalItems}</span> entries
      </div>

      <BsPagination size="sm" className="mb-0 shadow-sm">
        <BsPagination.Prev
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />
        {getPageNumbers().map((num) => (
          <BsPagination.Item
            key={num}
            active={num === currentPage}
            onClick={() => onPageChange(num)}
          >
            {num}
          </BsPagination.Item>
        ))}
        <BsPagination.Next
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
      </BsPagination>
    </div>
  );
}

