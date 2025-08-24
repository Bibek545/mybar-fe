import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const AuthRoute = ({children}) => {

const location = useLocation();
console.log(location);


  //use real data

  const { user } = useSelector((state)=> state.userInfo);
    const isPrivate = user?._id;
  return (
    isPrivate ? children : <Navigate
     to ="/login"></Navigate>
  )
}

export default AuthRoute;