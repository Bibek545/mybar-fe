import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import SideBar from "./SideBar";
import AuthRoute from "../components/auth/AuthRoute";

const UserLayout = () => {
  return (
    <AuthRoute>
      {/* Header */}
      <Header />

      <Container fluid className="user-layout-container">
        <Row className="min-vh-100">
          {/* Sidebar */}
          <Col md={3} xl={2} className="thp-sidebar p-4">
            <div className="sidebar-greeting mb-4">
              <span>Welcome back,</span>
              <h5>Bibek Hamal</h5>
            </div>
            <SideBar />
          </Col>

          {/* Main Content */}
          <Col md={9} xl={10} className="p-4 bg-light-subtle" style={{ marginTop: '80px' }}>
            <main className="thp-main-content p-3 rounded shadow-sm bg-white">
              <Outlet />
            </main>
          </Col>
        </Row>
      </Container>

      {/* Footer */}
      <Footer />
    </AuthRoute>
  );
};

export default UserLayout;
