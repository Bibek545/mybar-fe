import React from "react";
import { Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { FaCalendarCheck, FaGift, FaSignOutAlt } from "react-icons/fa";
import { IoRestaurant } from "react-icons/io5";
import { MdEvent } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { BsQuestionCircleFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../features/user/userSlice";
import { logoutApi } from "../services/authAPI";

const SideBar = () => {
  const { user } = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();

  const handleOnLogout = () => {
    //calling api to logout from the backend
    logoutApi();

    //logput from the frontend
    sessionStorage.removeItem("accessJWT");
    localStorage.removeItem("refreshJWT");
    dispatch(setUser({}));
  };
  return (
    <div className="thp-sidebar">
      <h3 className="thp-logo">The Hidden Pour</h3>
      <Stack gap={3}>
        <Link to="/user" className="thp-link">
          <RxDashboard /> Dashboard
        </Link>
        <Link to="/user/bookings" className="thp-link">
          <FaCalendarCheck /> My Bookings
        </Link>
        <Link to="/user/book-table" className="thp-link">
          <IoRestaurant /> Book a Table
        </Link>
        <Link to="/user/perks" className="thp-link">
          <FaGift /> Exclusive Perks
        </Link>
        <Link to="/user/events" className="thp-link">
          <MdEvent /> Events & Experiences
        </Link>
        <Link to="/user/profile" className="thp-link">
          <CgProfile /> My Profile
        </Link>
        <Link to="/user/help" className="thp-link">
          <BsQuestionCircleFill /> Support
        </Link>

        <Link to="/" className="thp-link" onClick={handleOnLogout}>
          <FaSignOutAlt /> Logout
        </Link>
      </Stack>
    </div>
  );
};

export default SideBar;
