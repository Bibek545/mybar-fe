import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container className="bg-light">
          <Link className="nav-link text-dark" to="/">The Hidden Pour</Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto ">
              <Link className="nav-link text-dark" to="/">Home</Link>
              <Link className="nav-link text-dark" to="/menu">Menus</Link>
              <Link className="nav-link text-dark" to="/event">Events</Link>
              <Link className="nav-link text-dark" to="/contact">Contact</Link>
              <Link className="nav-link text-dark" to="/event">Be a member</Link>
              <Link className="nav-link text-dark" to="/career">Careers</Link> 
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>; 
    </>
  );
};

export default Header;
