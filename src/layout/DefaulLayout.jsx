import React from 'react'
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import { Outlet } from 'react-router-dom';

const DefaulLayout = () => {
  return (
    <>
    <Header/>
    <div className="main"><Outlet/></div>

    <Footer/>
    </>
  )
}

export default DefaulLayout;