import React from 'react'
import { Outlet } from 'react-router'
import Navbar from './Componets/Layout/Navbar'
import Futtar from './Componets/Layout/Futtar'

const Rotlayoute = () => {
  return (
    <>
    <Navbar/>
    <Outlet/>
    <Futtar/>
    </>
  )
}

export default Rotlayoute