import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { Container, Row, Col, Offcanvas, Button } from "react-bootstrap";
import SideBar from "./SideBar";
import AuthRoute from "../components/auth/AuthRoute";

const UserLayout = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <AuthRoute>
      {/* Header (likely fixed) */}
      <Header />

      {/* Mobile top bar with hamburger — only visible on < md */}
      <div
        className="d-md-none bg-white border-bottom px-3 py-2 sticky-top"
        style={{ zIndex: 1030 }}
      >
        <div className="d-flex align-items-center justify-content-between">
          <div>
            <div className="small text-muted">Welcome back,</div>
            <div className="fw-semibold">Bibek Hamal</div>
          </div>
          <Button
            variant="outline-dark"
            size="sm"
            onClick={() => setShowMenu(true)}
            aria-label="Open menu"
          >
            ☰ Menu
          </Button>
        </div>
      </div>

      {/* Offcanvas sidebar for mobile */}
      <Offcanvas
        show={showMenu}
        onHide={() => setShowMenu(false)}
        placement="start"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Your Account</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <SideBar />
        </Offcanvas.Body>
      </Offcanvas>

      <Container fluid className="user-layout-container">
        <Row className="min-vh-100">
          {/* Sidebar: hidden on mobile, shown md+; sticky for nice UX */}
          <Col
            md={3}
            xl={2}
            className="thp-sidebar p-4 d-none d-md-block"
          >
            <div className="sticky-top" style={{ top: 80 }}>
              <div className="sidebar-greeting mb-4">
                <span className="text-muted small d-block">Welcome back,</span>
                <h5 className="mb-0">Bibek Hamal</h5>
              </div>
              <SideBar />
            </div>
          </Col>

          {/* Main Content takes full width on mobile */}
          <Col
            xs={12}
            md={9}
            xl={10}
            className="p-3 p-md-4 bg-light-subtle"
          >
            {/* If your Header is fixed, use padding instead of margin so it doesn't cause big jumps */}
            <main className="thp-main-content p-3 rounded shadow-sm bg-white">
              <Outlet />
            </main>
          </Col>
        </Row>
      </Container>

      <Footer />
    </AuthRoute>
  );
};

export default UserLayout;
