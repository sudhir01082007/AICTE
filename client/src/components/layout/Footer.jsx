import React from 'react';
import Container from 'react-bootstrap/Container';

export default function Footer() {
  return (
    <footer className="bg-white border-top py-3 text-muted small mt-auto">
      <Container fluid className="px-4 d-flex flex-column flex-md-row justify-content-between align-items-center">
        <div>
          <strong>All India Council for Technical Education (AICTE)</strong> &bull; Ministry of Education, Government of India
        </div>
        <div className="mt-2 mt-md-0 text-secondary" style={{ fontSize: '0.75rem' }}>
          &copy; {new Date().getFullYear()} AICTE &mdash; Approval Management System
        </div>
      </Container>
    </footer>
  );
}

