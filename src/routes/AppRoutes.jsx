import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import DefaulLayout from "../layout/DefaulLayout.jsx";
import HomePage from "../pages/HomePage.jsx"; 
import MenuPage from "../pages/MenuPage.jsx";
import EventPage from "../pages/EventPage.jsx";
import ContactPage from "../pages/ContactPage.jsx";
import BeMember from "../pages/BeMember.jsx";
import CareerPage from "../pages/CareerPage.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import SignUpPage from "../pages/SignUpPage.jsx";
const AppRoutes = () => {
    return (
        <Routes>
            {    //public routes
                <Route path ="/" element= {<DefaulLayout/>}>
                 <Route index element= {<HomePage/>}></Route>
                 <Route path="/menu" element={<MenuPage/>} ></Route>
                 <Route path="/event" element={<EventPage/>}></Route>
                 <Route path="/contact" element={<ContactPage/>}></Route>
                 <Route path="/bemember" element={<BeMember/>}></Route>
                 <Route path="/login" element = {<LoginPage />}></Route>
                 <Route path="/signup" element={<SignUpPage />}></Route>
                 <Route path="/career" element={<CareerPage/>}></Route>


                </Route>
            }
        </Routes>
    )
}

export default AppRoutes;