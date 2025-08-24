import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import { logoutApi } from "../services/authAPI.jsx";
// import { setUser } from "../features/user/userSlice.js";

const Header = () => {
  const { user } = useSelector((state) => state.userInfo);
  // const dispatch = useDispatch();

  // const handleOnLogout = () => {
  //   //calling api to logout from the backend
  //   logoutApi();

  //   //logput from the frontend
  //   sessionStorage.removeItem("accessJWT");
  //   localStorage.removeItem("refreshJWT");
  //   dispatch(setUser({}));
  // };
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

              {/* checking if the user is in the system
              {!user?._id && (
                <Link className="nav-link text-dark" to="/bemember">
                  <span className="text-dark fw-bold">Be a member</span>
               
              )} */}

              {user?._id ? (
                <>
                  <Link className="nav-link" to="/user">
                    <span className="text-dark fw-bold"> Dashboard</span>
                  </Link>
                </>
              ) : (
                <>
                  <Link className="nav-link text-dark" to="/bemember">
                    <span className="text-dark fw-bold">Be a member</span>
                  </Link>
                </>
              )}

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
