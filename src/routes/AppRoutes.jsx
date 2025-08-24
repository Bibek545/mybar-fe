import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { autoLoginUser } from "../features/user/userAction";

// Layouts
import DefaulLayout from "../layout/DefaulLayout.jsx";
import UserLayout from "../layout/UserLayout.jsx";

// Public pages
import HomePage from "../pages/HomePage.jsx";
import MenuPage from "../pages/MenuPage.jsx";
import EventPage from "../pages/EventPage.jsx";
import ContactPage from "../pages/ContactPage.jsx";
import BeMember from "../pages/BeMember.jsx";
import CareerPage from "../pages/CareerPage.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import SignUpPage from "../pages/SignUpPage.jsx";
import BookingPage from "../pages/BookingPage.jsx";
import VerifyUser from "../pages/VerifyUser.jsx";
import ForgetPasswordPage from "../pages/ForgotPassword.jsx";

// Private (user) pages
import UserDashboard from "../pages/user/UserDashboard.jsx";
import UserBooking from "../pages/user/UserBooking.jsx";
import UserPerks from "../pages/user/UserPerks.jsx";
import UserEvents from "../pages/user/UserEvents.jsx";
import UserProfile from "../pages/user/UserProfile.jsx";
import UserSupport from "../pages/user/UserSupport.jsx";
import BookingAtable from "../pages/user/BookingAtable.jsx";

const AppRoutes = () => {
  //   const dispatch = useDispatch();

  //   useEffect(() => {
  //     const token = sessionStorage.getItem("accessJWT");
  //     const refresh = localStorage.getItem("refreshJWT");

  //     if (token || refresh) {
  //       dispatch(autoLoginUser()); //
  //     }
  //   }, [dispatch]);

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<DefaulLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/event" element={<EventPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/bemember" element={<BeMember />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/activate-user" element={<VerifyUser />} />
        <Route path="/career" element={<CareerPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/forgot-password" element={<ForgetPasswordPage />} />
      </Route>

      {/* Private Routes */}
      <Route path="/user" element={<UserLayout />}>
        <Route index element={<UserDashboard />} />
        <Route path="bookings" element={<UserBooking />} /> {/* this is for the user to see their booking  histiry and book as well*/}
        <Route path="booking" element={<BookingPage />} /> {/* this is for the regylar booking */}
        <Route path="book-table" element={<BookingAtable />} />
        <Route path="perks" element={<UserPerks />} />
        <Route path="events" element={<UserEvents />} />
        <Route path="profile" element={<UserProfile />} />
        <Route path="help" element={<UserSupport />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
