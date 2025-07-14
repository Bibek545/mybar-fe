import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import DefaulLayout from "../layout/DefaulLayout.jsx";
import Header from "../layout/Header.jsx";
import Footer from "../layout/Footer.jsx";

const AppRoutes = () => {
    return (
        <Routes>
            {
                <Route path ="/" element= {<DefaulLayout/>}>


                </Route>
            }
        </Routes>
    )
}

export default AppRoutes;