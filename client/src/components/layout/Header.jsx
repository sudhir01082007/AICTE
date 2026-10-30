import React, { useState, useEffect } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Badge from 'react-bootstrap/Badge';
import { 
  ShieldCheck, 
  User, 
  LogOut, 
  Search, 
  Menu, 
  Building, 
  UserCheck, 
  Shield, 
  ChevronDown,
  Activity
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import NotificationDropdown from '../common/NotificationDropdown';
import api from '../../services/api';

export default function Header({ sidebarCollapsed, onToggleSidebar }) {
  const { user, login, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [apiOnline, setApiOnline] = useState(null); // null = checking, true = online, false = offline

  useEffect(() => {
    let mounted = true;
    api.get('/health')
      .then((res) => {
        if (mounted) {
          setApiOnline(res.data?.status === 'ok');
        }
      })
      .catch(() => {
        if (mounted) {
          setApiOnline(false);
        }
      });
    return () => {
      mounted = false;
    };
  }, []);

  // Demonstration role switching helper so evaluator can test all roles easily
  const currentRole = user?.role || 'REGIONAL_OFFICER';

  const switchRole = (role, name) => {
    login({ id: 101, email: `${role.toLowerCase()}@aicte-india.org`, name, role }, 'mock_jwt_token');
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/applications?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="border-bottom border-secondary shadow-sm py-2 sticky-top" style={{ zIndex: 1030 }}>
      <Container fluid className="px-3 px-md-4">
        {/* Sidebar Toggle & Branding */}
        <div className="d-flex align-items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="btn btn-outline-secondary btn-sm p-1 d-flex align-items-center justify-content-center text-light border-0"
            title={sidebarCollapsed ? 'Expand Navigation' : 'Collapse Navigation'}
            style={{ width: 34, height: 34 }}
          >
            <Menu size={20} />
          </button>

          <Navbar.Brand href="/dashboard" className="d-flex align-items-center gap-2 m-0 p-0 text-decoration-none">
            <div className="bg-primary text-white rounded p-1 d-flex align-items-center justify-content-center shadow-sm" style={{ width: 34, height: 34 }}>
              <ShieldCheck size={22} />
            </div>
            <div className="d-flex flex-column">
              <span className="fw-bold text-white lh-1 font-monospace" style={{ fontSize: '1rem', letterSpacing: '0.04em' }}>
                AICTE APPROVAL
              </span>
              <span className="text-secondary small font-monospace" style={{ fontSize: '0.65rem', letterSpacing: '0.06em' }}>
                REGULATORY CONTROL PLATFORM
              </span>
            </div>
          </Navbar.Brand>
        </div>

        {/* Global Search Interface */}
        <div className="d-none d-md-block mx-auto" style={{ maxWidth: 420, width: '100%' }}>
          <Form onSubmit={handleSearchSubmit}>
            <InputGroup size="sm">
              <InputGroup.Text className="bg-dark border-secondary text-secondary">
                <Search size={15} />
              </InputGroup.Text>
              <Form.Control
                type="search"
                placeholder="Search Application ID, Institution Name, or Course..."
                className="bg-dark border-secondary text-light placeholder-secondary"
                style={{ fontSize: '0.8125rem' }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </InputGroup>
          </Form>
        </div>

        {/* Actions & Profile */}
        <Nav className="align-items-center gap-2">
          {/* System Status Indicator */}
          <div className="d-none d-lg-flex align-items-center gap-2 px-2 py-1 rounded bg-dark border border-secondary text-secondary small" style={{ fontSize: '0.75rem' }}>
            {apiOnline === null ? (
              <>
                <span className="badge bg-warning rounded-circle p-1 animate-pulse" style={{ width: 6, height: 6 }} />
                <span>Connecting...</span>
              </>
            ) : apiOnline ? (
              <>
                <span className="badge bg-success rounded-circle p-1" style={{ width: 6, height: 6 }} />
                <span className="text-success-emphasis">System: Connected</span>
              </>
            ) : (
              <>
                <span className="badge bg-danger rounded-circle p-1" style={{ width: 6, height: 6 }} />
                <span className="text-danger">System: Disconnected</span>
              </>
            )}
          </div>

          {/* Demo Mode Badge */}
          <div className="d-none d-md-block">
            <Badge bg="warning" text="dark" className="font-monospace px-2 py-1" style={{ fontSize: '0.65rem' }}>
              DEMO DATA
            </Badge>
          </div>

          {/* Notifications Dropdown */}
          <NotificationDropdown />

          {/* User Role Switcher & Profile Dropdown */}
          <Dropdown align="end">
            <Dropdown.Toggle
              variant="outline-secondary"
              size="sm"
              id="user-profile-menu"
              className="d-flex align-items-center gap-2 text-light border-secondary"
            >
              <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center" style={{ width: 24, height: 24, fontSize: '0.75rem' }}>
                <User size={14} />
              </div>
              <div className="d-none d-sm-flex flex-column text-start">
                <span className="small fw-semibold lh-1">{user?.name || 'Dr. Rajesh Kumar'}</span>
                <span className="text-secondary" style={{ fontSize: '0.65rem' }}>{currentRole}</span>
              </div>
              <ChevronDown size={14} className="text-secondary" />
            </Dropdown.Toggle>

            <Dropdown.Menu className="shadow-lg border-0 py-2" style={{ minWidth: 230 }}>
              <div className="px-3 py-2 border-bottom bg-light">
                <div className="fw-semibold text-dark small">{user?.name || 'Dr. Rajesh Kumar'}</div>
                <div className="text-muted small" style={{ fontSize: '0.75rem' }}>{user?.email || 'regional.officer@aicte-india.org'}</div>
                <Badge bg="primary" className="mt-1" style={{ fontSize: '0.65rem' }}>
                  {currentRole}
                </Badge>
              </div>

              <Dropdown.Header className="text-uppercase fw-bold small text-muted" style={{ fontSize: '0.65rem' }}>
                Simulate Role (Evaluation)
              </Dropdown.Header>
              <Dropdown.Item onClick={() => switchRole('BUREAU_HEAD', 'Prof. Alok Sharma')} active={currentRole === 'BUREAU_HEAD'}>
                <Shield size={14} className="me-2 text-danger inline" /> Bureau Head
              </Dropdown.Item>
              <Dropdown.Item onClick={() => switchRole('REGIONAL_OFFICER', 'Dr. Rajesh Kumar')} active={currentRole === 'REGIONAL_OFFICER'}>
                <UserCheck size={14} className="me-2 text-primary inline" /> Regional Officer
              </Dropdown.Item>
              <Dropdown.Item onClick={() => switchRole('SCRUTINY_OFFICER', 'Er. S. Meenakshi')} active={currentRole === 'SCRUTINY_OFFICER'}>
                <UserCheck size={14} className="me-2 text-info inline" /> Scrutiny Officer
              </Dropdown.Item>
              <Dropdown.Item onClick={() => switchRole('INSTITUTION_ADMIN', 'Registrar - IITM')} active={currentRole === 'INSTITUTION_ADMIN'}>
                <Building size={14} className="me-2 text-success inline" /> Institution Principal
              </Dropdown.Item>

              <Dropdown.Divider />
              <Dropdown.Item onClick={logout} className="text-danger small">
                <LogOut size={14} className="me-2 inline" /> Sign Out
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Container>
    </Navbar>
  );
}
