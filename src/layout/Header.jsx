import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <Navbar expand="lg" className=" navbar fixed-top bg-body-tertiary">
        <Container className="bg-light">
          <Link className="nav-link text-dark" to="/">
            <span className="text-dark fw-bold">The Hidden Pour</span>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto ">
              <Link className="nav-link text-dark" to="/">
                <span className="text-dark fw-bold">Home</span>
              </Link>
              <Link className="nav-link text-dark" to="/menu">
                <span className="text-dark fw-bold"> Menus</span>
              </Link>
              <Link className="nav-link text-dark" to="/event">
                <span className="text-dark fw-bold"> Events</span>
              </Link>
              <Link className="nav-link text-dark" to="/contact">
                <span className="text-dark fw-bold"> Contact</span>
              </Link>
              <Link className="nav-link text-dark" to="/bemember">
                <span className="text-dark fw-bold">Be a member</span>
              </Link>
              <Link className="nav-link text-dark" to="/career">
                <span className="text-dark fw-bold"> Careers</span>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
